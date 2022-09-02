import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { User } from "../../entities/users.entity";
import { IUserRequest } from "../../interfaces/user";
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

  return user;
};

export default createUserService;
