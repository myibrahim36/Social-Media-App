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
import {Link} from 'react-router-dom'
import CreatePost from './CreatePost1'
import { useEffect } from 'react';
import UpdateUser from './UpdateUser';
import ContactList from './ContactList';
// import Publish from '../../images/Publish.webp'
import img1 from '../../images/img1.png'
import watertribe_logo from '../../images/watertribe_logo.jpg'


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
const CoreHomeComponent: React.FunctionComponent<IProps> = (props: IProps) => {

    useEffect(() => {
        fetchImages(props.stateUser.userProfileImage)
        axiosFetcher()
        getAllUsers()
      }, [])

    const [imageUrl, setImageUrl] = useState(img1);
    const [imageUrl1, setImageUrl1] = useState(img1);
    const [postForm, setPostForm] = useState(false)
    const [postImageState, setPostImageState] = useState("");
    const [updateForm, setUpdateForm] = useState(false)
    const[listUsers, setListUsers]=useState([])
	const [searchState, setSearchState] = useState('');
    const [findUserState, setFindUserState] = useState([]);
    const [firstNameState, setfirstNameState] = useState("");


// get all users
let getAllUsers = async () => {

    const axiosPayLoad: any = await axios.get('http://localhost:8080/Project2SN/api/user/allUsers');

    const axiosData: any = axiosPayLoad.data;

    console.log("axiosdata: ", axiosData);

    // setPokemonData({"name": axiosData.name, "image": axiosData.sprites.front_default});
    if (axiosData!=null)
    setListUsers(axiosData)
        
}

let myUserList: JSX.Element;

if (listUsers.length>0) {
    console.log(listUsers)
    myUserList = (

        <div>
            {listUsers.map((User) => {
                return (
                    <ContactList user={User}/>

                );
            })}
       </div> 
);
}
else {
    myUserList = (<h1>No Post Available</h1>);
}


// create post function
function createPost(eve:any){
    eve.preventDefault()
    axiosFetcherPost()
    setPostForm(false);

}
function todayIsDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    
      return today
 }




let axiosFetcherPost = async () => {
    
  
    const axiosPayLoad: any = await axios.post('http://localhost:8080/Project2SN/api/post/createPost',
    {
            "postUser": props.stateUser,
            "postContent": document.getElementById("postText").value,
            "timeCreated": todayIsDate(),
            "postImage": document.getElementById("imageName").value 
            
        
    });

    const axiosData: any = axiosPayLoad.data;

    if (axiosData!=null){
        alert('saved')
    }


    // setPokemonData({"name": axiosData.name, "image": axiosData.sprites.front_default});
    // if (axiosData.length !== 0)
    //     props.onLogin(axiosData);
}


   //log out function
   const logout=()=>{
       window.location.reload(false);

   }
   
   // fetcher image

   async function fetchImages(imageName) {
    let imageKeys = await Storage.list(imageName)
    imageKeys = await Promise.all(imageKeys.map(async k => {
       
      const key = await Storage.get(k.key)
      return key
    }))
    setImageUrl(imageKeys)
    
  }

  

  async function fetchImages1(imageName) {
    let imageKeys = await Storage.list(imageName)
    imageKeys = await Promise.all(imageKeys.map(async k => {
       
      const key = await Storage.get(k.key)
      return key
    }))
    setImageUrl1(imageKeys)
    
  }

  function create (e:any) {
 
   setPostForm(true);
   console.log("dkdkdk")
   
}
function create2 (e : any){
    setPostForm(false);
    if (updateForm){
        setUpdateForm(false)
        e.target.value = "Close Update Form"
    }
    else{
        setUpdateForm(true)
        e.target.value = "Update User Info"
    }
}


let element:any;
if (postForm) 
    element = <CreatePost createPost={createPost} />

    let element2: any;

