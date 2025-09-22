import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { PaginationDto } from 'src/common/dto/pageination.dto';

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Post()
  create(@Body() createCertificationDto: CreateCertificationDto) {
    return this.certificationsService.create(createCertificationDto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.certificationsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Query('language') language: string) {
    const certification = await this.certificationsService.findOne(id, language || 'en');
    return certification;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificationDto: UpdateCertificationDto) {
    return this.certificationsService.update(+id, updateCertificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificationsService.remove(+id);
  }
}
