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
  email: string;
  subject: string;
  text: string;
}

export { IUserRequest, IUserLogin, IUserSendEmail };
