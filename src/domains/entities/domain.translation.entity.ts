import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Domain } from "./domain.entity";

@Entity("domain_translations")
export class DomainTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'language_code', type: 'varchar', length: 10 })
    languageCode: string

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => Domain, domain => domain.domainTranslations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'domain_id' })
    domain: Domain;
}