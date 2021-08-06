import React from 'react';
import {Link} from 'react-router-dom';
import {Storage} from 'aws-amplify'
import { useState, useEffect } from 'react'
import * as ReactRedux from 'react-redux';
import axios from 'axios';
import { IPost, IUser } from '../../redux/state-logic/StateStructure';
import { ActionType, IAction } from "../../redux/reducer-logic/ActionStructure";
import { Dispatch } from "react";
import { SyntheticEvent } from 'react';




// const mapStateToProps = (state = any) => {
//   //logic goes here
//   //said logic will extract the NECESSARY state you need, to simplify the component
//   return {
//       stateUser: state.myStateReducer.currentUser,
//       statePost: state.myStateReducer.postList
//   }
// }

// const mapDispatchToProps = (dispatch = Dispatch<IAction>) => {
//   //let's extract only the functionality we need to use
//   return {
//       getPost: (incomingPayload = any) => { dispatch({ type: ActionType.MYPOST, payload: incomingPayload }) },
//   }
// }

const UpdateUser = ({updateInfo}) => { {
    // const [images, setImages] = useState([])
    useEffect(() => {
        // fetchImages()
      // axiosFetchUser()
      }, [])




const [userIdState, setIdState] = useState(updateInfo.user_id);
const [firstNameState, setFirstNameState] = useState(updateInfo.user_first_name);
const [lastNameState, setLastNameState] = useState(updateInfo.user_last_name);
const [usernameState, setUsernameState] = useState(updateInfo.username);
const [emailState, setEmailState] = useState(updateInfo.user_email);
const [phoneState, setPhoneState] = useState(updateInfo.user_phone);
const [myPasswordState, setMyPasswordState] = useState(updateInfo.user_password);
const [myPasswordStateTemp1, setMyPasswordStateTemp1] = useState(updateInfo.user_password);
const [images, setImages] = useState(updateInfo.userProfileImage);
const [registerState, setRegisterState] = useState(updateInfo.user_registered_date)


async function upload(e) {
    const file = e.target.files[0];
    const result = await Storage.put(file.name, file, {
      contentType: 'image/'
    })
    setImages(result.key);
    //console.log({ result })
    //console.log("this is result.key: ", result.key);
    //fetchImages()
  }


const UsernameValidate = (username)=>{
  if((username === null) || (username === "")){
    alert("please enter a username");
  }
  else{
    return username;
  }
};

let axiosFetcher = async (e) => {

    e.preventDefault();
   
    const axiosPayLoad = await axios.post('http://localhost:8080/Project2SN/api/user/getUserId', {
        "user_id": userIdState
    });

    const axiosData = axiosPayLoad.data;

    console.log("axiosdata: ", axiosData);

    
    if (axiosData.username != null)
    {
      let userInfoUpdate = async () => {
        const axiosPayLoad1 : any = await axios.put('http://localhost:8080/Project2SN/api/user/editUser',{
            "userProfileImage": images,
            "user_email": emailState,
            "user_first_name": firstNameState,
            "user_id": userIdState,
            "user_last_name": lastNameState,
            "user_password": myPasswordState,
            "user_phone": phoneState,
            "user_registered_date": registerState,
            "username": UsernameValidate(usernameState)
            
        } );
       
        const axiosData1: any = await axiosPayLoad1.data;

        console.log(axiosData1)
    }
    userInfoUpdate()
    }
}

return (
    <div className="container">
        <form >
        <h2>Update Your Account</h2>
        <label>It’s quick and easy.</label><br/>
        
        <div className='form-control' id='div1'>
        <span class="field">First Name</span><br></br>
        <input type='text'  placeholder= {updateInfo.user_first_name} 
        onChange={(e) => { setFirstNameState(e.target.value); }} /><br></br>

        <span class="field">Last Name</span><br></br>
        <input type='text' placeholder ='last-name'  placeholder={updateInfo.user_last_name} 
        onChange={(e) => { setLastNameState(e.target.value); }}  />
        </div>

        <div className='form-control' id='div2'>
        <span class="field">Username</span><br></br>
        <input type='text' placeholder ='username' placeholder={updateInfo.username} 
        onChange={(e) => { setUsernameState(e.target.value); }}   />
        <span class="field">Email</span><br></br>
        <input type='text' placeholder ='email ' placeholder={updateInfo.user_email} 
        onChange={(e) => { setEmailState(e.target.value); }}   />
        </div>
        <div className='form-control' id='div3'>
        <span class="field">Phone Number</span><br></br>
        <input type='number' placeholder ='phone number' placeholder={updateInfo.user_phone} 
        onChange={(e) => { setPhoneState(e.target.value); }}   />
        <br></br>
        
        </div>

        <div className='form-control' id='div5'>
     <input type='file' placeholder ='Upload image' placeholder={updateInfo.userProfileImage}  onChange={upload} accept='image' />
        
        </div>

        <div className='form-control' id='div6'>
        
        </div>

        <input type='submit' value='Update Account' className='btn btn-block' onClick={updateInfo, axiosFetcher} /><br/>
        </form>
        
    </div>
)
}

}
export default UpdateUser
