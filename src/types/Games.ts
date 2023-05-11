declare module "Games" {
  export type Games = {
    appid: number;
    name: string;
    categories: {
      id: number;
      description: string;
    }[];
  }[];
}
