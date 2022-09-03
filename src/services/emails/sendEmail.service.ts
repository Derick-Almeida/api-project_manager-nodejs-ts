import { IUserSendEmail } from "../../interfaces/user";
import AppError from "../../errors/AppError";
import "dotenv/config";

const sendEmailService = async ({ email, subject, text }: IUserSendEmail) => {};

export default sendEmailService;
