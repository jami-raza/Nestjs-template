import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum User_Role {
  Admin = 'admin',
  SuperAdmin = 'superadmin',
  Employee = 'employee',
  Client = 'client',
}



@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4()

  @Column({
    nullable: false,
    type: 'enum',
    enum: User_Role,
  })
  role: User_Role;

  @Column({
    nullable: false,
    default: '',
  })
  description!: string;

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
