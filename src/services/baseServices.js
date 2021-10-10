import axios from "axios"
import { DOMAIN_JIRACLONE, TOKEN } from "../utils/constants/settingSystem"

export class baseServices {
  put = (url, model) => {
    return axios({
      url: `${DOMAIN_JIRACLONE}/${url}`,
      method: 'PUT',
      data: model,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //JWT
    })
  }
  post = (url, model) => {
    return axios({
      url: `${DOMAIN_JIRACLONE}/${url}`,
      method: 'POST',
      data: model,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //JWT
    })
  }
  get = (url) => {
    return axios({
      url: `${DOMAIN_JIRACLONE}/${url}`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //JWT
    })
  }
  delete = (url) => {
    return axios({
      url: `${DOMAIN_JIRACLONE}/${url}`,
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //JWT
    })
  }
}