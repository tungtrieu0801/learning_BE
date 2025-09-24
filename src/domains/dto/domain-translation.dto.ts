import { IsString } from "class-validator";

export class DomainTranslationDto {

    @IsString()
    languageCode: string;

    @IsString()
    name: string;

    @IsString()
    description: string;
}