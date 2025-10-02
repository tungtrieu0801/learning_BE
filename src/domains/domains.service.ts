import { Injectable } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';
import { Repository } from 'typeorm';
import { DomainTranslation } from './entities/domain.translation.entity';
import { Certification } from 'src/certifications/entities/certification.entity';
import { ensureExists } from 'src/utils/check-entity.utils';
import { GetAllDomainDto } from './dto/GetAllDomainDto';

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

  async findAll(params: GetAllDomainDto) {
    const { certificationId, language, page, limit } = params;

    const sql = this.domainRepository
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.domainTranslations', 'dt')
      .leftJoin('d.certification', 'c')
      .where('1=1');
    if (certificationId) {
      sql.andWhere('d.certificationId = :certificationId', { certificationId });
    }
    if (language) {
      sql.andWhere('dt.languageCode = :language', { language });
    }
    sql.skip((page -1) * limit).take(limit);
    const [items, total] = await sql.getManyAndCount();
    return {
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit),
      },
    };
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
