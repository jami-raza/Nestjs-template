// import { Customer } from 'src/customer/entity/customer.entity';
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
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4()

  @Column({
    nullable: false,
    default: '',
  })
  fullName: string;

  @Column({
    nullable: false,
  })
  userName: string

  @Column({
    name: 'email',
    nullable: false,
    default: '',
  })
  email: string;
  
  @Column({
    nullable: false
  })
  company: string

  @Column({
    nullable: false
  })
  role: string

  @Column({
    nullable: false
  })
  password: string
  
  @Column({
    nullable: false
  })
  confirmPassword: string

  @Column({
    nullable: false,
    type: 'enum',
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  // @Column({
  //   nullable: false,
  //   default: '',
  // })
  // role: string;

  // @ManyToOne(() => Customer, (customer) => customer.id, { onDelete: 'CASCADE' })
  // @JoinColumn({ referencedColumnName: 'id' })
  // customer!: Customer | string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  // ,default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"
  @Column({type: 'timestamptz', nullable:true})
  updatedAt?: Date | null;

  @DeleteDateColumn({type: 'timestamptz'})
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
