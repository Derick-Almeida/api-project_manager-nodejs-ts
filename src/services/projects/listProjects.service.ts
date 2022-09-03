import AppDataSource from "../../data-source";
import { Project } from "../../entities/projects.entity";

const ListProjectsService = async (): Promise<Project[]> => {
  const projectsRepository = AppDataSource.getRepository(Project);

  const projectList = await projectsRepository.find();

  return projectList;
};

export default ListProjectsService;
