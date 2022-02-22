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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.silviuc.clinicaMedicala.dataTransferObjects.PacientDTO;
import com.silviuc.clinicaMedicala.services.PacientService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*")
public class PacientsController {
	private PacientService pacientService;

	@Autowired
	public PacientsController(PacientService pacientService) {
		this.pacientService = pacientService;
	}
	
	@GetMapping("/pacients")
	@PreAuthorize("hasRole('RECEPTIONER') or hasRole ('ADMIN')")
	public List<PacientDTO> getPacients(){
		return pacientService.getAllPacients();
	}
	
	@GetMapping("/medic/pacients")
	@PreAuthorize("hasRole('MEDIC') or hasRole ('ADMIN')")
	public List<PacientDTO> getPacientsMedic(){
		return pacientService.getAllPacients();
	}
	
	@GetMapping("/pacient/{id}")
	@PreAuthorize("hasRole('RECEPTIONER') or hasRole ('ADMIN') or hasRole('MEDIC')")
	public PacientDTO getPacient(@PathVariable Long id) {
		return pacientService.getOnePacient(id);
	}
	
	@PostMapping("/newpacient")
	@PreAuthorize("hasRole('RECEPTIONER') or hasRole ('ADMIN')")
	@ResponseStatus(HttpStatus.CREATED)
	public HttpStatus createPacient(@RequestBody PacientDTO pacientDTO) {
		pacientService.createPacient(pacientDTO);
		return HttpStatus.CREATED;
	}
	
	@PutMapping("/editpacient/{id}")
	@PreAuthorize("hasRole('RECEPTIONER') or hasRole ('ADMIN')")
	public void updatePacient(@RequestBody PacientDTO pacientDTO, @PathVariable Long id) {
		pacientService.updatePacient(pacientDTO, id);
	}
	
	@DeleteMapping("/deletepacient/{id}")
	@PreAuthorize("hasRole('RECEPTIONER') or hasRole ('ADMIN')")
	public Map<String, Boolean> deletePacient(@PathVariable Long id){
		pacientService.deletePacient(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("pacient deleted", Boolean.TRUE);
		return response;
	}
}
