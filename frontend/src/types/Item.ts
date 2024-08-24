export type ItemDetails = {
  name?: string;
  id?: string;
};

export namespace Item {
  export type Entity = {
    id?: string;
    name?: string;
    note?: string;
    image_url?: string;
    categoryName?: string;
  };

  export type Add = {
    name?: string;
    note?: string;
    categoryName?: string;
    image_url?: string;
  };

  export type LoginResponse = {
    username?: string;
    token?: string;
  };
}
