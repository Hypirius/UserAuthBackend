import fs from 'fs/promises';

async function deleteFile(pathToFile: string) {
  try {
    await fs.unlink(pathToFile);
  } catch (err) {
    // TODO: Add error urgency/level or logger and change this
    console.log(`Unable to delete file located on path:${pathToFile}`, err);
  }
}

export default deleteFile;
