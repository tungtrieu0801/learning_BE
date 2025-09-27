import { IsNumber, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pageination.dto";

export class GetAllQuestionDto extends PaginationDto{

    @IsString()
    certificationId: number;

    @IsString()
    domainId: number;

    @IsString()
    language: string;
}