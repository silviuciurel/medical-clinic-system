package com.silviuc.clinicaMedicala.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.silviuc.clinicaMedicala.dataTransferObjects.ConsultDTO;
import com.silviuc.clinicaMedicala.services.ConsultService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*")
public class ConsultsController {
	private ConsultService consultService;
	
	@Autowired
	public ConsultsController(ConsultService consultService) {
		this.consultService = consultService;
	}
	
	@GetMapping("/medic/consults/{username}")
	@PreAuthorize("hasRole('MEDIC')")
	public List<ConsultDTO> getMedicConsults(@PathVariable String username){
		return consultService.getMedicConsults(username);
	}
	
	
	@PostMapping("/newconsult")
	@PreAuthorize("hasRole('MEDIC') or hasRole ('ADMIN')")
	@ResponseStatus(HttpStatus.CREATED)
	public HttpStatus createConsult(@RequestBody ConsultDTO consultViewModel) {
		consultService.createConsult(consultViewModel);
		return HttpStatus.CREATED;
	}

}
