package com.silviuc.clinicaMedicala.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.silviuc.clinicaMedicala.dataTransferObjects.MedicDTO;
import com.silviuc.clinicaMedicala.services.MedicService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*")
public class MedicsController {
	private MedicService medicService;

	@Autowired
	public MedicsController(MedicService medicService) {
		this.medicService = medicService;
	}
	
	@GetMapping("/admin/medics")
	@PreAuthorize("hasRole('ADMIN') or hasRole('RECEPTIONER')")
	public List<MedicDTO> getMedics(){
		return medicService.getAllMedics();
	}
	
	@GetMapping("/medic/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public MedicDTO getMedic(@PathVariable Long id) {
		return medicService.getOneMedic(id);
	}
	
	@PostMapping("/user/medic")
	@PreAuthorize("hasRole('ADMIN')")
	@ResponseStatus(HttpStatus.CREATED)
	public HttpStatus createMedic(@RequestBody MedicDTO medicViewModel) {
		medicService.createMedic(medicViewModel);
		return HttpStatus.CREATED;
	}

	@PutMapping("/editmedic/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void updateMedic(@RequestBody MedicDTO medicViewModel, @PathVariable Long id) {
		medicService.updateMedic(medicViewModel, id);
	}
	

}
