import axios from 'axios';
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { jiraCloneServices } from '../../services/JiraCloneServices';
import { TOKEN, USER_LOGIN } from '../../utils/constants/settingSystem';
import { USER_SIGNIN_API, US_LOGIN } from '../constants/CyberBug';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/loadingConstant';
import { history } from '../../utils/history'
import { userServices } from '../../services/useServices';

//quản lý action saga
function* signInSaga(action) {
  // console.log(action);

  yield put({
    type: DISPLAY_LOADING
  })

  yield delay(500);
  // gọi api
  try {
    const { data, status } = yield call(() => jiraCloneServices.signInJiraClone(action.userLogin));
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    yield put({
      type: US_LOGIN,
      userLogin: data.content,
    })

    // let history = yield select(state => state.HistoryReducer.history);
    history.push('/home');

  }
  catch (errors) {
    console.log(errors.respond.data);
  }

  yield put({
    type: HIDE_LOADING,
  })

}

export function* theoDoiSignIn() {
  yield takeLatest(USER_SIGNIN_API, signInSaga)
}


function* getUserSaga(action) {
  // action.keyword
  try {
    const { data, status } = yield call(() => userServices.getUser(action.keyword));
    console.log("data", data);

  }
  catch (errors) {
    console.log(errors.respond.data);
  }
}
export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}