import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('certifications')
export class Certification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length:50})
    code: string;

    @Column({ length: 100, nullable: true})
    vender: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
}
