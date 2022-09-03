import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

const getUserService = async (id: string, userId: string) => {
  const useRepository = AppDataSource.getRepository(User);
  const user = await useRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (id !== userId) {
    throw new AppError("User does not have permission", 401);
  }

  return user;
};

export default getUserService;
