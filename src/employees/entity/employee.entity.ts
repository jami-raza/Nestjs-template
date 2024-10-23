// import { Customer } from 'src/customer/entity/customer.entity';
import { Period } from 'src/utils/enums/period';
import { Status } from 'src/utils/enums/status';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')   
  id: string = uuidv4();

  @Column({
    nullable:false,
    // type: 'bigint'

  })
  empId: string;

  @Column({
    nullable:false
  })
  company:string

  @Column({
    nullable:false,
  })
  role:string

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable:true
  })
  midName:string;

  @Column({
    nullable:true
  })
  lastName:string;

  @Column({
    nullable:false
  })
  gender:string;
  
  @Column({
    nullable:false,
    type: "decimal",
    precision:10,
    scale:2,
    default:0
  })
  hourlyRate:number;

  @Column({type:'time'})
  dayStartedAt: string;

  @Column({
    nullable:false,
    type:"enum",
    enum: Period,
    default:Period.Monday
  })
  period:Period

  @Column({
    nullable:false,
    type: "decimal",
    precision:10,
    scale:2,
    default:0
  })
  minWageRate:number

  @Column({
    nullable:false
  })
  overTime:string

  @Column({
    nullable:false
  })
  doubleTime:string

  @Column({
    nullable:false,
    type: "decimal",
    precision:10,
    scale:2,
    default:0
  })
  mealTimeWageRate:number;

  // @Column({
  //   name: 'email',
  //   nullable: false,
  //   default: '',
  // })
  // email: string;

  // @Column({
  //   nullable: false,
  //   type: 'enum',
  //   enum: Status,
  //   default: Status.Active,
  // })
  // status: Status;

  // @Column({
  //   nullable: false,
  //   default: '',
  // })
  // image: string;


  // @Column({
  //   nullable: false,
  //   default: '',
  // })
  // role: string;


  // @Column({
  //   nullable: false,
  //   default: '',
  // })
  // gender: string;

  // @ManyToOne(() => Customer, (customer) => customer.id, { onDelete: 'CASCADE' })
  // @JoinColumn({ referencedColumnName: 'id' })
  // customer!: Customer | string;


  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamptz',
    default: () => 'null',
  })
  updatedAt!: Date;

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
}
