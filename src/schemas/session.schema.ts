import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin } from "../interfaces/user";

const createSessionSchema: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export { createSessionSchema };
