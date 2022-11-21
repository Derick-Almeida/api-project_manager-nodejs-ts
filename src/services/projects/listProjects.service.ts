import AppDataSource from "../../data-source";
import { Project } from "../../entities/projects.entity";
import { instanceToPlain } from "class-transformer";
import "dotenv/config";

const ListProjectsService = async (
  userId: string,
  projectType: string,
  page: number,
  perPage: number
): Promise<Object> => {
  const projectsRepository = AppDataSource.getRepository(Project);

  const projects = await projectsRepository.findAndCount({
    where: {
      user: {
        id: userId,
      },
      type: projectType || undefined,
    },
    order: {
      createdAt: "DESC",
    },
    skip: page === 1 ? 0 : (page - 1) * perPage,
    take: perPage,
  });

  const pages = Math.ceil(projects[1] / perPage);

  return {
    count: projects[1],
    pages,
    next:
      pages > 1 && page < pages
        ? `${process.env.BASE_URL}/projects?${projectType && `type=${projectType}&`}page=${
            page + 1
          }`
        : null,
    prev:
      page != 1
        ? `${process.env.BASE_URL}/projects?${projectType && `type=${projectType}&`}page=${
            page - 1
          }`
        : null,
    data: instanceToPlain(projects[0]),
  };
};

export default ListProjectsService;
