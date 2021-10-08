import { createStore, combineReducers, applyMiddleware } from "redux";

import createMiddleWare from "redux-saga";
import { rootSaga } from "./saga/rootSaga";
import { LoadingReducer } from "./reducers/loadingReducer";
import reduxThunk from "redux-thunk";
import { HistoryReducer } from './reducers/HistoryReducer'
import { UserLoginReducer } from "./reducers/UserReducer";
import { ProjectCategory } from "./reducers/ProjectCategoryReducer";
import { ProjectJiraClone } from "./reducers/ProjectJiraClone";
import { ModalJiraCloneReducer } from "./reducers/ModalJiraClone";
import { ProjectEditReducer } from "./reducers/ProjectReducer";

const middleWareSaga = createMiddleWare();

const rootReducer = combineReducers({
  LoadingReducer,
  HistoryReducer,
  UserLoginReducer,
  ProjectCategory,
  ProjectJiraClone,
  ModalJiraCloneReducer,
  ProjectEditReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;
