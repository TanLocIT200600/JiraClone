import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { jiraCloneServices } from "../../services/JiraCloneServices";
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from "../constants/CyberBug";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/loadingConstant";

function* getAllProjectSaga(action) {
  console.log('datasaga', action);
  yield put({
    type: DISPLAY_LOADING
  })

  yield delay(500);
  // gọi api
  try {
    // call api get data
    const { data, status } = yield call(() => jiraCloneServices.getAllProject());

    if (data.statusCode === 200) {
      // call api success, dispatch => reducer thong qua put
      yield put({
        type: GET_ALL_PROJECT,
        data: data.content,
      })
      console.log('data', data);
    }

  } catch (err) {
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING,
  })


}


export function* theoDoiAllProject() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}