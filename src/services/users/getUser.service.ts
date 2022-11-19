import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";

const getUserService = async (userId: string) => {
  const useRepository = AppDataSource.getRepository(User);
  const user = await useRepository.findOneBy({ id: userId });

  return user;
};

export default getUserService;
