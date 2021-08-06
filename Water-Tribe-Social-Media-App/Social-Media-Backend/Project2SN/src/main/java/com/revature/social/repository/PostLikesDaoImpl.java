package com.revature.social.repository;


import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.revature.social.model.PostLikes;


@Transactional
@Repository("postLikeDao")
public class PostLikesDaoImpl implements PostLikesDao {

	private SessionFactory sesFact;
	
	@Autowired
	public PostLikesDaoImpl(SessionFactory sesFact) {
		super();
		this.sesFact = sesFact;
	}

	public void addLike(PostLikes like) {
		sesFact.getCurrentSession().save(like);
	}

	public boolean removeLike(PostLikes like) {
		sesFact.getCurrentSession().delete(like);
		
		return false;
	}

	public PostLikes selectByPostId(int id) {
		return sesFact.getCurrentSession().get(PostLikes.class, id);
	}




}
