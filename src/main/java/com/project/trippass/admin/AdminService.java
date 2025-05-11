package com.project.trippass.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

	@Autowired
	AdminRepository adminRepository;
	
	public Admin signup(Admin admin) {
		return adminRepository.save(admin);
	}

	public String signin(String username, String password) {
		
		List<Admin> adminlist = adminRepository.findAll();
		boolean flag = true;
		
		for(int i = 0; i < adminlist.size(); i++) {
			if(username.equals(adminlist.get(i).getUsername()) && password.equals(adminlist.get(i).getPassword())) {
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
