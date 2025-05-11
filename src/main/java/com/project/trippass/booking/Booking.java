package com.project.trippass.booking;

import java.util.List;

import com.project.trippass.passenger.Passenger;
import com.project.trippass.trip.Trip;
import com.project.trippass.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bid;
	
	@OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Passenger> passengers;

	@ManyToOne
	@JoinColumn(name = "uid")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "tid")
	private Trip trip;
	
	private String paystatus;
	private String tripstatus;
	private int noofpassenger;
	private int totalfare;
	
	public int getBid() {
		return bid;
	}

	public void setBid(int bid) {
		this.bid = bid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }

	public Trip getTrip() {
		return trip;
	}

	public void setTrip(Trip trip) {
		this.trip = trip;
		this.totalfare = calculateTotalFare();
	}

	public String getPaystatus() {
		return paystatus;
	}

	public void setPaystatus(String paystatus) {
		this.paystatus = paystatus;
	}

	public String getTripstatus() {
		return tripstatus;
	}

	public void setTripstatus(String tripstatus) {
		this.tripstatus = tripstatus;
	}

	public int getNoofpassenger() {
		return noofpassenger;
	}

	public void setNoofpassenger(int noofpassenger) {
		this.noofpassenger = noofpassenger;
		this.totalfare = calculateTotalFare();
	}

	public int getTotalfare() {
		return totalfare;
	}
	
	private int calculateTotalFare() {
        return (trip != null) ? trip.getFare() * noofpassenger : 0;
    }

	public int getUid() {
	    return (user != null) ? user.getUid() : 0;
	}
	
	public void setUid(int uid) {
	    this.user = new User();
	    this.user.setUid(uid);
	}
	
}
