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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="post_likes")
public class PostLikes {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="like_id")
	private int likeId;

	
	
	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@JoinColumn(name="Post_Like_fk", nullable=false)
	//@Column(name="comment_user")
	private Post postLike;
	
	public PostLikes() {
		
	}

	public PostLikes(int likeId, Post postLike) {
		super();
		this.likeId = likeId;
		this.postLike = postLike;
	}

	public PostLikes(Post postLike) {
		super();
		this.postLike = postLike;
	}

	public int getLikeId() {
		return likeId;
	}

	public void setLikeId(int likeId) {
		this.likeId = likeId;
	}

	public Post getPostLike() {
		return postLike;
	}

	public void setPostLike(Post postLike) {
		this.postLike = postLike;
	}

	@Override
	public String toString() {
		return "PostLikes [likeId=" + likeId + ", postLike=" + postLike + "]";
	}
	

	
	

}

