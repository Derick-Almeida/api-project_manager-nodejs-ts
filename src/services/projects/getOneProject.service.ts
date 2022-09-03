import AppDataSource from "../../data-source";
import { Project } from "../../entities/projects.entity";
import AppError from "../../errors/AppError";

const getOneProjectService = async (id: string): Promise<Project> => {
  const projectsRepository = AppDataSource.getRepository(Project);

  const project = await projectsRepository.findOneBy({ id });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project;
};

export default getOneProjectService;
