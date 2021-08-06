import React, { useState, SyntheticEvent } from 'react';
import { Dispatch } from "react";
import { ActionType, IAction } from "../../redux/reducer-logic/ActionStructure";
// import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import axios from 'axios';

import SignUpLink from './SignUpLink'
import img1 from '../../images/img1.png'
import img2 from '../../images/img2.jpg'



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
        onLogin: (incomingPayload: any) => { dispatch({ type: ActionType.LOGIN, payload: incomingPayload }) },
    }
}


interface IProps {
    onLogin: any
}

//THIS is our ACTUAL component
//this is also the callback function that will be given to the "Redux.connect" function below
const CoreLoginComponent: React.FunctionComponent<IProps> = (props: IProps) => {

    const [usernameState, setUsernameState] = useState("");
    const [passwordState, setPasswordState] = useState("");

    let axiosFetcher = async (eve: SyntheticEvent) => {

        eve.preventDefault();

        var passwordHash = require('password-hash');
        // var hashedPassword = passwordHash.generate("password");
        // console.log("password")
        // console.log(hashedPassword);

        const axiosPayLoad: any = await axios.post('http://localhost:8080/Project2SN/api/user/login', {
            "username": usernameState,
            "user_password": passwordState
        });

        const axiosData: any = axiosPayLoad.data;

        console.log("axiosdata: ", axiosData);

        if(axiosData!=null){

            //var passwordHash = require('./lib/password-hash');

            var hashedPassword = passwordState;
    
            console.log(passwordHash.verify(hashedPassword, axiosData.user_password));

            if (passwordHash.verify(hashedPassword, axiosData.user_password)){
                props.onLogin(axiosData);
            }
            else
            alert("Wrong password")
        }
        else
            alert("Wrong username")
       // if (axiosData.username != null)
            //props.onLogin(axiosData);
    }

    return (
        <>
        <div className="container-main">
        <div className="container-login">
            <div className="img2"><img src={img2} alt=""/></div>
        <form className='add-form' >
        <div className='form-control'>
            <label>Username</label>
            <input type='text' placeholder ='username' value={usernameState} 
            onChange={(eve) => { setUsernameState(eve.target.value); }}/>
        </div>
        <div className='form-control' >
            <label>Password</label>
            <input type='password' placeholder ='password' value={passwordState}
            onChange={(eve) => { setPasswordState(eve.target.value); }}/>
        </div>
        
        <input type='submit' value='Login' className='btn btn-block' onClick={axiosFetcher}/>
        
    </form>
    <SignUpLink />
    </div>
    <div className="container-login"><img src={img1} alt="social network is so nice" id="imgs"/></div>
    </div>

        </>
    );
}

/*
  THIS the redux wrapper for our component
*/
export const LoginComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CoreLoginComponent);

