import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  id!: number
  
  @CreateDateColumn()
  createdAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    default: false,
  })
  isDeleted!: boolean;

  @DeleteDateColumn()
  deletedAt!: Date;
}