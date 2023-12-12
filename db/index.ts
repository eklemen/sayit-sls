import mongoose from 'mongoose';

const mongoConnStr = process.env.DB_STRING || 'nope';

let cachedDb: typeof mongoose;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cachedDb) {
    console.log('using cached db');
    return cachedDb;
  }
  console.log('connecting to db...');

  await mongoose.connect(mongoConnStr, {});
  cachedDb = mongoose;
  console.log('db connected');
  return cachedDb;
}
