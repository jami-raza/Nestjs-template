import { IsUUID, validate } from 'class-validator';
import { Client } from 'src/clients/entity/client.entity';
import { CrewMembers } from 'src/crew_members/entity/crew_member.entity';
import { Employee } from 'src/employees/entity/employee.entity';
import { User } from 'src/entities';
import { Status } from 'src/utils/enums/status';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Crew {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4()


  @Column({
    nullable: false,
  })
  crewId : string

  @ManyToOne(()=> Client, (client)=>client.id, {onDelete: 'CASCADE'})
  @JoinColumn()
  client: Client | string

  // @Column({
  //   nullable: false
  // })
  // supervisor:string


  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  // @OneToOne(() => User, (admin) => admin.id, { onDelete: 'CASCADE' })
  // @JoinColumn()
  // supervisor: User | string;
  
  @ManyToOne(()=>Employee, (emp)=>emp.id, {onDelete: 'CASCADE'})
  @JoinColumn()
  supervisor: Employee | string

  @Column({
    nullable: false,
    type: 'enum',
    enum: Status,
    default: Status.Active
  })
  status: Status;

  @OneToMany(() => CrewMembers, crewMember => crewMember.crew)
  // @JoinColumn({ referencedColumnName: 'id' })
  members: CrewMembers[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamptz',
    default: () => 'null',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // @Column({
  //   nullable: false,
  //   default: '',
  // })
  // createdBy: string;

  // @Column({
  //   nullable: false,
  //   default: '',
  // })
  // updatedBy: string;

  // @Column({
  //   nullable: false,
  //   default: '',
  // })
  // deletedBy: string;

   // @ManyToOne(() => Customer, (customer) => customer.id, { onDelete: 'CASCADE' })
  // @JoinColumn({ referencedColumnName: 'id' })
  // customer!: Customer | string;

}

