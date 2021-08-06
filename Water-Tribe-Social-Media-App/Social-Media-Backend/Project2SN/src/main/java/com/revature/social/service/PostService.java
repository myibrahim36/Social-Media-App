package com.revature.social.service;


import java.util.List;

import com.revature.social.model.Post;


public interface PostService {
	
	public void addPost(Post post);
	public void changePost(Post post);
	public boolean removePost(int id);
	
	public Post selectById(int id);
	public List<Post> selectByUser(String username);
	public List<Post> selectAll();

}
