import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';

@Controller('domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Post()
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainsService.create(createDomainDto);
  }

  @Get(':certificationId')
  findAll(@Param ('certificationId') certificationId: number) {
    return this.domainsService.findAll(certificationId);
  }

  @Get(':id')
  findOne(@Param('certificationId') certificationId: number, @Param('id') domainId: number, ) {
    return this.domainsService.getDetailDomain(certificationId, domainId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainsService.update(+id, updateDomainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainsService.remove(+id);
  }
}
