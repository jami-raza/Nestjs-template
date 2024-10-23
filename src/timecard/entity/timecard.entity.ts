import { Client } from "src/clients/entity/client.entity";
import { Crew } from "src/crews/entity/crew.entity";
import { Employee } from "src/employees/entity/employee.entity";
import { Job } from "src/jobs/entity/job.entity";
import { Ranch } from "src/ranches/entity/ranch.entity";
import { TimeCardBreak } from "src/time-card_break/entity/time-card_break.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Timecard {

    @PrimaryGeneratedColumn('uuid')
    id:string = uuidv4()

    @Column({
        type: 'timestamptz',
        nullable: true
    })
    date:Date | null

    @ManyToOne(()=> Crew, (crew)=>crew.id, {onDelete: 'CASCADE'})
    @JoinColumn()
    crew:Crew | string

    @Column({
        type:'time',
        nullable: false,
    })
    timeIn:string | null

    @Column({
        type:'time',
        nullable: false,
        
    })
    timeOut:string | null

    @Column({
        type:'time',
        nullable: false,
        
    })
    dayStartedAt:string | null

    @Column({
        type: 'time',
        nullable: false,
        
    })
    lunchIn:string | null

    @Column({
        type:"time",
        nullable: false,
        
    })
    returnFromLunch:string | null

    @ManyToOne(()=> Client, (client)=>client.id, {onDelete: 'CASCADE'})
    @JoinColumn()
    client:Client | string

    @ManyToOne(()=>Ranch, (ranch)=>ranch.id, {onDelete: 'CASCADE'})
    @JoinColumn()
    ranch:Ranch | string

    @ManyToOne(()=>Job, (job)=>job.id, {onDelete: 'CASCADE'})
    @JoinColumn()
    job: Job | string
    // @Column({
    //     nullable: false,
    //     default:''
    // })
    // job:string

    @ManyToOne(()=>Employee, (employee)=>employee.id, {onDelete:'CASCADE'})
    employees: Employee | string | string[]

    // @Column({
    //     nullable: true,
    //     default:null
    // })
    @OneToOne(()=> TimeCardBreak, (timecardbreak)=>timecardbreak.id, {onDelete: 'CASCADE'})
    @JoinColumn()
    break: TimeCardBreak | string

    @CreateDateColumn({type: 'timestamptz'})
    createdAt! : Date;
    
    @UpdateDateColumn({
        nullable: true,
        type: 'timestamptz',
        default: ()=> 'null'
    })
    updatedAt!: Date

    
    // @OneToOne(()=> TimeCardBreak, (timecardbreak)=>timecardbreak.id, {onDelete: 'CASCADE'})
    // break: TimeCardBreak[];
}
