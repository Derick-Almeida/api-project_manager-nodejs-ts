import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProjectRequest } from "../interfaces/projects";

const validUrl =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const createProjectSchema: SchemaOf<IProjectRequest> = yup.object().shape({
  name: yup.string().required().min(3),
  type: yup.string().required().min(5),
  image: yup.string().required().matches(validUrl, "URL is not valid image"),
  description: yup.string().required().min(10),
  repository: yup.string().required().matches(validUrl, "URL is not valid repository"),
  application: yup.string().required().matches(validUrl, "URL is not valid application"),
});

export { createProjectSchema };
