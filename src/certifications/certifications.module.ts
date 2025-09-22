import { Module } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CertificationsController } from './certifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import { CertificationTranslation } from './entities/certification-translation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Certification,
      CertificationTranslation
    ])
  ],
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
