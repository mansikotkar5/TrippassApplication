package com.project.trippass.trip;

import java.sql.Time;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Trip {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int tid;
	
	private String triptype;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd") 
	private Date journeydate;
	
	@Temporal(TemporalType.TIME) 
    @DateTimeFormat(pattern = "HH:mm") 
	private Time departtime;
	
	private String source;
	private String destination;
	private int fare;
	
	public int getTid() {
		return tid;
	}
	public void setTid(int tid) {
		this.tid = tid;
	}
	public String getTriptype() {
		return triptype;
	}
	public void setTriptype(String triptype) {
		this.triptype = triptype;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public int getFare() {
		return fare;
	}
	public void setFare(int fare) {
		this.fare = fare;
	}
	public Date getJourneydate() {
		return journeydate;
	}
	public void setJourneydate(Date journeydate) {
		this.journeydate = journeydate;
	}
	public Time getDeparttime() {
		return departtime;
	}
	public void setDeparttime(Time departtime) {
		this.departtime = departtime;
	}
	
}
