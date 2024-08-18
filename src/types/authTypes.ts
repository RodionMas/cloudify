export interface UserTypeState {
  userRegister: userRegister;
  loading: string;
  err: string | unknown | null;
  isAuth: boolean;
  username: string;
  logout: boolean,
}

export interface Username {
  username: string | undefined;
}
export interface userRegister extends Username {
  password: string | undefined;
}
export interface UserRespone extends Username {
  message?: string;
}

export interface GetMeType {
  authenticated: boolean;
  username: string;
}
