package com.project.trippass.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;
	
	@PostMapping("/signup")
	public User signup(@RequestBody User user) {
		return userService.signup(user);
	}
	
	@PostMapping("/signin")
	public String signin(@RequestParam String username, @RequestParam String password) {
		return userService.signin(username, password);
	}
}
