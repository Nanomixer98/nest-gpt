import * as path from 'path';
import * as fs from 'fs';

interface Options {
  fileId: string;
}

export const textToAudioGetterUseCase = ({ fileId }: Options) => {
  const filePath = path.resolve(
    __dirname,
    '../../../generated/audios/',
    `${fileId}.mp3`,
  );
  const fileFound = fs.existsSync(filePath);
  if (!fileFound) {
    throw new Error('File not found');
  }

  return filePath;
};
