package com.project.trippass.passenger;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/passengers")
public class PassengerController {

	@Autowired
	PassengerService passengerService;
	
	@PostMapping("/add")
    public Passenger create(@RequestBody Passenger passenger) {
    	return passengerService.addPassenger(passenger); 
    }
    
    @GetMapping("/getall")
    public List<Passenger> getAll() { 
    	return passengerService.getAllPassengers(); 
    }
    
    @GetMapping("/getbyid/{pid}") 
    public Passenger getById(@PathVariable int pid) { 
    	return passengerService.getPassengerById(pid); 
    }
    
    @PutMapping("/update/{pid}") 
    public Passenger update(@PathVariable int pid, @RequestBody Passenger passenger) {
    	return passengerService.updatePassenger(pid, passenger); 
    }
    
    @DeleteMapping("/delete/{pid}") 
    public String delete(@PathVariable int pid) { 
    	return passengerService.deletePassenger(pid); 
    }
}
