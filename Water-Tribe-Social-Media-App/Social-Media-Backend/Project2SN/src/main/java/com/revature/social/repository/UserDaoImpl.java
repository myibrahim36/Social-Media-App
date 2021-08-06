package com.revature.social.repository;



import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.revature.social.model.User;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;



@Transactional
@Repository("userDao")
public class UserDaoImpl implements UserDao {
	
final static Logger loggy = Logger.getLogger(UserDaoImpl.class);
	
	{
		loggy.setLevel(Level.ALL);
	}
	
	
	private SessionFactory sesFact;
	
	@Autowired
	public UserDaoImpl(SessionFactory sesFact) {
		super();
		this.sesFact = sesFact;
	}

	@Override
	public List<User> selectAll() {
		
		return sesFact.getCurrentSession().createQuery("from User", User.class).list();
	}

	@Override
	public void insert(User user) {
		loggy.info("sign up success");	
		sesFact.getCurrentSession().save(user);
		
	}
	
	@Override
	public User selectById(int id) {
		
		return sesFact.getCurrentSession().get(User.class, id);
	}

	@Override
	public User selectByUsername(String username) {
		Session ses = sesFact.getCurrentSession();

		List<User> myUserList = ses.createQuery("from User where username=:username", User.class)
				.setParameter("username", username).list();

		if (myUserList.size() < 1)
			return null;

		return myUserList.get(0);
	}
	@Override
	public void updateUser(User user) {
		sesFact.getCurrentSession().update(user);
	}
	

	@Override
	public void changePassword(User user) {
		loggy.error("Someone change his password");	
		sesFact.getCurrentSession().update(user);
	}

	@Override
	public User selectByEmail(String email) {
		Session ses = sesFact.getCurrentSession();

		List<User> myUserList = ses.createQuery("from User where user_email=:email", User.class)
				.setParameter("email", email).list();

		if (myUserList.size() < 1)
			return null;

		return myUserList.get(0);
	}

	@Override
	public List<User> searchUser(User user) {
		Session ses = sesFact.getCurrentSession();

		List<User> myUserList = ses.createQuery("from User where user_email=:email or user_first_name=:email or "
				+ "user_last_name=:email or user_phone=:email or username=:email"
				, User.class)
				.setParameter("email", user.getUser_first_name()).list();

		if (myUserList.size() < 1)
			return null;

		return myUserList;
	}



}

