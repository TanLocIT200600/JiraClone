import React from "react";
import { Route } from "react-router-dom";
import ContentMain from "../../components/JiraClone/Main/ContentMain";
import HeaderMain from "../../components/JiraClone/Main/HeaderMain";
import InfoMain from "../../components/JiraClone/Main/InfoMain";
import MenuJiraClone from "../../components/JiraClone/MenuJiraClone";
import SidebarJiraclone from "../../components/JiraClone/SidebarJiraclone";
import '../../index.css'
import ModalJiraClone from '../../components/JiraClone/ModalJiraClone/ModalJiraClone'

export default function HomeTemplate(props) {
  const { Component, ...restParam } = props;
  return <Route {...restParam} render={(propsRoute) => {
      return (
        <>
          <div className="jira">
            <SidebarJiraclone/>
            <MenuJiraClone/>
            
            <Component {...propsRoute} />
          </div>
        </>  
      );
    }}
    ></Route>
}
