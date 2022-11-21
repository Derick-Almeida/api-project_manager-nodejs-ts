import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProjectRequest } from "../interfaces/projects";

const createProjectSchema: SchemaOf<IProjectRequest> = yup.object().shape({
  name: yup.string().required().min(3),
  type: yup.string().required().min(5),
  image: yup.string().required(),
  description: yup.string().required().min(10),
  repository: yup.string().required(),
  application: yup.string().required(),
});

export { createProjectSchema };
