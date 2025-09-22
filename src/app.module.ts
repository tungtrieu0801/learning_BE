import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { TagsModule } from './tags/tags.module';
import { QuestionsModule } from './questions/questions.module';
import { ObjectivesModule } from './objectives/objectives.module';
import { DomainsModule } from './domains/domains.module';
import { CertificationsModule } from './certifications/certifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: { rejectUnauthorized: false },
      }),
    }),
    CertificationsModule,
    DomainsModule,
    ObjectivesModule,
    QuestionsModule,
    TagsModule,
    SeedModule,
  ],
})
export class AppModule {}
