import { Module } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';
import { DomainTranslation } from './entities/domain.translation.entity';
import { Certification } from 'src/certifications/entities/certification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Domain,
      DomainTranslation,
      Certification
    ])
  ],
  controllers: [DomainsController],
  providers: [DomainsService],
})
export class DomainsModule {}
