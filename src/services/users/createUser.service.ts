import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/user";
import { User } from "../../entities/users.entity";
import { hash } from "bcryptjs";

const createUserService = async ({ email, name, password }: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const emailAlreadyExists = await userRepository.findOneBy({ email });

  if (emailAlreadyExists) {
    throw new AppError("Email already exists");
  }

  const hashedPasword = await hash(password, 10);

  const user = await userRepository.save({
    name,
    email,
    password: hashedPasword,
  });

  const createdUser = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: {
      projects: true,
    },
  });

  return createdUser!;
};

export default createUserService;
