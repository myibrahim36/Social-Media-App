package com.revature.social.model;

import java.sql.Timestamp;
import javax.persistence.*;

import javassist.bytecode.ByteArray;





@Entity
@Table(name="user_table")
public class User {

	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;
	
	@Column(name="user_first_name")
	private String user_first_name;
	
	@Column(name="user_last_name")
	private String user_last_name;
	
	@Column(name="username", nullable=false , unique = true)
	private String username;
	
	@Column(name="user_password", nullable=false)
	private String user_password;
	
	@Column(name="user_email",unique=true, nullable=false)
	private String user_email;
	
	@Column(name="user_phone")
	private String user_phone;
	
	@Column(name="user_registered_date")
	private String user_registered_date;
	
	@Column(name="user_profile_image")
	private String userProfileImage;

	public User() {
		
	}

	public User(int user_id, String user_first_name, String user_last_name, String username, String user_password,
			String user_email, String user_phone, String user_registered_date, String userProfileImage) {
		super();
		this.user_id = user_id;
		this.user_first_name = user_first_name;
		this.user_last_name = user_last_name;
		this.username = username;
		this.user_password = user_password;
		this.user_email = user_email;
		this.user_phone = user_phone;
		this.user_registered_date = user_registered_date;
		this.userProfileImage = userProfileImage;
	}
	
	public User(int user_id, String user_first_name, String user_last_name, String username, String user_password,
			String user_email) {
		super();
		this.user_id = user_id;
		this.user_first_name = user_first_name;
		this.user_last_name = user_last_name;
		this.username = username;
		this.user_password = user_password;
		this.user_email = user_email;
	}

	public User(String user_first_name, String user_last_name, String username, String user_password,
			String user_email) {
		super();
		this.user_first_name = user_first_name;
		this.user_last_name = user_last_name;
		this.username = username;
		this.user_password = user_password;
		this.user_email = user_email;
	}

	public User(String user_first_name, String user_last_name, String username, String user_password, String user_email,
			String user_phone, String user_registered_date) {
		super();
		this.user_first_name = user_first_name;
		this.user_last_name = user_last_name;
		this.username = username;
		this.user_password = user_password;
		this.user_email = user_email;
		this.user_phone = user_phone;
		this.user_registered_date = user_registered_date;
	}

	public User(String user_first_name, String user_last_name, String username, String user_password, String user_email,
			String user_phone, String user_registered_date, String userProfileImage) {
		super();
		this.user_first_name = user_first_name;
		this.user_last_name = user_last_name;
		this.username = username;
		this.user_password = user_password;
		this.user_email = user_email;
		this.user_phone = user_phone;
		this.user_registered_date = user_registered_date;
		this.userProfileImage = userProfileImage;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getUser_first_name() {
		return user_first_name;
	}

	public void setUser_first_name(String user_first_name) {
		this.user_first_name = user_first_name;
	}

	public String getUser_last_name() {
		return user_last_name;
	}

	public void setUser_last_name(String user_last_name) {
		this.user_last_name = user_last_name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUser_password() {
		return user_password;
	}

	public void setUser_password(String user_password) {
		this.user_password = user_password;
	}

	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}

	public String getUser_phone() {
		return user_phone;
	}

	public void setUser_phone(String user_phone) {
		this.user_phone = user_phone;
	}

	public String getUser_registered_date() {
		return user_registered_date;
	}

	public void setUser_registered_date(String user_registered_date) {
		this.user_registered_date = user_registered_date;
	}

	public String getUserProfileImage() {
		return userProfileImage;
	}

	public void setUserProfileImage(String userProfileImage) {
		this.userProfileImage = userProfileImage;
	}

	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", user_first_name=" + user_first_name + ", user_last_name="
				+ user_last_name + ", username=" + username + ", user_password=" + user_password + ", user_email="
				+ user_email + ", user_phone=" + user_phone + ", user_registered_date=" + user_registered_date
				+ ", userProfileImage=" + userProfileImage + "]";
	}

	


	

	
	
}
