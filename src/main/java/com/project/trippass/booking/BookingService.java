package com.project.trippass.booking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trippass.passenger.Passenger;

@Service
public class BookingService {

	@Autowired
	BookingRepository bookingRepository;
	
	public Booking addBooking(Booking booking) {
	    if (booking.getPassengers() != null) {
	        for (Passenger passenger : booking.getPassengers()) {
	            passenger.setBooking(booking);
	        }
	    }
	    return bookingRepository.save(booking);
	}

	
	public List<Booking> getAllBookings() {
		return bookingRepository.findAll();
	}
	
	public Booking getBookingById(int bid) {
		return bookingRepository.findById(bid).orElse(null);
	}
	
	public Booking updateBooking(int bid, Booking newBooking) {
	    Booking booking = this.getBookingById(bid);
	    if (booking == null) return null; 

//	    if (newBooking.getPassenger() != null) {
//	        booking.setPassenger(newBooking.getPassenger());
//	    }
	    if (newBooking.getTrip() != null) {
	        booking.setTrip(newBooking.getTrip());
	    }
	    if (newBooking.getPaystatus() != null) {
	        booking.setPaystatus(newBooking.getPaystatus());
	    }
	    if (newBooking.getTripstatus() != null) {
	        booking.setTripstatus(newBooking.getTripstatus());
	    }
	    if (newBooking.getNoofpassenger() != 0) {
	        booking.setNoofpassenger(newBooking.getNoofpassenger());
	    }
//	    if (newBooking.getTotalfare() != 0) {
//	        booking.setTotalfare(newBooking.getTotalfare());
//	    }

	    return bookingRepository.save(booking); 
	}


	public String deleteBooking(int bid) {
	    if (!bookingRepository.existsById(bid)) {
	        return "Booking not found!";
	    }
	    bookingRepository.deleteById(bid);
	    return "Booking deleted successfully!";
	}

	public List<Booking> getBookingsByUser(int uid) {
	    return bookingRepository.findByUser_Uid(uid);
	}

}
