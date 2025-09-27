import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionTranslation } from './entities/question-translation.entity';
import { Answer } from 'src/answers/entities/answer.entity';
import { AnswerTranslation } from 'src/answers/entities/answer-translation.entity';
import { Certification } from 'src/certifications/entities/certification.entity';
import { Domain } from '../domains/entities/domain.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        Question,
        QuestionTranslation,
        Answer, 
        AnswerTranslation,
        Certification,
        Domain
      ])
    ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
