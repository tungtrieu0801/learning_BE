import { IsString } from "class-validator";

export class AnswerTranslationDto {

    @IsString()
    languageCode: string;

    @IsString()
    answerText: string;
    
}