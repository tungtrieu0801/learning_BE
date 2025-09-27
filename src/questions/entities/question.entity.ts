import { Domain } from "src/domains/entities/domain.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionTranslation } from "./question-translation.entity";
import { Answer } from "src/answers/entities/answer.entity";

@Entity("questions")
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    domainId: number;

    @ManyToOne(() => Domain, (domain) => domain.questions, { onDelete: 'CASCADE' })
    domain: Domain;

    @OneToMany(() => QuestionTranslation, (translation) => translation.question, { cascade: true })
    questionTranslations: QuestionTranslation[];

    @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
    answers: Answer[]
}
