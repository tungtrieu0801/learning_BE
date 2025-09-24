import { Certification } from 'src/certifications/entities/certification.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DomainTranslation } from './domain.translation.entity';
import { Question } from 'src/questions/entities/question.entity';

@Entity('domains')
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'certification_id' })
  certificationId: number;

  @ManyToOne(() => Certification, (cert) => cert.domains, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'certification_id' })
  certification: Certification;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ name: 'order_no', type: 'int' })
  orderNo: number;

  @OneToMany(()=> DomainTranslation, domainTranslation => domainTranslation.domain, { cascade: true })
  domainTranslations: DomainTranslation[];

  @OneToMany(() => Question, (question) => question.domain, { cascade: true })
  quetsions: Question[];
}
