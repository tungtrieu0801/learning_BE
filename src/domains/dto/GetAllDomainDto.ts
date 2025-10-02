import { IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pageination.dto";

export class GetAllDomainDto extends PaginationDto {

        @IsString()
        certificationId: number;
    
        @IsString()
        language: string;
}