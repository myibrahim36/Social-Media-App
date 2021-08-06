import React from 'react'
import { useState} from 'react'
import { useEffect } from 'react';
import img1 from '../../images/img1.png'
import {Storage} from 'aws-amplify'

const ViewPost = ({name}) => {
    useEffect(() => {
        fetchImages(name.postImage)
        fetchImagesProfile(name.postUser.userProfileImage)
        //axiosFetcher()
      }, [])

    const [imageUrl, setImageUrl] = useState(img1);
    const [imageUrlProfile, setImageUrlProfile] = useState(img1);

async function fetchImages(imageName) {
    let imageKeys = await Storage.list(imageName)
    imageKeys = await Promise.all(imageKeys.map(async k => {
       
      const key = await Storage.get(k.key)
      return key
    }))
    setImageUrl(imageKeys)
    
  }

  async function fetchImagesProfile(imageName) {
    let imageKey = await Storage.list(imageName)
    imageKey = await Promise.all(imageKey.map(async k => {
       
      const key = await Storage.get(k.key)
      return key
    }))
    setImageUrlProfile(imageKey)


  }
    function comment(e){
      e.preventDefault()
      console.log("kdkdkdkddkdkd");
    }
    return (
        <div className='ViewPost'>
            <div className='userInfo'><div className='imgprofile'>{<img src={imageUrlProfile}/>}</div><h4>{name.postUser.user_first_name+" "+name.postUser.user_last_name}</h4></div>
            <div className='PostContent'><p>{name.postContent}</p></div>
            <div className='PostImage'>{<img src={imageUrl}/>}</div>
            <div className='PostAction'><input type='button' className='like' value='Like'/> <input type='button' className='comment' value='Comment'/></div>
            <div><div classname=''></div><form onSubmit={comment} ><input type='text' id ="comm"className='commentPost' /></form> </div>
        </div>
    )
}

export default ViewPost
