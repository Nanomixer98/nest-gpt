import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Stream } from 'openai/streaming';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';
import {
  orthographyCheckUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
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
}
