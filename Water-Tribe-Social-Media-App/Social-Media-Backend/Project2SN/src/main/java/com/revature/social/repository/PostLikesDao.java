package com.revature.social.repository;


import com.revature.social.model.PostLikes;


public interface PostLikesDao {
	
	public void addLike (PostLikes like);
	public boolean removeLike(PostLikes like);
	
	public PostLikes selectByPostId (int id);
	
}

