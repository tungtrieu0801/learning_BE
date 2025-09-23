import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { DomainTranslationDto } from "./domain-translation.dto";

export class CreateDomainDto {

    @IsString()
    code: string;

    @IsNumber()
    orderNumber: number;

    @IsNumber()
    certificationId: number;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DomainTranslationDto)
    translations: DomainTranslationDto[];
}
