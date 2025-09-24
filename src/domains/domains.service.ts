import { Injectable } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';
import { Repository } from 'typeorm';
import { DomainTranslation } from './entities/domain.translation.entity';
import { Certification } from 'src/certifications/entities/certification.entity';
import { ensureExists } from 'src/utils/check-entity.utils';

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
        languageCode: t.languageCode,
        name: t.name,
        description: t.description,
      })),
    })

    return this.domainRepository.save(domain);
  }

  async findAll(certificationId: number) {
    await ensureExists(this.certificationRepository, { id: certificationId }, 'Certification');

    const domains = await this.domainRepository.find({
      where: { certificationId },
      relations: ['domainTranslations'],
    })
    console.log("domeains: ", domains);
    return domains;
  }

  async getDetailDomain(certificationId: number, domainId: number) {
    await ensureExists(this.certificationRepository, { id: certificationId }, 'Certification');

    const domain = await this.domainRepository.findOneOrFail({
      where: { id: domainId, certificationId: certificationId },
      relations: ['domainTranslations'],
    });

    return domain;
  }

  update(id: number, updateDomainDto: UpdateDomainDto) {
    return `This action updates a #${id} domain`;
  }

  remove(id: number) {
    return `This action removes a #${id} domain`;
  }
}
