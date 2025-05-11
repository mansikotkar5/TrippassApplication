package com.project.trippass.trip;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TripService {

	@Autowired
	TripRepository tripRepository;

	public Trip addTrip(Trip trip) {
		return tripRepository.save(trip);
	}

	public List<Trip> getAllTrips() {
		return tripRepository.findAll();
	}

	public Trip getTripById(int tid) {
		return tripRepository.findById(tid).orElse(null);
	}

	public Trip updateTrip(int tid, Trip newtrip) {
		
		Trip trip = this.getTripById(tid);
		
		if (trip == null) return null;
		
		if(newtrip.getTriptype() != null) {
			trip.setTriptype(newtrip.getTriptype());
		}
		if(newtrip.getJourneydate() != null) {
			trip.setJourneydate(newtrip.getJourneydate());
		}
		if(newtrip.getDeparttime() != null) {
			trip.setDeparttime(newtrip.getDeparttime());
		}
		if(newtrip.getSource() != null) {
			trip.setSource(newtrip.getSource());
		}
		if(newtrip.getDestination() != null) {
			trip.setDestination(newtrip.getDestination());
		}
		if(newtrip.getFare() != 0) {
			trip.setFare(newtrip.getFare());
		}
		
		return tripRepository.save(trip);
	}

	public String deleteTrip(int tid) {
	    if (!tripRepository.existsById(tid)) {
	        return "Trip not found!";
	    }
	    tripRepository.deleteById(tid);
	    return "Trip deleted successfully!";
	}

	public List<Trip> getCustomersByName(String searchName) {
		return tripRepository.findByTriptype(searchName);
	}

	public List<Trip> getAllTripsSorted(String sfield) {
	    return tripRepository.findAll(Sort.by(Sort.Direction.DESC, sfield));
	}

	public boolean tripExists(int tid) {
		return tripRepository.existsById(tid);
	}

}
