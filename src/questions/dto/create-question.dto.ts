import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { QuestionTranslationDto } from "./question-translation.dto";
import { AnswerTranslationDto } from "src/answers/dto/answer-translation.dto";
import { AnswerDto } from "src/answers/dto/answer.dto";

export class CreateQuestionDto {

  @IsNumber()
  domainId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionTranslationDto)
  questionTranslations: QuestionTranslationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
