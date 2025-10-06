import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Certification } from "./certification.entity";

@Entity('certification_translations')
export class CertificationTranslation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Certification, certification => certification.translations, { onDelete: 'CASCADE'})
    certification: Certification;

    @Column({ length: 5, name: 'language_code' })
    languageCode: string;

    @Column({ length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;
}