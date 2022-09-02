import AppDataSource from "../../data-source";
import { ProjectBackEnd } from "../../entities/projectsBackEnd.entity";
import { ProjectFrontEnd } from "../../entities/projectsFrontEnd.entity";

const ListProjectsService = () => {
  const projectsFrontRepository = AppDataSource.getRepository(ProjectFrontEnd);
  const projectsBackRepository = AppDataSource.getRepository(ProjectBackEnd);
};

export default ListProjectsService;
