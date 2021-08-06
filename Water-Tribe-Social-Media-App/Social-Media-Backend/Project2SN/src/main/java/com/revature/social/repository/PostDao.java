package com.revature.social.repository;

import java.util.List;

import com.revature.social.model.Post;



public interface PostDao {
	
	//CRUD OPS
		public void makePost(Post post);
		public void updatePost(Post post);
		public boolean deletePost(int id);
		
		public Post selectById(int id);
		public List<Post> selectByUser(String username);
		public List<Post> selectAll();
		

}
