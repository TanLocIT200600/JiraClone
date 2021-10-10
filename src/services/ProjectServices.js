import { baseServices } from "./baseServices";

export class ProjectServices extends baseServices {

  constructor() {
    super();
  }

  deleteServices = (id) => {
    return this.delete(`/Project/deleteProject?projectId=${id}`)
  }
}

export const projectServices = new ProjectServices();