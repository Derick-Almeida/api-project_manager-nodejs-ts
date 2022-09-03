import { Request, Response } from "express";
import { IUserSendEmail } from "../interfaces/user";
import sendEmailService from "../services/emails/sendEmail.service";

const sendEmailController = async (req: Request, res: Response) => {
  const { email, subject, text }: IUserSendEmail = req.body;
  await sendEmailService({ email, subject, text });

  return res.status(201).json({
    status: "success",
    message: "Email sended with success!",
  });
};

export { sendEmailController };
