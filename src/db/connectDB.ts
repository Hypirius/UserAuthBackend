import mongoose from 'mongoose';

async function connectDB(dbUri: string, dbName: string): Promise<void> {
  try {
    await mongoose.connect(`${dbUri}`, {
      serverSelectionTimeoutMS: 15000,
      dbName,
    });

    console.log('Successfully connected to DB');

    mongoose.connection.on('error', (error) => {
      console.error('An error occured on DB', error);
      process.exit(1);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Disconnected from DB');
    });
  } catch (error) {
    console.error('An error has occured connecting to DB', error);
    process.exit(1);
  }
}

export default connectDB;
