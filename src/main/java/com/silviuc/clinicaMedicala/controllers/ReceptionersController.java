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

import com.silviuc.clinicaMedicala.dataTransferObjects.ReceptionerDTO;
import com.silviuc.clinicaMedicala.services.ReceptionerService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ReceptionersController {
	private ReceptionerService receptionerService;

	@Autowired
	public ReceptionersController(ReceptionerService receptionerService) {
		this.receptionerService = receptionerService;
	}
	
	@GetMapping("/admin/receptioners")
	@PreAuthorize("hasRole('ADMIN')")
	public List<ReceptionerDTO> getReceptioners(){
		return receptionerService.getAllReceptioners();
	}
	
	@GetMapping("/receptioner/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ReceptionerDTO getReceptioner(@PathVariable Long id) {
		return receptionerService.getOneReceptioner(id);
	}
	
	@PostMapping("/user/receptioner")
	@PreAuthorize("hasRole('ADMIN')")
	@ResponseStatus(HttpStatus.CREATED)
	public HttpStatus createReceptioner(@RequestBody ReceptionerDTO receptionerDTO) {
		receptionerService.createReceptioner(receptionerDTO);
		return HttpStatus.CREATED;
	}
	
	@PutMapping("editreceptioner/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void updateReceptioner(@RequestBody ReceptionerDTO receptionerDTO, @PathVariable Long id) {
		receptionerService.updateReceptioner(receptionerDTO, id);
	}
}
