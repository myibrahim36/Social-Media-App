package com.revature.social.service;


import java.util.List;

import org.hibernate.SessionFactory;

import com.revature.social.model.Post;
import com.revature.social.repository.PostDao;
import com.revature.social.repository.PostDaoImpl;


public class PostServiceImpl implements PostService {

	
	private SessionFactory sesFact;
	PostDao postDao = new PostDaoImpl(sesFact);
	
	public void addPost(Post post) {
		postDao.makePost(post);
	}

	public void changePost(Post post) {
		postDao.updatePost(post);

	}

	public boolean removePost(int id) {
		return postDao.deletePost(id);
	}

	public Post selectById(int id) {
		return postDao.selectById(id);
	}

	public List<Post> selectByUser(String username) {
		return postDao.selectByUser(username);
	}

	public List<Post> selectAll() {
		return postDao.selectAll();
	}

}

