import React from 'react'
import {Link} from 'react-router-dom'
//import CreatePost from './CreatePost'
import CreatePost from './CreatePost1'
import { useState } from 'react'
import { create } from 'domain'

const AddPost = () => {
    const [postForm, setPostForm] = useState(false)


    function create (e) {
        // e.preventDefault();
        setPostForm(true);
        console.log("in function");
    }

    let element = "";
    if (postForm) 
    element = <CreatePost/>;
    
    
    return (
        <div className='ViewPost'>
            <div className='userInfo'>
                <div className='imgprofile'></div>
            <div className='addPost'> 
            <input type='button' onClick={create} className='PostContent1' value='Click here to add new Post' /> 
            </div>
            </div>
        
            <div >
            </div>

            {
                element
            }
            {/* {<Link to='/CreatePost' component={CreatePost}></Link>} */}
            
            <div >


            {/* {location.pathname==='/'&&<Link to='/ResetPassword' >Forgot password ?</Link>}<br/>
            {location.pathname==='/'&&<Link to='/SignUpForm'>Sign up for SN Revature</Link>} */}
        </div>
            
        </div>
    )
}

export default AddPost
