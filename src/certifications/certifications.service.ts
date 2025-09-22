import { Injectable } from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { PaginationDto } from 'src/common/dto/pageination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CertificationsService {

  constructor(
    @InjectRepository(Certification)
    private certificationRepo: Repository<Certification>,
  ) {}

  create(createCertificationDto: CreateCertificationDto) {
    return 'This action adds a new certification';
  }

  async findAll(query: PaginationDto) {
    const { page, limit, sortBy, order, search } = query;
    const [data, total] = await this.certificationRepo.findAndCount({
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

  findOne(id: number) {
    return `This action returns a #${id} certification`;
  }

  update(id: number, updateCertificationDto: UpdateCertificationDto) {
    return `This action updates a #${id} certification`;
  }

  remove(id: number) {
    return `This action removes a #${id} certification`;
  }
}
