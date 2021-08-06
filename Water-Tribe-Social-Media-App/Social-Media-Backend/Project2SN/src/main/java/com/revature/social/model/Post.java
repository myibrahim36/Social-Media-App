package com.revature.social.model;

import java.sql.Timestamp;
import java.util.Arrays;

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
@Table(name="user_posts")
public class Post {
	
	@Id
	@Column(name="post_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int postId;
	
	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@JoinColumn(name="post_user_fk", nullable=false)
	//@Column(name="post_user")
	private User postUser;
	
	@Column(name="post_content")
	private String postContent;
	
	@Column(name="post_image")
	private String postImage;
	
	@Column(name="post_time")
	private String timeCreated;
	
	public Post() {
		// TODO Auto-generated constructor stub
	}

	public Post(int postId, User postUser, String postContent, String postImage, String timeCreated) {
		super();
		this.postId = postId;
		this.postUser = postUser;
		this.postContent = postContent;
		this.postImage = postImage;
		this.timeCreated = timeCreated;
	}

	public Post(User postUser, String postContent, String postImage, String timeCreated) {
		super();
		this.postUser = postUser;
		this.postContent = postContent;
		this.postImage = postImage;
		this.timeCreated = timeCreated;
	}

	public Post(User postUser, String postContent, String timeCreated) {
		super();
		this.postUser = postUser;
		this.postContent = postContent;
		this.timeCreated = timeCreated;
	}
	
	public Post(User postUser, String postContent) {
		super();
		this.postUser = postUser;
		this.postContent = postContent;
		
	}

	public int getPostId() {
		return postId;
	}

	public void setPostId(int postId) {
		this.postId = postId;
	}

	public User getPostUser() {
		return postUser;
	}

	public void setPostUser(User postUser) {
		this.postUser = postUser;
	}

	public String getPostContent() {
		return postContent;
	}

	public void setPostContent(String postContent) {
		this.postContent = postContent;
	}

	public String getPostImage() {
		return postImage;
	}

	public void setPostImage(String postImage) {
		this.postImage = postImage;
	}

	public String getTimeCreated() {
		return timeCreated;
	}

	public void setTimeCreated(String timeCreated) {
		this.timeCreated = timeCreated;
	}

	@Override
	public String toString() {
		return "Post [postId=" + postId + ", postUser=" + postUser + ", postContent=" + postContent + ", postImage="
				+ postImage + ", timeCreated=" + timeCreated + "]";
	}

	
	

}
