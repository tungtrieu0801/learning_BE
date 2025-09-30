import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Answer } from 'src/answers/entities/answer.entity';
import { GetAllQuestionDto } from './dto/request/get-all.question.dto';
import { Domain } from '../domains/entities/domain.entity';
import { Certification } from 'src/certifications/entities/certification.entity';

@Injectable()
export class QuestionsService {

  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,

    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,

    @InjectRepository(Domain)
    private domainRepository: Repository<Domain>,

    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
    
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    // Tạo question cùng translations
    const question = this.questionRepository.create({
      domainId: createQuestionDto.domainId,
      questionTranslations: createQuestionDto.questionTranslations.map((t) => ({
        languageCode: t.languageCode,
        questionText: t.questionText,
        explanation: t.explanation,
      })),
      answers: createQuestionDto.answers.map((a) => ({
        isCorrect: a.isCorrect,
        answerTranslations: a.answerTranslations.map((at) => ({
          languageCode: at.languageCode,
          answerText: at.answerText,
        })),
      })),
    });
    return await this.questionRepository.save(question);
  }

  async findAll(params: GetAllQuestionDto) {
    const { certificationId, domainId, language, page, limit, sortBy, order } =
      params;

    const qb = this.questionRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.questionTranslations', 'qt')
      .leftJoinAndSelect('q.answers', 'a')
      .leftJoinAndSelect('a.answerTranslations', 'at')
      .leftJoin('q.domain', 'd')
      .leftJoin('d.certification', 'c')
      .where('1=1');

    if (certificationId) {
      qb.andWhere('d.certificationId = :certificationId', { certificationId });
    }

    if (domainId) {
      qb.andWhere('q.domainId = :domainId', { domainId });
    }

    if (language) {
      qb.andWhere('qt.languageCode = :language', { language })
        .andWhere('at.languageCode = :language', { language });
    }

    // Sort
    if (sortBy) {
      qb.orderBy(`q.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      qb.orderBy('q.id', 'ASC');
    }

    // Pagination
    qb.skip((page - 1) * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async remove(id: number) {
    return await this.certificationRepository.delete(id);
  }
}
