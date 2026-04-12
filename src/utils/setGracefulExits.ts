import mongoose from 'mongoose';

function setGracefulExits() {
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
    } catch (err) {
      console.log('An error occured when exiting', err);
      process.exit(1);
    } finally {
      process.exit(0);
    }
  });
}

export default setGracefulExits;
