import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @CreateDateColumn({ type: "date" })
  updatedAt: Date;

  @ManyToOne(() => User)
  @Exclude()
  user: User;
}

export { Project };
