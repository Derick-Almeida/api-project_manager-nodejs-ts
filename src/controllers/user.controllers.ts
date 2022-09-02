import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/user";
import createUserService from "../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";
import getUserService from "../services/users/getUser.service";
import updateUserService from "../services/users/updateUserService";
import deleteUserService from "../services/users/deleteUser.service";

const createUserController = async (req: Request, res: Response) => {
  const { email, name, password }: IUserRequest = req.body;
  const user = await createUserService({ email, name, password });

  return res.status(201).json({ ...user, password: undefined });
};

const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;
  const user = await getUserService(id, userId);

  return res.json(instanceToPlain(user));
};

const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { email, name, password }: IUserRequest = req.body;
  const user = await updateUserService(id, userId, { email, name, password });

  return res.json(instanceToPlain(user));
};

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;
  await deleteUserService(id, userId);

  return res.status(204).send();
};

export { createUserController, getUserController, updateUserController, deleteUserController };
