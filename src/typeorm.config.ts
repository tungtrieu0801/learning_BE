import { DataSource } from 'typeorm';
import { Certification } from './certifications/entities/certification.entity';
// import thêm các entity khác nếu cần
import 'dotenv/config';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'quizdb',
  entities: [
    Certification,
    // các entity khác...
  ],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  ssl: { rejectUnauthorized: false },
});
