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
export class Ranch {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4()

  @Column({
    nullable: true,
    // default: 0,
  })
  ranchNumber: string;

  @Column({
    name: 'name',
    nullable: false,
    default: '',
  })
  name: string;

  // @ManyToOne(() => Customer, (customer) => customer.id, { onDelete: 'CASCADE' })
  // @JoinColumn({ referencedColumnName: 'id' })
  // customer!: Customer | string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column({
    nullable: true,
    type: 'timestamptz',
    // default: () => 'null',
  })
  updatedAt?: Date|null;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({
    nullable: false,
    default: '',
  })
  createdBy: string;

  @Column({
    nullable: false,
    default: '',
  })
  updatedBy: string;

  @Column({
    nullable: false,
    default: '',
  })
  deletedBy: string;
}
