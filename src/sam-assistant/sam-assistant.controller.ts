import { Body, Controller, Post } from '@nestjs/common';
import { QuestionDto } from './dtos/question.dto';
import { SamAssistantService } from './sam-assistant.service';

@Controller('sam-assistant')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) {}

  @Post('create-thread')
  async createThread() {
    return this.samAssistantService.createThread();
  }

  @Post('user-question')
  async userQuestion(@Body() questionDot: QuestionDto) {
    return this.samAssistantService.userQuestion(questionDot);
  }
}
