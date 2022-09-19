import AppDataSource from "../../data-source";
import { Project } from "../../entities/projects.entity";
import { User } from "../../entities/users.entity";

const ListProjectsService = async (userId: string): Promise<Project[]> => {
  const projectsRepository = AppDataSource.getRepository(Project);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  const projectList = await projectsRepository.find({
    where: {
      user: user!,
    },
  });

  return projectList;
};

export default ListProjectsService;
