import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/user";
import { User } from "../../entities/users.entity";
import { hash } from "bcryptjs";

const updateUserService = async (
  id: string,
  userId: string,
  userData: IUserRequest
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (id !== userId) {
    throw new AppError("User does not have permission", 403);
  }

  const hashedPassword = userData.password ? await hash(userData.password, 10) : user.password;

  await userRepository.update(id, {
    name: userData.name || user.name,
    email: userData.email || user.email,
    password: hashedPassword,
    updatedAt: new Date(),
  });

  const updatedUser = await userRepository.findOne({
    where: { id },
    relations: {
      projects: true,
    },
  });

  return updatedUser!;
};

export default updateUserService;
