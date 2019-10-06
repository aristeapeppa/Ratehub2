import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import {UserModel} from "./UserModel";
import {RatingModel} from "./RatingModel";

@Entity("clips")
export class ClipModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  description: string;

  @Column()
  @IsNotEmpty()
  uid: string;

  @Column()
  reports: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  userId?: number | null

  @OneToMany(type => RatingModel, rating => rating.clip)
  ratings: RatingModel[];

  @ManyToOne(type => UserModel, user => user.clips, { onDelete: 'CASCADE' })
  user: UserModel;
}
