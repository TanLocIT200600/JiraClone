const { default: Axios } = require('axios');
const { DOMAIN_JIRACLONE, TOKEN } = require('../utils/constants/settingSystem');



export const jiraCloneServices = {
  signInJiraClone: (userLogin) => {
    return Axios({
      url: `${DOMAIN_JIRACLONE}/Users/signin`,
      method: 'POST',
      data: userLogin,
    })
  },
  getProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_JIRACLONE}/ProjectCategory`,
      method: 'GET'
    })
  },
  CreateProject: (newProject) => {
    return Axios({
      url: `${DOMAIN_JIRACLONE}/Project/createProject`,
      method: 'POST',
      data: newProject
    })
  },
  createProjectAuthorize: (newProject) => {
    console.log(localStorage.getItem(TOKEN));
    return Axios({
      url: `${DOMAIN_JIRACLONE}/Project/createProjectAuthorize`,
      method: 'POST',
      data: newProject,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //JWT 

    })
  },
  getAllProject: () => {
    return Axios({
      url: `${DOMAIN_JIRACLONE}/Project/getAllProject`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
    })
  },
  updateProject: (projectUpdate) => {
    return Axios({
      url: `${DOMAIN_JIRACLONE}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: 'PUT',
      data: projectUpdate,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
    })
  }
}