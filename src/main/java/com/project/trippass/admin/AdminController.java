package com.project.trippass.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	AdminService adminService;
	
	@PostMapping("/signup")
	public Admin signup(@RequestBody Admin admin) {
		return adminService.signup(admin);
	}
	
	@PostMapping("/signin")
	public String signin(@RequestParam String username, @RequestParam String password) {
		return adminService.signin(username, password);
	}
}
