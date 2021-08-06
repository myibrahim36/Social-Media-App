import React from 'react'
import { useState, useEffect } from 'react'
import {Storage} from 'aws-amplify'
import axios from 'axios';

const ViewProfile = ({userId}) => {
    const [imageUrl, setImageUrl] = useState("");
    const [imageUrl1, setImageUrl1] = useState("");
    const [userIdState, setIdState] = useState(userId);
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");

    useEffect(() => {
        axiosFetcher();
        fetchImages(imageUrl1);
       }, [])
    
       async function fetchImages(imageName) {
        let imageKeys = await Storage.list(imageName)
        imageKeys = await Promise.all(imageKeys.map(async k => {
           
          const key = await Storage.get(k.key)
          return key
        }))
        setImageUrl(imageKeys)
        
      }
      let axiosFetcher = async (e) => {
       
        const axiosPayLoad = await axios.post('http://localhost:8080/Project2SN/api/user/getUserId', {
            "user_id": userIdState
        });
    
        const axiosData = axiosPayLoad.data;
    
        console.log("axiosdata: ", axiosData);
        setImageUrl1(axiosData.userProfileImage)
        setUserFirstName(axiosData.user_first_name)
        setUserLastName(axiosData.user_last_name)
    

    }
    

    return (
        <div>
            <div className='ViewPost'>
                <div className="imgViewProfile">{<img src={imageUrl}/>}</div>
            <div className='userInfo'><div className='imgprofile'></div><h4>{userFirstName+" "+userLastName}</h4></div>
            <div className='PostContent'><p></p></div>
            <div className='PostImage'>{<img src={imageUrl}/>}</div>
            
            </div>
        </div>
    )
}

export default ViewProfile
