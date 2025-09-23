import { IsString } from "class-validator";

export class DomainTranslationDto {

    @IsString()
    langeuageCode: string;

    @IsString()
    name: string;

    @IsString()
    description: string;
}