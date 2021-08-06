package com.revature.social.repository;


import java.util.List;

import com.revature.social.model.PostComments;


public interface PostCommentsDao {

	// CRUD methods
	public void insertComment(PostComments newPost);
	public void updateComment(PostComments newPost);
	public void deleteComment(PostComments newPost);
	public PostComments selectByCommentId(int commentId);
	public List<PostComments> selectByCommentCreatorId(int commentCreatorId);
	public List<PostComments> selectAllComments();
}

