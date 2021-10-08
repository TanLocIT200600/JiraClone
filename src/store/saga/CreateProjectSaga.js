import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { jiraCloneServices } from "../../services/JiraCloneServices";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../constants/CyberBug";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/loadingConstant";
import { history } from "../../utils/history.js"

function* createProjectSaga(action) {
  console.log('lol', action);
  //hien thi loading
  yield put({
    type: DISPLAY_LOADING
  });

  yield delay(500);

  try {
    // call api get data
    const { data, status } = yield call(() => jiraCloneServices.createProjectAuthorize(action.newProject));

    if (data.statusCode === 200) {
      // call api success, dispatch => reducer thong qua put
      // console.log(data);
      history.push('/projectManagement')
    }

  } catch (err) {
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING
  });

}


export function* theoDoiCreateProjectSaga() {
  yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga)
}


//update project 
function* updateProjectSaga(action) {
  // console.log('LA', action);
  // return;
  //hien thi loading
  yield put({
    type: DISPLAY_LOADING
  });

  yield delay(500);

  try {
    // call api get data
    const { data, status } = yield call(() => jiraCloneServices.updateProject(action.projectUpdate));

    if (data.statusCode === 200) {
      // call api success, dispatch => reducer thong qua put
      // console.log(data);
      // history.push('/projectManagement')
    }
    yield put({
      type: 'GET_ALL_PROJECT_SAGA'
    })
    yield put({
      type: "CLOSE_DRAWER_MODAL"
    })

  } catch (err) {
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING
  });

}


export function* theoDoiUpdateProjectSaga() {
  yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga)
}