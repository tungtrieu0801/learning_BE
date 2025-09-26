import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";

@Entity("answer_translations")
export class AnswerTranslation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answerId: number;

    @Column({ length: 5 })
    languageCode: string;

    @Column()
    answerText: string; //dap an

    @ManyToOne(() => Answer, (answer) => answer.answerTranslations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'answerId' })
    answer: Answer;

}