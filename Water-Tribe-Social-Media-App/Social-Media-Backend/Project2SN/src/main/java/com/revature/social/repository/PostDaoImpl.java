package com.revature.social.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.revature.social.model.Post;



@Transactional
@Repository("PostDao")
public class PostDaoImpl implements PostDao {
	
	private SessionFactory sesFact;
	
	
	@Autowired
	public PostDaoImpl(SessionFactory sesFact) {
		super();
		this.sesFact = sesFact;
	}

	
	public void makePost(Post post) {
		
		sesFact.getCurrentSession().save(post);
		

	}

	public void updatePost(Post post) {

		sesFact.getCurrentSession().update(post);
	}

	public Post selectById(int id) {
		
		return sesFact.getCurrentSession().get(Post.class, id);
	}

	public List<Post> selectByUser(String username) {
		
		Session ses = sesFact.getCurrentSession();
		
		List<Post> postList = ses.createQuery("from Post where postUser=:poster", Post.class)
							.setParameter("author", username)
							.list();
		
		return postList;
	}

	public List<Post> selectAll() {
		return sesFact.getCurrentSession().createQuery("from Post p ORDER BY p.postId DESC", Post.class).getResultList();
	}

	public boolean deletePost(int id) {
		
		sesFact.getCurrentSession().delete(id);
		
		return false;
	}

}
