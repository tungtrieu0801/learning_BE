import { Type } from "class-transformer";
import { IsArray, IsBoolean, ValidateNested } from "class-validator";
import { AnswerTranslationDto } from "./answer-translation.dto";

export class AnswerDto {

    @IsBoolean()
    isCorrect: boolean;

    @IsArray()
    @ValidateNested({ each:true })
    @Type(() => AnswerTranslationDto)
    answerTranslations: AnswerTranslationDto[];

}