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

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  clipId?: number | null

  @Column({ type: 'int', nullable: true })
  userId?: number | null

  @ManyToOne(type => ClipModel, clip => clip.ratings, { onDelete: 'CASCADE' })
  clip: ClipModel;

  @ManyToOne(type => UserModel, user => user.ratings, { onDelete: 'CASCADE' })
  user: UserModel;
}
