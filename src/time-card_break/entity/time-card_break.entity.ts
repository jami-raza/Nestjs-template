import { Timecard } from "src/timecard/entity/timecard.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class TimeCardBreak {
    @PrimaryGeneratedColumn("uuid")
    id:string =uuidv4()

    @OneToOne(()=>Timecard, (timecard)=>timecard.id, {onDelete: "CASCADE"})
    @JoinColumn({ referencedColumnName: 'id' })
    timeCard?: Timecard  | string

    @Column({
        type: 'time',
        nullable: true
    })
    break1?: string | null
    
    @Column({
        type: 'time',
        nullable: true
    })
    returnFromBreak1?: string | null

    @Column({
        type: 'time',
        nullable: true
    })
    break2?: string | null

    @Column({
        type: 'time',
        nullable: true
    })
    returnFromBreak2?: string | null

    @Column({
        type: 'time',
        nullable: true
    })
    break3?: string | null

    @Column({
        type: 'time',
        nullable: true
    })
    returnFromBreak3?: string | null
}