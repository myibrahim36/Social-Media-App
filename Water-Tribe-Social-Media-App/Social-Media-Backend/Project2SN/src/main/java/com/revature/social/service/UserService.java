package com.revature.social.service;


import java.util.List;

import com.revature.social.model.User;



public interface UserService {

	public void addUser(User myUser);
	public List<User> getAllUsers();
	public User getUsingId(int id);
	public User getUsingName(String name);
}
