//this enum defines what types of actions can be taken b the reducer
export enum ActionType{
    LOGIN = "loginAction",
    MYPOST = "viewPost",
    LOGOUT="logOutAction"
}

//this interface defines the structure of the actions given to the reducer
export interface IAction{
    type: ActionType,
    payload: any
  }
  