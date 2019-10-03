import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { UserModel } from "./UserModel";
import { ClipModel } from "./ClipModel";

@Entity("ratings")
export class RatingModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  stars: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => ClipModel, clip => clip.ratings)
  clip: ClipModel;

  @ManyToOne(type => UserModel, user => user.ratings)
  user: UserModel;
}
