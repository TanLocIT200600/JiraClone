import "./App.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { UserLoginTemplate } from "./templates/UserLoginTemplate";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomeTemplate from "./templates/HomeTemplate";
import CreateProject from "./pages/CreateProject";
import CyberBoard from "./pages/CyberBoard";
import LoadingComponent from "./components/globalSetting/loadingComponents/loadingComponent";
import ProjectManagement from "./pages/ProjectManagement";
import ModalJiraCloneHOC from "./HOC/JiraCloneHOC/ModalJiraCloneHOC";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'ADD_HISTORY', history: history })
  }, [dispatch]);
  return (
    <div>
      <ModalJiraCloneHOC />
      <LoadingComponent />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/createProject" exact Component={CreateProject} />
        <HomeTemplate path="/cyberBoard" exact Component={CyberBoard} />
        <HomeTemplate path="/projectManagement" exact Component={ProjectManagement} />
        <UserLoginTemplate exact path="/login" Component={Login} />
      </Switch>
    </div>
  );
}

export default App;
