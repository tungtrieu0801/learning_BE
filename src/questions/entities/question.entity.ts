import { Domain } from "src/domains/entities/domain.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionTranslation } from "./question-translation.entity";

@Entity("questions")
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    domainId: number;

    @ManyToOne(() => Domain, (domain) => domain.quetsions, { onDelete: 'CASCADE' })
    domain: Domain;

    @OneToMany(() => QuestionTranslation, (translation) => translation.question, { cascade: true })
    questionTranslations: QuestionTranslation[];
}
