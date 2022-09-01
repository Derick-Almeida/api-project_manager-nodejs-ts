interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IUserSendEmail {
  name: string;
  email: string;
  subject: string;
}

export { IUserRequest, IUserLogin, IUserSendEmail };
