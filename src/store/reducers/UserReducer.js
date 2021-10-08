import { USER_LOGIN } from "../../utils/constants/settingSystem"
import { US_LOGIN } from "../constants/CyberBug";

let user = {}
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user,
}

export const UserLoginReducer = ( state = stateDefault, action) =>{
    switch(action.type){
        case US_LOGIN:{
            state.userLogin = action.userLogin;
            return {...state};
        }
        default:
            return state;
    }
}
