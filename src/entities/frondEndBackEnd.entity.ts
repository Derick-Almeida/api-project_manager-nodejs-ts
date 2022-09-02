import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectBackEnd } from "./projectsBackEnd.entity";
import { ProjectFrontEnd } from "./projectsFrontEnd.entity";

@Entity("frontEnd_backEnd")
class FrontEndBackEnd {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @OneToMany(() => ProjectFrontEnd, (front) => front.projects, { eager: true })
  frontEnd: ProjectFrontEnd[];

  @OneToMany(() => ProjectBackEnd, (back) => back.projects, { eager: true })
  backEnd: ProjectBackEnd[];
}

export { FrontEndBackEnd };
