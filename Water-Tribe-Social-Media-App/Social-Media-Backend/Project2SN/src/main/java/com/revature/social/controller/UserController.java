package com.revature.social.controller;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.social.model.User;
import com.revature.social.repository.UserDao;



@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	private UserDao deleteMeLater;
	
	//////////CONSTRUCTOR
	@Autowired
	public UserController(UserDao deleteMeLater) {
		super();
		this.deleteMeLater = deleteMeLater;
		//insertInitialValues(deleteMeLater);
	}
	

	
	//////////INSERT INITIAL VALUES
	private void insertInitialValues(UserDao deleteMePls) {
		deleteMePls.insert(new User("conor", "kent", "cfkent", "pass" ,"kent@gmail.com"));
		deleteMePls.insert(new User("Lluffy","luffy", "admin", "passw","luffy@gmail.com"));
		deleteMePls.insert(new User("Nnami","nami", "employee", "pass","nami@gmail.com"));
		
	}
	
	//////////ENDPOINT METHODS
	
	//get all users
	
	@GetMapping(value="/allUsers")
	public List<User> allUsers(){
		System.out.println("in select all users");
		return deleteMeLater.selectAll();
	}
	
	
	// register a new user
	
	@PostMapping(value="/register")
	public String registerUser(@RequestBody User newUser) {
		System.out.println("in the registerUser method");
		deleteMeLater.insert(newUser);
		
			return "new user saved";
		
	}
	
	//get user information
	
	@GetMapping(value="/getUser")
	public User getUser(HttpSession session) {
		System.out.println("in the getUser method");
		User currentUser = (User)session.getAttribute("currentUser");
		
		System.out.println("\n\n\n");
		
		if(currentUser==null)
			return null;
		
		return currentUser;
	}
	
	//login method
	
	@PostMapping(value="/login")
	public User login(HttpSession session, @RequestBody User incomingUser) {
		System.out.println("in the login method");
		User existingUser=deleteMeLater.selectByUsername(incomingUser.getUsername());
		
		if (existingUser!=null) {
//			if(existingUser.getUser_password().equals(incomingUser.getUser_password())){
				session.setAttribute("currentUser", existingUser);
				return existingUser;
//				}
//			else
//				return null;
		}
		else
			return null;
		
	}
	
	// get user info
	
	@PostMapping(value="/getUser")
	public User getUser(HttpSession session, @RequestBody User incomingUser) {
		
		User existingUser=deleteMeLater.selectByEmail(incomingUser.getUser_email());
		
		if (existingUser!=null) {
			
				return existingUser;
		}
		else
			return null;
		
	}
	
	// get user info
	
	@PostMapping(value="/getUserId")
	public User getUserById(HttpSession session, @RequestBody User incomingUser) {
		
		User existingUser=deleteMeLater.selectById(incomingUser.getUser_id());
		
		if (existingUser!=null) {
			
				return existingUser;
		}
		else
			return null;
		
	}
	
	// get users info
	
	@PostMapping(value="/searchUser")
	public List<User> searchUsers(HttpSession session, @RequestBody User incomingUser) {
		
		List<User> existingUsers=deleteMeLater.searchUser(incomingUser);
		
		if (existingUsers!=null) {
			
				return existingUsers;
		}
		else
			return null;
		
	}
	
	
	// logout method
	
	@GetMapping(value="/logout")
	public String logout(HttpServletRequest myReq) {
		//here, I am using HttpServletRequest just to show you that you CAN if you want to
		
		System.out.println("in the logout method");
		HttpSession session = myReq.getSession(false);
		
		if(session!=null) {
			session.invalidate();
		}
		
		return "see you next time";
	}
	
	@PutMapping("/editUser")
	public String updateUser(@RequestBody User myUser) {
		System.out.println("in the updateUser method");
		deleteMeLater.updateUser(myUser);
		
		return "user updated!";
	}
	

	@PutMapping("/updatePassword")
	public String updatePassword(HttpSession session, @RequestBody User currentUser) {
		deleteMeLater.changePassword(currentUser);
		
		return "Password has been updated.";
	}

	
	
}

