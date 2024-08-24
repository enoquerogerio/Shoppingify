export namespace User {
  export type Entity = {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
  };

  export type Add = {
    username?: string;
    email?: string;
    password?: string;
  };

  export type Login = {
    email?: string;
    password?: string;
  };

  export type LoginResponse = {
    username?: string;
    token?: string;
  };
}
