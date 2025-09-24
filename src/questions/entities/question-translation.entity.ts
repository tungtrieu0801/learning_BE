import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity("question_translations")
export class QuestionTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionId: number;

    @Column({ length: 5 })
    languageCode: string;

    @Column()
    text: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => Question, (question) => question.questionTranslations, { onDelete: 'CASCADE' })
    question: Question;
}