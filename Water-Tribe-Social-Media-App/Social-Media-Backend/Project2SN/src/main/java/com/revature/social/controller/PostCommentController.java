
package com.revature.social.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.revature.social.model.PostComments;
import com.revature.social.repository.PostCommentsDao;

@RestController
@RequestMapping("/post")
@CrossOrigin("*")
public class PostCommentController {
	
	private PostCommentsDao deleteLater;

	////////////////////CONSTRUCTOR
	@Autowired
	public PostCommentController(PostCommentsDao deleteLater) {
		super();
		this.deleteLater = deleteLater;
//		insertInitialPostComment(deleteLater);
	}
	
	///////////////////// CRUD VALUES
	
//	private void insertInitialPostComment(PostCommentsDao deletePls) {
//		deletePls.insertComment(new PostComments("this is my test comment"));
//		deletePls.insertComment(new PostComments("this is my test comment 2"));
//		deletePls.insertComment(new PostComments("this is my test comment 3"));
//	}
//	
	
	/////////////////////// ENDPOINT METHODS
	@GetMapping(value="/allComments")
	public List<PostComments> selectAllComments(){
		System.out.println("in select all comments");
		return deleteLater.selectAllComments();
	}
	
	@PostMapping(value="/createNewComment")
	public String createPostComment(@RequestBody PostComments newPostComment) {
		System.out.println("in the create new comment controller");
		deleteLater.insertComment(newPostComment);
		return "create a new comment";	
	}
	
	@PostMapping(value="/updateComment")
	@ResponseStatus(value=HttpStatus.ACCEPTED)
	public String updateComment(@RequestBody PostComments updatePostComment) {
		deleteLater.updateComment(updatePostComment);
		System.out.println("in update comment");
		return "Successfully updated comment";
	}
	
	@PostMapping(value="/deleteComment")
	@ResponseStatus(value=HttpStatus.ACCEPTED)
	public String deleteComment(@RequestBody PostComments deletePostComment) {
		deleteLater.deleteComment(deletePostComment);
		System.out.println("in delete comment");
		return "Successfully deleted comment";
	}
	
	@PutMapping(value="/selectCommentById")
	public PostComments getFurnitureById(@RequestParam("id") int id){
		System.out.println("in select Comment by Id");
		return deleteLater.selectByCommentId(id);
	}



}

