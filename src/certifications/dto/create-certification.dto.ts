import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { CertificationTranslationDto } from "./certification-translation.dto";

export class CreateCertificationDto {

    @IsString()
    code: string;

    @IsString()
    @IsOptional()
    vendor?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CertificationTranslationDto)
    translations: CertificationTranslationDto[];
}
