import { createReadStream } from 'fs';
import OpenAI from 'openai';
import { downloadImageAsPng } from '../../helpers';

interface Options {
  baseImage: string;
}

export const generateImageVariationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { baseImage } = options;
  const pngImagePath = await downloadImageAsPng(baseImage, true);
  const response = await openai.images.createVariation({
    model: 'dall-e-2',
    image: createReadStream(pngImagePath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await downloadImageAsPng(response.data[0].url!);
  const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

  return {
    url,
    localPath: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};
