import { compare, hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/user";

const updateUserService = async (
  id: string,
  userId: string,
  userData: IUserRequest
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  let matchPassword;

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.id !== userId) {
    throw new AppError("User does not have permission", 401);
  }

  if (userData.password) {
    matchPassword = await compare(userData.password, user.password);

    if (!matchPassword) {
      throw new AppError("Invalid password", 403);
    }
  }
  const hashedPassword = await hash(userData.password, 10);

  await userRepository.update(id, {
    name: userData.name || user.name,
    email: userData.email || user.email,
    password: hashedPassword || user.password,
    updatedAt: new Date(),
  });

  const updatedUser = await userRepository.findOneBy({ id });

  return updatedUser!;
};

export default updateUserService;
