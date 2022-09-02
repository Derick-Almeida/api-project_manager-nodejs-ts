import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { FrontEndBackEnd } from "./frondEndBackEnd.entity";

@Entity("projects_backEnd")
class ProjectBackEnd {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 300 })
  image: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 300 })
  repository: string;

  @Column({ length: 300 })
  application: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @CreateDateColumn({ type: "date" })
  updatedAt: Date;

  @ManyToOne(() => FrontEndBackEnd, (frontAndBack) => frontAndBack.backEnd)
  projects: FrontEndBackEnd;
}

export { ProjectBackEnd };
