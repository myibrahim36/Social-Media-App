import React from 'react';
import {Link} from 'react-router-dom';
import {Storage} from 'aws-amplify'
import { useState, useEffect } from 'react'
import * as ReactRedux from 'react-redux';
import axios from 'axios';





// import RNS3  from 'react-native-aws3';

// const config = {
//         bucketName: 'awschrisbucket',
//         dirName: 'imagesprofiles', /* optional */
//         region: 'US East (Ohio) us-east-2',
//         accessKeyId: 'AKIAYBEL242PAYQW27MS',
//         secretAccessKey: 'DIvrY4u3BXPXCsha3Fr0Iy3V2gN2ehmFzKd7IOF',
//     }
const SignUpForm = (props) => {
    
    useEffect(() => {
        fetchImages('LogoUka.jpg')
      }, [])
//    async function upload(e){
//         console.log(e.target.files[0])
//         const file=e.target.files[0]
//         Storage.put(file.name, file )
//         .then(data =>  {console.log(data)})
//         .catch(err => console.error(err))
//     }

async function fetchImages(imageName) {
    let imageKeys = await Storage.list(imageName)
    imageKeys = await Promise.all(imageKeys.map(async k => {
       
      const key = await Storage.get(k.key)
      console.log("my k :"+key)
      return key
    }))
    setImageUrl(imageKeys)
    console.log('imageKeys: ', imageKeys)
    
  }

   async function upload(e) {
    const file = e.target.files[0];
    const result = await Storage.put(file.name, file, {
      contentType: 'image/'
    })
    setImages(result.key);
    console.log({ result })
    console.log("this is result.key: ", result.key);
    fetchImages()
  }


  function todayIsDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    
      return today
 }


  var passwordHash = require('password-hash');
 const GetPassword = (password)=>{
      // my working password hash
      var hashedPassword = passwordHash.generate(password);
      return hashedPassword;
    }
    

    
 

    const [firstNameState, setFirstNameState] = useState("");
    const [lastNameState, setLastNameState] = useState("");
    const [usernameState, setUsernameState] = useState("");
    const [emailState, setEmailState] = useState("");
    const [phoneState, setPhoneState] = useState("");
    const [myPasswordState, setMyPasswordState] = useState("");
    const [myPasswordStateTemp1, setMyPasswordStateTemp1] = useState("");
    const [images, setImages] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    
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
       /*  console.log("looking inside of GetPassword: ",GetPassword());
        setPasswordState(GetPassword); */
        if ((myPasswordState=== myPasswordStateTemp1)){
          /* setPasswordState(confirmPasswordAState); */
        console.log("looking inside of passwordState: ",myPasswordState);
        const axiosPayLoad = await axios.post('http://localhost:8080/Project2SN/api/user/register', {
            "user_first_name": firstNameState,
            "user_last_name": lastNameState,
            "username": UsernameValidate(usernameState),
            "user_email": emailState,
            "user_phone": phoneState,
            "user_password": GetPassword(myPasswordState),
            "userProfileImage": images,
            "user_registered_date": todayIsDate(),
        });
      
      

        const axiosData = axiosPayLoad.data;

        console.log("axiosdata: ", axiosData);
        alert("New user saved")
        
        if (axiosData.username != null)
            props.onLogin(axiosData);
    }
    else{
      alert("Passwords must match");
    }
  }

    /* const passwordAuth = ()=>{
      (confirmPasswordAState===confirmPasswordBState 
          ? setPasswordState(confirmPasswordAState)
          :alert("Enter the same password"))
    } */

    return (
        <div className="container">
            <form >
            <h2>Create a New Account</h2>
            <label>It’s quick and easy.</label><br/>
            
            <div className='form-control' id='div1'>
            <input type='text' placeholder ='first-name'  value={firstNameState} 
            onChange={(e) => { setFirstNameState(e.target.value); }} />
            <input type='text' placeholder ='last-name'  value={lastNameState} 
            onChange={(e) => { setLastNameState(e.target.value); }}  />
            </div>

            <div className='form-control' id='div2'>
            <input type='text' placeholder ='username' value={usernameState} 
            onChange={(e) => { setUsernameState(e.target.value); }}   />
            <input type='text' placeholder ='email ' value={emailState} 
            onChange={(e) => { setEmailState(e.target.value); }}   />
            </div>
            <div className='form-control' id='div3'>
            <input type='number' placeholder ='phone number' value={phoneState} 
            onChange={(e) => { setPhoneState(e.target.value); }}   />
            <div> 
              {/* {<img src={imageUrl} style={{width: 500, height: 300}}/>} */}

              {/* {<img src={imageUrl} style={{width: 300, height: 150}} />} */}
           {/*  {
          images.map(image => (
            <img
              src={image.key}
              key={image}
              style={{width: 500, height: 300}}
            />
          ))
        } */}
            </div>
            
            </div>
            {/* 
            <div className='form-control' id='div4'>
            <input type='password' placeholder ='password'  value={confirmPasswordAState}
            onChange={(e) => { setConfirmPasswordAState(e.target.value); }}  />
            <input type='password' placeholder ='confirmed password'   value={confirmPasswordBState}
            onChange={(e) => { setConfirmPasswordBState(e.target.value); } }  />
            </div> */}
            <div className='form-control' id='div4'>
            <input type='password' placeholder ='password' value={myPasswordState} 
            onChange={(e) => { setMyPasswordState(e.target.value); }}   />
            <input type='password' placeholder ='password again ' value={myPasswordStateTemp1} 
            onChange={(e) => { setMyPasswordStateTemp1(e.target.value); }}   />
            </div>

            <div className='form-control' id='div5'>
         <input type='file' placeholder ='Upload image' onChange={upload} accept='image' />
            
            </div>

            <div className='form-control' id='div6'>
            <p>
            By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. 
            You may receive SMS Notifications from us and can opt out any time.
            </p>
            
            </div>

            <input type='submit' value='Sign up' className='btn btn-block' onClick={axiosFetcher}/><br/>
			<Link to='/'>Already have an account?</Link>
            </form>
            
        </div>
    )
}

export default SignUpForm; 
/* export default MyCoreFunction; */
