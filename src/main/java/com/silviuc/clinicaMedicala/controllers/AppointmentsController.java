package com.silviuc.clinicaMedicala.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.silviuc.clinicaMedicala.dataTransferObjects.AppointmentDTO;
import com.silviuc.clinicaMedicala.services.AppointmentService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*")
public class AppointmentsController {
	private AppointmentService appointmentService;

	@Autowired
	public AppointmentsController(AppointmentService appointmentService) {
		this.appointmentService = appointmentService;
	}
	
	@GetMapping("/appointments/{id}")
	public List<AppointmentDTO> getAppointmentsMedic(@PathVariable Long id){
		return appointmentService.getAppointmentsMedic(id);
	}
	
	@GetMapping("/appointment/{username}")
	public List<AppointmentDTO> getAppointmentsMedicUsername(@PathVariable String username){
		return appointmentService.getAppointmentsMedicUsername(username);
	}
	
	@PostMapping("/newappointment")
	@PreAuthorize("hasRole('RECEPTIONER') or hasRole ('ADMIN')")
	@ResponseStatus(HttpStatus.CREATED)
	public HttpStatus createAppointment(@RequestBody AppointmentDTO appointmentViewModel) {
		appointmentService.CreateAppointment(appointmentViewModel);
		return HttpStatus.CREATED;
	}
	
	@DeleteMapping("/deleteappointment/{id}")
	@PreAuthorize("hasRole('RECEPTIONER') or hasRole ('ADMIN')")
	public Map<String, Boolean> deletePacient(@PathVariable Long id){
		appointmentService.deleteAppointment(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("appointment deleted", Boolean.TRUE);
		return response;
	}

}
