import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces/user";

const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export { createUserSchema };
