import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { jiraCloneServices } from "../../services/JiraCloneServices";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../constants/CyberBug";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/loadingConstant";

function* getAllProjectCategorySaga(action) {
  console.log('actionsaga', action);
  yield put({
    type: DISPLAY_LOADING
  })

  yield delay(500);
  // gọi api
  try {
    // call api get data
    const { data, status } = yield call(() => jiraCloneServices.getProjectCategory());

    if (data.statusCode === 200) {
      // call api success, dispatch => reducer thong qua put
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
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


export function* theoDoiAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga)
}