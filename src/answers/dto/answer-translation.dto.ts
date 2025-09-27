import { IsBoolean, IsString } from "class-validator";

export class AnswerTranslationDto {

    @IsString()
    languageCode: string;

    @IsString()
    answerText: string;
    
}