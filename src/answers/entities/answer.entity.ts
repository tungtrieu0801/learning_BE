import { Question } from "src/questions/entities/question.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnswerTranslation } from "./answer-translation.entity";

@Entity("answers")
export class Answer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    questionId: number;

    @Column({ default: false })
    isCorrect: boolean;

    @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'questionId' })
    question: Question;

    @OneToMany(() => AnswerTranslation, (translation) => translation.answer, { cascade: true })
    answerTranslations: AnswerTranslation[];

}
