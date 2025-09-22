import { IsString } from "class-validator";

export class CertificationTranslationDto {

    @IsString()
    langeuageCode: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

}