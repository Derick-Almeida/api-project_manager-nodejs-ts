interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

export { IUserRequest, IUserLogin };
