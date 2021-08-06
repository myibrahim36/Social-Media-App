package com.revature.social.repository;


import java.util.List;

import com.revature.social.model.User;

public interface UserDao {

	public List<User> selectAll();
	public void insert(User user);
	public User selectById(int id);
	public User selectByUsername(String username);
	public void updateUser(User user);
	public void changePassword(User user);
	public User selectByEmail(String email);
	public List<User> searchUser(User user);
}
