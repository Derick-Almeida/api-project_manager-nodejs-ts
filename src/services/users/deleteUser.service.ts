import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

const deleteUserService = async (id: string, userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.id !== userId) {
    throw new AppError("User does not have permission", 401);
  }

  await userRepository.delete(id);
};

export default deleteUserService;
