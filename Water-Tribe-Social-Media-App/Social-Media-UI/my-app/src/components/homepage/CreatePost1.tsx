import React from 'react';
import { Dispatch } from "react";
import { ActionType, IAction } from "../../redux/reducer-logic/ActionStructure";
import * as ReactRedux from 'react-redux';
import axios from 'axios';
import { IPost, IUser } from '../../redux/state-logic/StateStructure';
import { useState } from 'react';

import {Storage} from 'aws-amplify'
// import {store } from '../../redux/state-logic/Store';





const CreatePost  = ({createPost} ) => {
 
    // useEffect(() => {
    //     fetchImages()
    //   }, [])

// async function fetchImages() {
//     let imageKeys = await Storage.list('')
//     imageKeys = await Promise.all(imageKeys.map(async k => {
       
//       const key = await Storage.get(k.key)
//       console.log("my k :"+key)
//       return key
//     }))
//     console.log('imageKeys: ', imageKeys)

//     let newFilterArray = imageKeys.filter(
//         (myValue, myIndex, myArray)=>{
//             console.log(imageKeys.length)
//             console.log(myValue)
//             return myValue===   imageKeys[imageKeys.length-1]    
//          }
//         );
//         console.log(newFilterArray);
//   }
  async function upload(e) {
    
   const file = e.target.files[0];
  
   const result = await Storage.put(file.name, file, {
     contentType: 'image/'
   }) 
   console.log('ckeck')
   setPostImageState(result.key);
   console.log(result)
   console.log(postImageState)
 }

     const [postIdState, setPostidState] = useState("");
     
     const [postImageState, setPostImageState] = useState("");
     const [postUserState, setPostUserState] = useState("");
     const [timeCreatedState, setTimeCreatedState] = useState(""); 

    const [postContentState, setPostContentState] = useState("");
   

    return (
        <div className='postcontainer' >
            
            <div className='PostHeader'>
                <h2>Create a Post</h2>
            </div>
            <div className='line'>
            </div>
            <form>
            
                    <br/>
            <textarea id= "postText"className='PostContent' value={postContentState} onChange={(e) => { setPostContentState(e.target.value)}} placeholder="What's on your mind?" ></textarea>
            <br/>


            <label>Add image to your post</label>
            <input type="file" id="fileinput" onChange={upload} accept='image' />
            <input type="text" id="imageName" hidden value={postImageState} />
            <br/>
            <input type='button' value='Add Post' onClick = {createPost} className='btn btn-block'/>
           
            <br/>
            </form>
        </div>
    );
}

export default CreatePost

