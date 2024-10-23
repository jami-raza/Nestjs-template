// import { Customer } from 'src/customer/entity/customer.entity';
import { Level } from 'src/utils/enums/level';
import { Paytype } from 'src/utils/enums/paytype';
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
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4()

  @Column({
    name: 'jobId',
    nullable: false,
    default: '',
  })
  jobId: string;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Level
  })
  level: Level

  @Column({
    name: 'comission',
    nullable: true,
    default: null,
  })
  commission: number | null;

  @Column({
    name: 'rate',
    nullable: true,
    default: null
  })
  rate: number | null;

  @Column({
    name: 'paytype',
    nullable: false,
    type: 'enum',
    enum: Paytype
  })
  paytype: Paytype


  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamptz',
    default: () => 'null',
  })
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

}
