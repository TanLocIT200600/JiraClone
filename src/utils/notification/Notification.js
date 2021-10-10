import { notification } from "antd"

export const notifiFunction = (type, message, description = '') => { // action.typeNotification = success || error || warning
  notification[type]({
    message: message,
    description: description
  })
}