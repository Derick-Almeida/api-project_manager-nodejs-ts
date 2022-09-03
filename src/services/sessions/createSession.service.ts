import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { User } from "../../entities/users.entity";
import { IUserLogin } from "../../interfaces/user";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createSessionService = async ({ email, password }: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new AppError("Email or password invalid");
  }

  const matchPassword = await compare(password, user.password);

  if (!matchPassword) {
    throw new AppError("Email or password invalid");
  }

  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "1d",
      subject: user.id,
    }
  );

  return token;
};

export default createSessionService;
