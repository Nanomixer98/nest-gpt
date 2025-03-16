import * as path from 'path';
import * as fs from 'fs';

interface Options {
  fileName: string;
}

export const imageGeneratedGetterUseCase = ({ fileName }: Options) => {
  const filePath = path.resolve(
    __dirname,
    '../../../generated/images/',
    `${fileName}`,
  );
  const fileFound = fs.existsSync(filePath);
  if (!fileFound) {
    throw new Error('File not found');
  }

  return filePath;
};
