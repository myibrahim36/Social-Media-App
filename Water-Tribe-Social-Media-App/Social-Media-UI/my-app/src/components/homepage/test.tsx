import React from 'react';
import { Dispatch } from "react";
import { ActionType, IAction } from "../../redux/reducer-logic/ActionStructure";
import * as ReactRedux from 'react-redux';
import axios from 'axios';
import {Storage} from 'aws-amplify'
import { IPost, IUser } from '../../redux/state-logic/StateStructure';
import { useState} from 'react'
import AddPost from './AddPost'
import ViewPost from './ViewPost'


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


//THIS is our ACTUAL component
//this is also the callback function that will be given to the "Redux.connect" function below
const CoreTest: React.FunctionComponent<IProps> = (props: IProps) => {

    const [imageUrl, setImageUrl] = useState("");

   //log out function
   const logout=()=>{
       console.log("logout please")
       window.location.reload(false);

   }
   
   // fetcher image

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


    //THIS is my async await function, it has nothing to do with React
    

    let axiosFetcher = async () => {

        const axiosPayLoad: any = await axios.get('http://localhost:8080/Project2SN/api/post//allPosts');

        const axiosData: any = axiosPayLoad.data;

        console.log("axiosdata: ", axiosData);

        // setPokemonData({"name": axiosData.name, "image": axiosData.sprites.front_default});
        if (axiosData.length !== 0)
            props.getPost(axiosData);
    }

    ////////conditional rendering
    let myList: JSX.Element;
    if (props.statePost) {
        myList = (

            <div>
                {props.statePost.map((myPost) => {
                    // console.log(myPost.postUser.userProfileImage)
                    // fetchImages('LogoUka.jpg')
                    return (
                    <div className='ViewPost' key={myPost.postId}>
                        <div className='userInfo'><div className='imgprofile'>
                            
                            
                            
                            {/* {<img src={imageUrl} style={{width: 300, height: 150}} />} */}
                            {/* {myPost.postUser.userProfileimage} */}
                        </div>
                            <h4>{myPost.postUser.user_first_name}   {myPost.postUser.user_last_name}</h4></div>
                        <div className='PostContent'><p>{myPost.postContent}</p></div>
                        <div >{myPost.postImage}</div>
                        <div ></div>
                        <div className='PostAction'><input type='button' className='like' value='Like'/> <input type='button' className='comment' value='Comment'/></div>
                        <div><div className=''></div><input type='text' className='commentPost'/> </div>
                    </div>
                    
                    
                    );
                })}
           </div> 
    );
    }
    else {
        myList = (<h1>No Post Available</h1>);
    }

    console.log(props.statePost);
    if (!props.statePost)
        axiosFetcher();


    return (
        <>
<div>
    <div className='navbar'>
        <div></div>
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                </div>
            </nav>
        </div>
        <div className='userInfo'><div className='imgprofile'>
        {/* {<img src={imageUrl} style={{width: 300, height: 150}} />} */}
        </div>
            <h4>{props.stateUser.user_first_name}    {props.stateUser.user_last_name}</h4></div>
        <div > 
        {/* <Link to='/'>LogOut</Link> */}
            <input type='button'  onClick={logout} className='logout' value='Log-out' /> 
        </div>
    </div>
        <div className='main'> 
             
            <div className='leftcol'>
            <div className='userInfo'><div className='imgprofile'>
                
                {/* {<img src={imageUrl} style={{width: 300, height: 150}} />} */}
                
                </div>
            <h4>{props.stateUser.user_first_name}    {props.stateUser.user_last_name}</h4></div>
           <a href='./'>Add user profile image</a><br/>
           <a href='./'>Update user info</a><br/>
           <a href='./'> search a person</a><br/>
            {/* {reimbs.map((reimb)=>(
                 
                 <Reimbrequested Key={reimb.reimId} reimb={reimb}/>
            )
            )
            
            } */}
            
            </div>

            <div className='middlecol'>
                <AddPost/>
                {myList}

            
            </div> 
            <div className='rightcol'>htetruyiuohfzdfsrdy kjh </div>
        </div>
        </div>



        </>
    );
}


/*
  THIS the redux wrapper for our component
*/

export const Test = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CoreTest);

export default CoreTest;