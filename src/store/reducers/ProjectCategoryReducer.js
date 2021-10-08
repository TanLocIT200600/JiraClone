import { GET_ALL_PROJECT_CATEGORY } from "../constants/CyberBug";


const stateDefault = {
  arrProject: [],
}

export const ProjectCategory = (state = stateDefault, action) => {
  switch (action.type) {

    case GET_ALL_PROJECT_CATEGORY: {
      state.arrProject = action.data;
      return { ...state };
    }

    default:
      return state;
  }
}