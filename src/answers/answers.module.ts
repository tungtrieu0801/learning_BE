import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { Answer } from './entities/answer.entity';
import { AnswerTranslation } from './entities/answer-translation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answer,
      AnswerTranslation
    ])
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
