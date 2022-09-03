import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserSendEmail } from "../interfaces/user";

const createEmailSchema: SchemaOf<IUserSendEmail> = yup.object().shape({
  email: yup.string().required().email(),
  subject: yup.string().required(),
  text: yup.string().required(),
});

export { createEmailSchema };
