import { USER_SIGNIN_API } from "../constants/CyberBug"


export const actionJiraCLoneSignIn = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    }
  }
}