package com.project.trippass.trip;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trips")
public class TripController {

	@Autowired
	TripService tripService;
	
	@PostMapping("/add")
    public ResponseEntity<Trip> addTrip(@RequestBody Trip trip) {
        Trip newTrip = tripService.addTrip(trip);
        return ResponseEntity.ok(newTrip);
    }
    
	@GetMapping("/getall")
    public List<Trip> getAllTrips() {
        return tripService.getAllTrips();
    }
    
    @GetMapping("/getbyid/{tid}") 
    public Trip getById(@PathVariable int tid) { 
    	return tripService.getTripById(tid); 
    }
    
    @PutMapping("/update/{tid}") 
    public Trip update(@PathVariable int tid, @RequestBody Trip trip) {
    	return tripService.updateTrip(tid, trip); 
    }
    
    @DeleteMapping("/delete/{tid}") 
    public ResponseEntity<String> delete(@PathVariable int tid) { 
    	if (!tripService.tripExists(tid)) {
            return new ResponseEntity<>("Trip not found!", HttpStatus.NOT_FOUND);
        }

        String result = tripService.deleteTrip(tid);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
}
