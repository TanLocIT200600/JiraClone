import { baseServices } from "./baseServices";

export class UserServices extends baseServices {

  constructor() {
    super();
  }

  getUser = (keyWord) => {
    return this.get(`/Users/getUser?keyword=${keyWord}`)
  }
}

export const userServices = new UserServices();