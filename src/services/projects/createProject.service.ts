import AppDataSource from "../../data-source";
import { IProjectRequest } from "../../interfaces/projects";
import { Project } from "../../entities/projects.entity";
import { User } from "../../entities/users.entity";

const createProjectService = async (
  projectData: IProjectRequest,
  userId: string
): Promise<Project> => {
  const projectRepository = AppDataSource.getRepository(Project);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  const project = await projectRepository.save({
    name: projectData.name,
    type: projectData.type,
    image: projectData.image,
    description: projectData.description,
    repository: projectData.repository,
    application: projectData.application,
    user: user!,
  });

  const createdProject = await projectRepository.findOneBy({ id: project.id });

  return createdProject!;
};

export default createProjectService;
