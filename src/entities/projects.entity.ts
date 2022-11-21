import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./users.entity";

@Entity("projects")
class Project {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  type: string;

  @Column({ length: 250 })
  image: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 250 })
  repository: string;

  @Column({ length: 250 })
  application: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  @Exclude()
  user: User;
}

export { Project };
