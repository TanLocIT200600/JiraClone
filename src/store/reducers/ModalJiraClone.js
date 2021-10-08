
const stateDefault = {
  visible: false,
  ComponentContentDrawer: <p>Default content</p>,
  callBackSubmit: () => { alert('submit change') },
}

export const ModalJiraCloneReducer = (state = stateDefault, action) => {
  switch (action.type) {

    case 'OPEN_DRAWER_MODAL': {
      state.visible = true;
      return { ...state };
    }

    case 'CLOSE_DRAWER_MODAL': {
      state.visible = false;
      return { ...state };
    }

    case 'OPEN_FORM_EDIT_PROJECT': {
      state.visible = true;
      state.ComponentContentDrawer = action.Component;
      return { ...state };
    }

    case 'SET_SUBMIT_PROJECT': {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }

    default:
      return state;
  }
}