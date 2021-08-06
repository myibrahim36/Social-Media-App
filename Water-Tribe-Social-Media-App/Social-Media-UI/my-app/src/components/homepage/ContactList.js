import React from 'react'
import { useState, useEffect } from 'react'
import {Storage} from 'aws-amplify'


const ContactList = ({user,viewProfile}) => {


    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
       fetchImages(user.userProfileImage)
      }, [])
      async function fetchImages(imageName) {
        let imageKeys = await Storage.list(imageName)
        imageKeys = await Promise.all(imageKeys.map(async k => {
           
          const key = await Storage.get(k.key)
          return key
        }))
        setImageUrl(imageKeys)
        
      }
    
    
    return (

   
           <div className='userInfo' id={user.user_id} onClick={viewProfile}>
                        <div className='imgprofile'>
                            {<img src={imageUrl} style={{width: 300, height: 150}} alt=""/>}
                        </div>
                        <h3>{user.user_first_name}    {user.user_last_name}</h3>
            </div>

    )
}

export default ContactList
