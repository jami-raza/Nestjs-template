import { Crew } from 'src/crews/entity/crew.entity';
// import { Customer } from 'src/customer/entity/customer.entity';
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
export class CrewMembers {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4()

  @ManyToOne(() => Employee, (employee) => employee.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  employee: string | Employee;

  // @OneToOne(() => Employee, (emp) => emp.firstName, { onDelete: 'CASCADE' })
  // @JoinColumn()
  // name: string | Employee;

  @ManyToOne(() => Crew, (crew) => crew.id, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  crew?: Crew | string;

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