if (updateForm)
    element2 = <UpdateUser updateInfo={props.stateUser}/>





    //THIS is my async await function, it has nothing to do with React
    

    let axiosFetcher = async () => {

        const axiosPayLoad: any = await axios.get('http://localhost:8080/Project2SN/api/post//allPosts');

        const axiosData: any = axiosPayLoad.data;

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
                    return (
                        <ViewPost name={myPost} 
                        />

                    );
                })}
           </div> 
    );
    }
    else {
        myList = (<h1>No Post Available</h1>);
    }
    if (!props.statePost)
        axiosFetcher();
	
	 useEffect( ()=>{
            console.log("Effect has been run");
            getUsers();
        },[firstNameState]);
    
        const getUsers = async ()=>{
            
            /* e.preventDefault(); */
            const axiosPayLoad = await axios.post(`http://localhost:8080/Project2SN/api/user/searchUser`, {
                "user_first_name": firstNameState,
        });
    
        const axiosData = axiosPayLoad.data;
    
            if (axiosData!=null){
                /* alert('saved') */
                setFindUserState(axiosData);
                console.log(findUserState)
            }
        }
    
        const updateSearch = e =>{
            setSearchState(e.target.value);
            console.log(searchState)
          }  
          const getSearch = e =>{
            e.preventDefault();
            setfirstNameState(searchState);
            setSearchState("");
          }


    return (
        <>
<div>
    <div className="topbar">
    <div className='navbar'>
        
        <div>
            <nav className="">
                <div className="container-fluid">
                    <div className="logo"><img src={watertribe_logo}/></div>
                       <div>
               
               <form onSubmit={getSearch} className="search-form">
                   <input className="search-bar" type="search" placeholder="Search" aria-label="Search" onChange={updateSearch}/>
                   <button className="search-button" type="submit">Search</button>
               </form>
            </div>
           {/*  <SearchUser /> */}
           <div className='user-result'> 
           {/* -------- THIS IS WHERE WE SHOULD GET DATA FROM THE FETCH RESULT BUT I'M HAVING TROUBLE */}
        {/* {findUserState.map(foundUsers=>(
            ----------- PLS DELETE: THE BELOW IS MEANT TO CALL THE COMPONENT AND RENDER THE RESULT TO SCREEN... HAVING TROUBLE-----------
            <SearchUser 
            username={foundUsers.username}
            first_name={foundUsers.user_first_name}
            last_name={foundUsers.user_last_name}
            profile_image={foundUsers.userProfileImage}/>
        ))} */}
                </div>
                </div>
            </nav>
        </div>
        <div className="topbarright">
        <div className='userInfo'><div className='imgprofile'>
        {<img src={imageUrl} style={{width: 300, height: 150}} />}
        </div>
            <h4>{props.stateUser.user_first_name}    {props.stateUser.user_last_name}</h4></div>
        <div > 
        {/* <Link to='/'>LogOut</Link> */}
            <input type='button'  onClick={logout} className='logout' value='Log-out' /> 
        </div>
        </div>
    </div>
    </div>
        <div className='main'> 
             
            <div className='leftcol'>
            <div className='userInfo'><div className='imgprofile'>
                
                <img src={imageUrl} style={{width: 300, height: 150}} alt=""/>

                
                </div>
            <h4>{props.stateUser.user_first_name}    {props.stateUser.user_last_name}</h4></div>
            <input type='button' onClick={create2} className='updateInfobtn' value='Update Account' />
           <br/><br/><br/><br/>
           <a href='./'>Add user profile image</a><br/>
           <a href='./'>Update user info</a><br/>
           
            {/* {reimbs.map((reimb)=>(
                 
                 <Reimbrequested Key={reimb.reimId} reimb={reimb}/>
            )
            )
            
            } */}
            
            </div>

            <div className='middlecol'>
                <div className='ViewPost'>
                    <div><p></p></div>
                    <div className='userInfo'>
                        <div className='imgprofile'><img src={imageUrl} style={{width: 300, height: 150}} alt=""/></div>
                    <div className='addPost'> 
                        <input type='button' onClick={create} className='PostContent1' value='Click here to add new Post' /> 
                    </div>
                    </div>
                    <div className="line">
                    </div>
                    
                   
                        {
                            element
                        }
                   
                        
                    </div>

                    {element2}
                {/* <AddPost/> */}
                {myList}

            
            </div> 
            <div className='rightcol'>
                <div><h3>CONTACT LIST</h3></div>
                <br/> <br/> <br/>
                <div className="Contact">{myUserList}</div>
                </div>
        </div>
        </div>



        </>
    );
}


/*
  THIS the redux wrapper for our component
*/
export const HomeComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CoreHomeComponent);

