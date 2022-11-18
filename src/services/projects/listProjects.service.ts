import AppDataSource from "../../data-source";
import { Project } from "../../entities/projects.entity";
import { User } from "../../entities/users.entity";

const ListProjectsService = async (userId: string, projectType: string): Promise<Project[]> => {
  const projectsRepository = AppDataSource.getRepository(Project);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  const projects = await projectsRepository.find({
    where: {
      user: user!,
    },
  });

  const projectList = projects.filter((project) => {
    if (projectType !== "") {
      return project.type.toLowerCase() === projectType.toLowerCase();
    } else {
      return project;
    }
  });

  return projectList;
};

export default ListProjectsService;
