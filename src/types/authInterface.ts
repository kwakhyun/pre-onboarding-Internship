interface IResponse {
  status: number;
  data: {
    message: string;
    access_token: string;
  };
}

export interface IAuthApiProps {
  signup: (email: string, password: string) => Promise<IResponse>;
  signin: (email: string, password: string) => Promise<IResponse>;
}
