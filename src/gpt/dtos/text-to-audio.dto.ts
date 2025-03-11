import { IsOptional, IsString } from 'class-validator';

export class textToAudioDto {
  @IsString()
  readonly prompt: string;
  @IsString()
  @IsOptional()
  readonly voice: string;
}
