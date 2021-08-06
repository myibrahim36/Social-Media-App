package com.revature.social.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.social.model.Post;
import com.revature.social.model.User;
import com.revature.social.repository.PostDao;


@RestController
@RequestMapping(value="/post")
@CrossOrigin("*")
public class PostController {
	
	private PostDao myDao;
	
	@Autowired
	public PostController(PostDao myDao) {
		super();
		this.myDao = myDao;
		
		//insertInitialValues(myDao);
	}
	

	
	//////////INSERT INITIAL VALUES
	private void insertInitialValues(PostDao deleteMePls) {
		deleteMePls.makePost(new Post(new User(1,"conor", "kent", "cfkent", "pass" ,"kent@gmail.com"),"dkdkdlslkdkddkdkdkdkdkdkddkdkd"));
		deleteMePls.makePost(new Post(new User(1,"conor", "kent", "cfkent", "pass" ,"kent@gmail.com"),"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
		deleteMePls.makePost(new Post(new User(2,"Lluffy","luffy", "admin", "passw","luffy@gmail.com"),"ssssssssssssssssssssssssssss"));
		deleteMePls.makePost(new Post(new User(3,"Nnami","nami", "employee", "pass","nami@gmail.com"),"ffffffffffffffffffffffffffffff"));
		
	}
	
	@GetMapping(value="/allPosts")
	public List<Post> allPosts(){
		System.out.println("in get all posts");
		return myDao.selectAll();
	}
	
	// register a new post
	
		@PostMapping(value="/createPost")
		public String createPost(@RequestBody Post post) {
			System.out.println("in the create post method");
			myDao.makePost(post);
			
				return "new post saved";
			
		}
		
	
}
