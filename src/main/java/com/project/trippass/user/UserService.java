package com.project.trippass.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	public User signup(User user) {
		return userRepository.save(user);
	}

	public String signin(String username, String password) {
		
		List<User> userlist = userRepository.findAll();
		boolean flag = true;
		
		for(int i = 0; i < userlist.size(); i++) {
			if(username.equals(userlist.get(i).getUsername()) && password.equals(userlist.get(i).getPassword())) {
				flag = false;
				return "SignedIn";
			}
		}
	
		if(flag) {
			return "Failed";
		} 
		else {
			return "SignedIn";
		}
	}

}
