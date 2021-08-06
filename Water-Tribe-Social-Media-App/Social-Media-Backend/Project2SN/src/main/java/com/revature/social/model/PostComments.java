package com.revature.social.model;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="post_comment")
public class PostComments {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="post_comment_id")
	private int postCommentId;
	
	@Column(name="post_commenter_id", unique=true, nullable=false)
	private int postCreatorId;
	


	@Column(name="post_comment", nullable=false)
	private String postComment;
	
	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@JoinColumn(name="comment_User_fk", nullable=false)
	//@Column(name="comment_user")
	private User commentUser;
	
	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@JoinColumn(name="comment_Post_fk", nullable=false)
	//@Column(name="comment_user")
	private Post commentPost;
	
	
	
	public PostComments() {
		// TODO Auto-generated constructor stub
	}

	public PostComments(int postCommentId, int postCreatorId, String postComment) {
		super();
		this.postCommentId = postCommentId;
		this.postCreatorId = postCreatorId;
		this.postComment = postComment;
	}

	public PostComments(int postCreatorId, String postComment) {
		super();
		this.postCreatorId = postCreatorId;
		this.postComment = postComment;
	}

	public int getPostCommentId() {
		return postCommentId;
	}

	public void setPostCommentId(int postCommentId) {
		this.postCommentId = postCommentId;
	}

	public int getPostCreatorId() {
		return postCreatorId;
	}

	public void setPostCreatorId(int postCreatorId) {
		this.postCreatorId = postCreatorId;
	}

	public String getPostComment() {
		return postComment;
	}

	public void setPostComment(String postComment) {
		this.postComment = postComment;
	}

	@Override
	public String toString() {
		return "\n\t\t\tPostComments [postCommentId=" + postCommentId + ", postCreatorId=" + postCreatorId + ", postComment="
				+ postComment + "]";
	}
	
	

}
