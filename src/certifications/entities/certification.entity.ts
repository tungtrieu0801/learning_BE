import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CertificationTranslation } from "./certification-translation.entity";
import { Domain } from "src/domains/entities/domain.entity";

@Entity('certifications')
export class Certification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length:50})
    code: string;

    @Column({ length: 100, nullable: true})
    vendor: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @OneToMany(() => CertificationTranslation, translation => translation.certification, { cascade: true })
    translations: CertificationTranslation[];

    @OneToMany(() => Domain, domain => domain.certification, { cascade: true })
    domains: Domain[];
}
