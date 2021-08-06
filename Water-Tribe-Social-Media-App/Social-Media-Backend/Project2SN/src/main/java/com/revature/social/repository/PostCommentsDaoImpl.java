package com.revature.social.repository;


import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.revature.social.model.PostComments;


@Transactional
@Repository("postCommentDao")
public class PostCommentsDaoImpl implements PostCommentsDao {

	private SessionFactory sesFact;

	@Autowired
	public PostCommentsDaoImpl(SessionFactory sesFact) {
		super();
		this.sesFact = sesFact;
	}

	public void insertComment(PostComments newPost) {

		sesFact.getCurrentSession().save(newPost);
	}

	public void updateComment(PostComments newPost) {

		sesFact.getCurrentSession().update(newPost);
	}

	public void deleteComment(PostComments newPost) {

		sesFact.getCurrentSession().delete(newPost);
	}

	public PostComments selectByCommentId(int commentId) {

		return sesFact.getCurrentSession().get(PostComments.class, commentId);
	}

	public List<PostComments> selectByCommentCreatorId(int commentCreatorId) {

		Session ses = sesFact.getCurrentSession();

		// HQL
		List<PostComments> myCommentList = ses
				.createQuery("from PostComments where postCreatorId=:author", PostComments.class)
				.setParameter("author", commentCreatorId).list();

		return myCommentList;

	}

	public List<PostComments> selectAllComments() {

		return sesFact.getCurrentSession().createQuery("from PostComments", PostComments.class).list();
	}

}

