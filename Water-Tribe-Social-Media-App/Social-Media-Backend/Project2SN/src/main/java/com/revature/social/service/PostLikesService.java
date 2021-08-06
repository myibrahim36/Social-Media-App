package com.revature.social.service;

import com.revature.social.model.PostLikes;

public interface PostLikesService {
	
	public void addLike (PostLikes like);
	public boolean removeLike(PostLikes like);
	
	public PostLikes selectByPostId (int id);

}

