import { IUserLogin, IUserRequest } from "../../interfaces/user";

const mockedUser: IUserRequest = {
  name: "jorge",
  email: "jorge@email.com",
  password: "123456",
};

const mockedUserToBeDeleted: IUserRequest = {
  name: "adagoberto",
  email: "adagoberto@email.com",
  password: "123456",
};

const mockedUserLogin: IUserLogin = {
  email: "jorge@email.com",
  password: "123456",
};

const mockedInvalidUserLogin: IUserLogin = {
  email: "jorgin@email.com",
  password: "123456",
};

const mockedUpdatedUserLogin: IUserLogin = {
  email: "ronaldo@email.com",
  password: "123456",
};

const mockedUserLoginToBeDeleted: IUserLogin = {
  email: "adagoberto@email.com",
  password: "123456",
};

const mockedUpdatedUser: IUserRequest = {
  name: "ronaldo",
  email: "ronaldo@email.com",
  password: "123456",
};

const mockedUpdatedUserToBeDeleted: IUserRequest = {
  name: "sebastião",
  email: "sebastiao@email.com",
  password: "123456",
};

export {
  mockedUser,
  mockedUserToBeDeleted,
  mockedUserLogin,
  mockedInvalidUserLogin,
  mockedUpdatedUserLogin,
  mockedUserLoginToBeDeleted,
  mockedUpdatedUser,
  mockedUpdatedUserToBeDeleted,
};
