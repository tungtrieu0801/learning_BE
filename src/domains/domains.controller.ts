import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { GetAllDomainDto } from './dto/GetAllDomainDto';

@Controller('domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Post()
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainsService.create(createDomainDto);
  }

  @Get()
  findAll(@Query() query: GetAllDomainDto) {
    return this.domainsService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('certificationId') certificationId: number, @Param('id') domainId: number, ) {
  //   return this.domainsService.getDetailDomain(certificationId, domainId);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainsService.update(+id, updateDomainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainsService.remove(+id);
  }
}
