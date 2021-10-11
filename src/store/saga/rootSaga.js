import { all } from "redux-saga/effects";
import * as JiraClone from '../saga/UserSaga'
import * as ProjectCategory from '../saga/ProjectCategorySaga'
import * as CreateProject from '../saga/CreateProjectSaga'
import * as GetAllProject from '../saga/getAllProjectSaga'

export function* rootSaga() {
  yield all([
    //nghiệp vu theo dõi các action saga 
    JiraClone.theoDoiSignIn(),
    ProjectCategory.theoDoiAllProjectCategory(),
    CreateProject.theoDoiCreateProjectSaga(),
    GetAllProject.theoDoiAllProject(),
    CreateProject.theoDoiUpdateProjectSaga(),
    CreateProject.theoDoiDeleteProjectSaga(),
    JiraClone.theoDoiGetUser(),
  ]);
}