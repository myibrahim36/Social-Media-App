package com.revature.social.service;

import java.util.List;

import org.hibernate.SessionFactory;

import com.revature.social.model.User;
import com.revature.social.repository.UserDao;
import com.revature.social.repository.UserDaoImpl;


public class UserServiceImpl implements UserService {

	
	private SessionFactory sesFact;
	
	UserDao userDao = new UserDaoImpl(sesFact);
	
	@Override
	public void addUser(User myUser) {
		userDao.insert(myUser);
	}

	@Override
	public List<User> getAllUsers() {
		return userDao.selectAll();
	}

	@Override
	public User getUsingId(int id) {
		return userDao.selectById(id);
	}

	@Override
	public User getUsingName(String name) {
		return userDao.selectByUsername(name);
	}

}

