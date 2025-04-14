import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import { Stream } from 'openai/streaming';
import {
  AudioToTextDto,
  ImageGenerationDto,
  ImageVariationDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import {
  audioToTextUseCase,
  generateImageVariationUseCase,
  imageGeneratedGetterUseCase,
  imageGenerationUseCase,
  imageToTextUseCase,
  orthographyCheckUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  textToAudioGetterUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Just call use cases
  async orthographyCheck(orthographyDto: OrthographyDto): Promise<any> {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser(
    prosConsDiscusserDto: ProsConsDiscusserDto,
  ): Promise<any> {
    return await prosConsDicusserUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  async prosConsDicusserStream(
    prosConsDiscusserDto: ProsConsDiscusserDto,
  ): Promise<Stream<OpenAI.Chat.Completions.ChatCompletionChunk>> {
    return await prosConsDicusserStreamUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  async translate(
    translateDto: TranslateDto,
  ): Promise<Stream<OpenAI.Chat.Completions.ChatCompletionChunk>> {
    return await translateUseCase(this.openai, {
      prompt: translateDto.prompt,
      lang: translateDto.lang,
    });
  }

  textToAudioGetter(fileId: string) {
    let filePath = '';
    try {
      filePath = textToAudioGetterUseCase({ fileId });
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`File ${fileId} not found`);
    }

    return filePath;
  }

  async textToAudio({ prompt, voice }: TextToAudioDto): Promise<string> {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDto?: AudioToTextDto,
  ): Promise<any> {
    const { prompt } = audioToTextDto || {};

    return await audioToTextUseCase(this.openai, { audioFile, prompt });
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, { ...imageGenerationDto });
  }

  imageGeneratedGetter(fileName: string) {
    let filePath = '';
    try {
      filePath = imageGeneratedGetterUseCase({ fileName });
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`File ${fileName} not found`);
    }

    return filePath;
  }

  async generateImageVariation(imageVariationDto: ImageVariationDto) {
    return await generateImageVariationUseCase(this.openai, {
      ...imageVariationDto,
    });
  }

  async imageToText(imageFile: Express.Multer.File, prompt: string) {
    return await imageToTextUseCase(this.openai, { imageFile, prompt });
  }
}
