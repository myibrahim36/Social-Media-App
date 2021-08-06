import React from 'react';
//import './App.css';
import './index.css';
import { LoginComponent } from './components/loginpage/loginpage';
import { IAction } from './redux/reducer-logic/ActionStructure';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Dispatch } from "react";
// import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { IUser } from './redux/state-logic/StateStructure';

import { HomeComponent } from './components/homepage/homepage';
import SignUpForm from './components/loginpage/SignUpForm';
import ResetPasswordA from './components/loginpage/ResetPasswordA';
import CoreTest from './components/homepage/test'

const mapStateToProps = (state: any) => {
  //logic goes here
  //said logic will extract the NECESSARY state you need, to simplify the component

  return {
    seekUser: state.myStateReducer.currentUser
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  //let's extract only the functionality we need to use
  return {
  }
}


interface IProps {
  seekUser?: IUser|null
}


//THIS is our ACTUAL component
//this is also the callback function that will be given to the "Redux.connect" function below
function CoreApp(props: IProps) {


  return (
    <>
             <Router>
    <div >
      {/* <UserInfo user={users}/> */}
      <Route path="/" exact  render={()=>(
      <>
     {props.seekUser ? <HomeComponent/>:<LoginComponent/>}
      </>
      )}/>
      <Route path='/SignUpForm' component={SignUpForm}/>
      <Route path='/ResetPassword' component={ResetPasswordA}/>
      
     
    </div>
  </Router>
            
          {/* {props.seekUser ? <HomeComponent/>:<LoginComponent/>} */}
    </>
  );
}

/*
  THIS the redux wrapper for our component
*/
export const App = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CoreApp);


export default App;
