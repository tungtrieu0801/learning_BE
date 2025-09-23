import { Injectable } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';
import { Repository } from 'typeorm';
import { DomainTranslation } from './entities/domain.translation.entity';
import { Certification } from 'src/certifications/entities/certification.entity';

@Injectable()
export class DomainsService {

  constructor (
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,

    @InjectRepository(Domain)
    private domainRepository: Repository<Domain>,

    @InjectRepository(DomainTranslation)
    private domainTranslationRepo: Repository<DomainTranslation>,
  ) {}

  async create(createDomainDto: CreateDomainDto) {

    // Check if certification exists
    const certification = await this.certificationRepository.findOne({
      where: { id: createDomainDto.certificationId },
    })

    if (!certification) {
      throw new Error('Certification not found');
    }

    const domain = this.domainRepository.create({
      code: createDomainDto.code,
      orderNo: createDomainDto.orderNumber,
      certificationId: createDomainDto.certificationId,
      domainTranslations: createDomainDto.translations.map((t) => ({
        languageCode: t.langeuageCode,
        name: t.name,
        description: t.description,
      })),
    })

    return 'This action adds a new domain';
  }

  findAll() {
    return `This action returns all domains`;
  }

  findOne(id: number) {
    return `This action returns a #${id} domain`;
  }

  update(id: number, updateDomainDto: UpdateDomainDto) {
    return `This action updates a #${id} domain`;
  }

  remove(id: number) {
    return `This action removes a #${id} domain`;
  }
}
