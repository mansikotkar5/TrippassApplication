package com.project.trippass.booking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.trippass.passenger.Passenger;
import com.project.trippass.user.UserService;

@RestController
@RequestMapping("/bookings")
public class BookingController {

	@Autowired
	BookingService bookingService;
	UserService userService;
	
	@PostMapping("/add")
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking) {
//		for (Passenger passenger : booking.getPassengers()) {
//	        passenger.setBooking(booking); // Assign the booking to each passenger
//	    }
		if (booking.getUser() == null || booking.getTrip() == null) {
	        return ResponseEntity.badRequest().build(); // Handle missing data
	    }
		Booking newBooking = bookingService.addBooking(booking);
        return ResponseEntity.ok(newBooking);
    }
    
    @GetMapping("/getall")
    public List<Booking> getAll() { 
    	return bookingService.getAllBookings(); 
    }
    
    @GetMapping("/users/{uid}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable int uid) {
        List<Booking> userBookings = bookingService.getBookingsByUser(uid);
        System.out.println("User Bookings for ID " + uid + ": " + userBookings);
        return ResponseEntity.ok(userBookings);
    }
    
    @GetMapping("/getbyid/{bid}") 
    public Booking getById(@PathVariable int bid) { 
    	return bookingService.getBookingById(bid); 
    }
    
    @PutMapping("/update/{bid}") 
    public Booking update(@PathVariable int bid, @RequestBody Booking booking) {
    	return bookingService.updateBooking(bid, booking); 
    }
    
    @DeleteMapping("/delete/{bid}") 
    public String delete(@PathVariable int bid) { 
    	return bookingService.deleteBooking(bid); 
    }
    
}
