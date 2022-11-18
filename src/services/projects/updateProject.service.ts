import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { Project } from "../../entities/projects.entity";
import { IProjectRequest } from "../../interfaces/projects";
import { User } from "../../entities/users.entity";

const updateProjectService = async (
  id: string,
  userId: string,
  projectData: IProjectRequest
): Promise<Project> => {
  const projectRepository = AppDataSource.getRepository(Project);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });
  const project = await projectRepository.findOne({
    where: { id },
    relations: { user: true },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (project.user.id !== user!.id) {
    throw new AppError("User does not have permission", 403);
  }

  await projectRepository.update(id, {
    name: projectData.name || project.name,
    type: projectData.type || project.type,
    image: projectData.image || project.image,
    description: projectData.description || project.description,
    repository: projectData.repository || project.repository,
    application: projectData.application || project.application,
    updatedAt: new Date(),
  });

  const updatedProject = await projectRepository.findOneBy({ id });

  return updatedProject!;
};

export default updateProjectService;
