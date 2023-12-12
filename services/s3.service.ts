import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { ObjectId } from 'mongodb';

// Create an S3 client
const client = new S3Client({ region: 'us-east-1' });
const bucketName = 'sayit-sls-audio';
// export { s3Client };

interface ObjectList {
  _id: ObjectId;
  key: string;
  sound: string;
  examples: string[];
  category?: string;
  alternateSpellings: string[];
  alternateExamples: string[];
}

type AudioObjectOutput = {
  url: string;
} & ObjectList;

async function getAllPresignedUrls(bucketName: string, objectsList: ObjectList[]) {
  return Promise.allSettled(
    objectsList.map(({ key }) => getPresignedUrl(bucketName, key)),
  );
}

async function getPresignedUrl(bucketName: string, objectKey: string) {
  const getObjectParams = {
    Bucket: bucketName,
    Key: objectKey,
  };
  const command = new GetObjectCommand(getObjectParams);
  return getSignedUrl(client, command, { expiresIn: 43_200 }); // URL expires in 12 hours
  // }
}

export async function getAudioForSounds(soundKeys: ObjectList[]) {
  const urls = await getAllPresignedUrls(bucketName, soundKeys);
  return urls.reduce((acc: AudioObjectOutput[], curr, currentIndex) => {
    if (curr.status === 'fulfilled') {
      acc.push({ url: curr.value, ...soundKeys[currentIndex] });
    } else {
      acc.push({ url: '', ...soundKeys[currentIndex] });
    }
    return acc;
  }, []);
}
