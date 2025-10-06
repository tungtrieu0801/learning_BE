import { IsString } from "class-validator";

export class CertificationTranslationDto {

    @IsString()
    languageCode: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

}