import { GET_ALL_PROJECT } from "../constants/CyberBug";


const stateDefault = {
  projectList: [],

}
export const ProjectJiraClone = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT: {
      state.projectList = action.data;
      return { ...state };
    }
    default:
      return state;
  }
}