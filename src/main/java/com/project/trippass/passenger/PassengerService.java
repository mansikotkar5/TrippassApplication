package com.project.trippass.passenger;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trippass.booking.Booking;

@Service
public class PassengerService {

	@Autowired
	PassengerRepository passengerRepository;

	public Passenger addPassenger(Passenger passenger) {
		return passengerRepository.save(passenger);
	}
	
	public List<Passenger> getAllPassengers() {
		return passengerRepository.findAll();
	}
	
	public Passenger getPassengerById(int pid) {
		return passengerRepository.findById(pid).orElse(null);
	}
	
	public Passenger updatePassenger(int pid, Passenger newpassenger) {
		
		Passenger passenger = this.getPassengerById(pid);
		
		if (passenger == null) return null; 
		
		if(newpassenger.getName() != null) {
			passenger.setName(newpassenger.getName());
		}
		if(newpassenger.getGender() != null) {
			passenger.setGender(newpassenger.getGender());
		}
		if(newpassenger.getAge() != 0) {
			passenger.setAge(newpassenger.getAge());
		}
		if(newpassenger.getMob() != null) {
			passenger.setMob(newpassenger.getMob());
		}
		
		return passengerRepository.save(passenger);
	}

	public String deletePassenger(int pid) {
	    if (!passengerRepository.existsById(pid)) {
	        return "Passenger not found!";
	    }
	    passengerRepository.deleteById(pid);
	    return "Passenger deleted successfully!";
	}

//	public Passenger authenticate(String email, String password) {
//		
//		return null;
//	}
}
