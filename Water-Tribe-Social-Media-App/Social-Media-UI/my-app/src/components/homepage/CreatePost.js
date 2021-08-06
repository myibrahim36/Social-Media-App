import React from 'react';
import { Dispatch } from "react";
import { ActionType, IAction } from "../../redux/reducer-logic/ActionStructure";
import * as ReactRedux from 'react-redux';
import axios from 'axios';
import { IPost, IUser } from '../../redux/state-logic/StateStructure';
import {store } from '../../redux/state-logic/Store';
import { useState } from 'react';
import { useEffect } from 'react';
import {Storage} from 'aws-amplify'



const mapStateToProps = (state: any) => {
    //logic goes here
    //said logic will extract the NECESSARY state you need, to simplify the component
    return {
        stateUser: state.myStateReducer.currentUser,
        statePost: state.myStateReducer.postList,
        
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    //let's extract only the functionality we need to use
    return {
        getPost: (incomingPayload: any) => { dispatch({ type: ActionType.MYPOST, payload: incomingPayload }) },
        
    }
}


interface IProps {
    stateUser: IUser,
    statePost: IPost[],
    getPost: any
   
   
}




const CreatePost  = () => {
    const state = store.getState();
    useEffect(() => {
        fetchImages()
      }, [])

async function fetchImages() {
    let imageKeys = await Storage.list('')
    imageKeys = await Promise.all(imageKeys.map(async k => {
       
      const key = await Storage.get(k.key)
      console.log("my k :"+key)
      return key
    }))
    console.log('imageKeys: ', imageKeys)

    let newFilterArray = imageKeys.filter(
        (myValue, myIndex, myArray)=>{
            console.log(imageKeys.length)
            console.log(myValue)
            return myValue===   imageKeys[imageKeys.length-1]    
         }
        );
        console.log(newFilterArray);
  }

   async function upload(e) {
    const file = e.target.files[0];
    const result = await Storage.put(file.name, file, {
      contentType: 'image/'
    })
    setPostImageState(result.key);
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

     const [postIdState, setPostidState] = useState("");
     const [postContentState, setPostContentState] = useState("");
     const [postImageState, setPostImageState] = useState("");
     const [postUserState, setPostUserState] = useState("");
     const [timeCreatedState, setTimeCreatedState] = useState(""); 

    let axiosFetcher = async (e) => {
        e.preventDefault();
        console.log(state.currentUser)
        const axiosPayLoad: any = await axios.post('http://localhost:8080/Project2SN/api/post/createPost',
        {
                "postUser": //props.stateUser,
                {
                    "user_id": 1,
                    "user_first_name": "conor",
                    "user_last_name": "kent",
                    "username": "cfkent",
                    "user_password": "pass",
                    "user_email": "kent@gmail.com",
                    "user_phone": null,
                    "user_registered_date": null,
                    "userProfileImage": null
                },
                "postContent": postContentState,
                "timeCreated": todayIsDate(),
                "postImage": postImageState
                
            
        });

        const axiosData: any = axiosPayLoad.data;

        console.log("axiosdata: ", axiosData);
        console.log("post user state", {postUserState});

        // setPokemonData({"name": axiosData.name, "image": axiosData.sprites.front_default});
        // if (axiosData.length !== 0)
        //     props.onLogin(axiosData);
    }
   const testcode=()=>{
       console.log('dllddkd')
   }
                
    return (
        <div className='postcontainer' >
            
            <div className='PostHeader'>
                <h2>Create a Post</h2>
            </div>
            <div className='line'>
            </div>
            <form>
            <div className='userInfo'>
                <div className='imgprofile'>
                    </div>
                    <h4>{/*props.stateUser.user_username*/}</h4>
                    </div>
                    <br/>
            <textarea className='PostContent' value={postContentState} onChange={(e) => { setPostContentState(e.target.value)}} placeholder="What's on your mind?" ></textarea>
            <br/>


            <label>Add image to your post</label>
            <input type="file" id="fileinput" onChange={upload} accept='image'/>
            <br/>
            <input type='submit' value='Agdd Post' onClick = {axiosFetcher} className='btn btn-block'/>
            <input type='submit' value='fghj' onClick = {testcode} className='btn btn-block'/>
            <br/>
            </form>
        </div>
    );
}

export default CreatePost
ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CreatePost)
