import { IsString } from "class-validator";

export class QuestionTranslationDto {
    
    @IsString()
    languageCode: string;

    @IsString()
    questionText: string;

    @IsString()
    explanation: string;
}