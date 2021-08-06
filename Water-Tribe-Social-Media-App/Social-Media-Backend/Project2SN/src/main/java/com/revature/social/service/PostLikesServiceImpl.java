package com.revature.social.service;



import org.hibernate.SessionFactory;

import com.revature.social.model.PostLikes;
import com.revature.social.repository.PostLikesDao;
import com.revature.social.repository.PostLikesDaoImpl;



public class PostLikesServiceImpl implements PostLikesService {

	SessionFactory sesFact;
	PostLikesDao postDao = new PostLikesDaoImpl(sesFact);
	
	public void addLike(PostLikes like) {
		postDao.addLike(like);
		
	}

	public boolean removeLike(PostLikes like) {
		return postDao.removeLike(like);
	}

	public PostLikes selectByPostId(int id) {
		return postDao.selectByPostId(id);
	}

}

