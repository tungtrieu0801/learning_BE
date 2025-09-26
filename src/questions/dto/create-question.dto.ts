import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { AnswerTranslation } from "src/answers/entities/answer-translation.entity";
import { QuestionTranslationDto } from "./question-translation.dto";
import { AnswerTranslationDto } from "src/answers/dto/answer-translation.dto";

export class CreateQuestionDto {

    @IsNumber()
    domainId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionTranslationDto)
    questionTranslation: QuestionTranslationDto;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AnswerTranslationDto)
    answerTranslation: AnswerTranslationDto;
    
}
