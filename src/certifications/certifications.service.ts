import { Injectable } from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { PaginationDto } from 'src/common/dto/pageination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import { Like, Repository } from 'typeorm';
import { CertificationTranslation } from './entities/certification-translation.entity';

@Injectable()
export class CertificationsService {

  constructor(
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,

    @InjectRepository(CertificationTranslation)
    private certificationTranslationRepo: Repository<CertificationTranslation>,
  ) {}

  async create(createCertificationDto: CreateCertificationDto) {
    const { code, vendor, translations } = createCertificationDto;
    const certification = this.certificationRepository.create({
      code,
      vendor,
      translations: translations.map(translation => this.certificationTranslationRepo.create({
        languageCode: translation.languageCode,
        name: translation.name,
        description: translation.description,
      })),
    });

    await this.certificationRepository.save(certification);
    return certification;
  }

  async findAll(query: PaginationDto) {
    const { page, limit, sortBy, order, search } = query;
    const [data, total] = await this.certificationRepository.findAndCount({
      order: sortBy ? { [sortBy]: order.toUpperCase() } : {},
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, language: string) {
    const certification = await this.certificationRepository.findOne({
      where: { id },
      relations: ['translations'],
    });

    if(!certification) return null;

    const translation = certification.translations.find(
      t => t.languageCode === language.toLowerCase(),
    ) || certification.translations[0];
    return {
      id: certification.id,
      code: certification.code,
      vendor: certification.vendor,
      createdAt: certification.createdAt,
      name: translation?.name || null,
      description: translation?.description || null,
      language: translation?.languageCode || null,
    };
  }

  update(id: number, updateCertificationDto: UpdateCertificationDto) {
    return `This action updates a #${id} certification`;
  }

  async deteleCertification(id: string) {
    const result = await this.certificationRepository.delete(id);
    if (result.affected && result.affected > 0) {
      return {
        message: 'Success',
        code: '1'
      }
    }
    return {
      message: 'Error',
      code: '0'
    };
  }
}
