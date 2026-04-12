import app from './app.js';
import config from './config/env.js';
import connectDB from './db/connectDB.js';
import setGracefulExits from './utils/setGracefulExits.js';

await connectDB(config.DB_URL, config.DB_NAME);
setGracefulExits();

app.listen(config.PORT, () => {
  console.log(`Connected to server on PORT ${config.PORT}`);
});
