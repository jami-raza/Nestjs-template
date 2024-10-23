import { Exclude } from 'class-transformer';
// import { Customer } from 'src/customer/entity/customer.entity';
import { Role } from 'src/roles/entity/role.entity';
import { Status } from 'src/utils/enums/status';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  Admin = 'admin',
  SuperAdmin = 'superadmin',
  Employee = 'employee',
  Client = 'client',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4()

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    name: 'email',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: false,
    default: '',
  })
  passwordResetToken: string;

  @Column({
    nullable: false,
    default: '',
  })
  resetTokenExpiryAt: string;

  @Column({
    nullable: false,
    default: false,
  })
  hasLoggedIn: boolean;

  @Column({
    nullable: true,
    default: null,
    type: 'timestamptz',
  })
  lastLoggedIn!: Date;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  @Column({
    nullable: false,
    default: '',
  })
  image: string;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ referencedColumnName: 'id' })
  role!: Role;

  // @ManyToOne(() => Customer, (customer) => customer.id, { onDelete: 'CASCADE' })
  // @JoinColumn({ referencedColumnName: 'id' })
  // customer?: Customer | string;

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
