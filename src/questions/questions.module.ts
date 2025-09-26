import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionTranslation } from './entities/question-translation.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        Question,
        QuestionTranslation
      ])
    ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
