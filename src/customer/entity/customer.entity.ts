// import { User } from 'src/entities';
// import { Status } from 'src/utils/enums/status';
// import {
//   BeforeInsert,
//   Column,
//   CreateDateColumn,
//   DeleteDateColumn,
//   Entity,
//   Generated,
//   JoinColumn,
//   ManyToOne,
//   OneToOne,
//   PrimaryGeneratedColumn,
//   Unique,
//   UpdateDateColumn,
// } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';

// @Entity()
// export class Customer {
//   @PrimaryGeneratedColumn('uuid')
//   id: string = uuidv4();

//   @Column({
//     default: '',
//     nullable: false,
//   })
//   name!: string;

//   @Column({
//     default: '',
//     nullable: false,
//   })
//   email!: string;

//   @Column({
//     default: '',
//     nullable: false,
//   })
//   contact!: string;

//   @Column({
//     default: '',
//     nullable: false,
//   })
//   address!: string;
  


//   @OneToOne(() => User, (admin) => admin.id, { onDelete: 'CASCADE' })
//   @JoinColumn()
//   defaultAdmin!: string | User;

//   @Column({
//     nullable: false,
//     type: 'enum',
//     enum: Status,
//     default: Status.Active,
//   })
//   status: Status;

//   @Column({
//     nullable: false,
//     default: '',
//   })
//   image: string;

//   @CreateDateColumn({ type: 'timestamptz' })
//   createdAt!: Date;

//   @UpdateDateColumn({
//     nullable: true,
//     type: 'timestamptz',
//     default: () => 'null',
//   })
//   updatedAt!: Date;

//   @DeleteDateColumn()
//   deletedAt?: Date;

//   @Column({
//     nullable: false,
//     default: '',
//   })
//   createdBy: string;

//   @Column({
//     nullable: false,
//     default: '',
//   })
//   updatedBy: string;

//   @Column({
//     nullable: false,
//     default: '',
//   })
//   deletedBy: string;
// }
