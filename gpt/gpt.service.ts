import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import { Stream } from 'openai/streaming';
import {
  OrthographyDto,
  ProsConsDiscusserDto,
  textToAudioDto,
  TranslateDto,
} from './dtos';
import {
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

  async textToAudio({ prompt, voice }: textToAudioDto): Promise<string> {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }
}
