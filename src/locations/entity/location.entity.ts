// import { Customer } from 'src/customer/entity/customer.entity';
import { Client } from 'src/clients/entity/client.entity';
import { Ranch } from 'src/ranches/entity/ranch.entity';
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
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4()

  @Column({
    nullable: false,
    default: '',
  })
  fieldName: string;

  @Column({
    name: 'fieldId',
    nullable: false,
    default: '',
  })
  fieldId: string;
  @Column({
    name: 'crop',
    nullable: false,
    default: '',
  })
  crop: string;
  @Column({
    name: 'comission',
    nullable: false,
    default: '',
  })
  commission: string;
  
  @Column({
    name: 'acres',
    nullable: false,
    default: '',
  })
  acres: string;

  @ManyToOne(() => Ranch, (ranch) => ranch.id, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  ranch!: Ranch | string;

  @ManyToOne(()=> Client, (client)=> client.id, {onDelete: 'CASCADE'})
  @JoinColumn({ referencedColumnName: 'id'})
  client! : Client | string;
  // @ManyToOne(() => Customer, (customer) => customer.id, { onDelete: 'CASCADE' })
  // @JoinColumn({ referencedColumnName: 'id' })
  // customer!: Customer | string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column({
    nullable: true,
    type: 'timestamptz',
  })
  updatedAt!: Date | null;

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
