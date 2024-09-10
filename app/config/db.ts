import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) return; // prevention from multiple connection state 0: disconnect 1: connected 2: connecting 3: disconnecting

  return mongoose.connect(process.env.MONGO_URI as string)
}

export default connectDb;
