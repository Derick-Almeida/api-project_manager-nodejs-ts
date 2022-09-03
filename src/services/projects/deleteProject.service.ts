import AppDataSource from "../../data-source";
import { Project } from "../../entities/projects.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

const deleteProjectService = async (id: string, userId: string) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });
  const project = await projectRepository.findOneBy({ id });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (user!.id !== userId) {
    throw new AppError("User does not have permission", 401);
  }

  await projectRepository.delete(id);
};

export default deleteProjectService;
