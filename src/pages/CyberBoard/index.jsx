import React from 'react'
import ContentMain from '../../components/JiraClone/Main/ContentMain'
import HeaderMain from '../../components/JiraClone/Main/HeaderMain'
import InfoMain from '../../components/JiraClone/Main/InfoMain'
import ModalJiraClone from '../../components/JiraClone/ModalJiraClone/ModalJiraClone'



export default function CyberBoard() {
    return (
        <div>
            <div className="main">
              <HeaderMain/>
              <h3>Cyber boards</h3>
              <InfoMain/>
              <ContentMain/>
            </div>
            <ModalJiraClone/>
        </div>
    )
}
