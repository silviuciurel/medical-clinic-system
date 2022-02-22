package com.silviuc.clinicaMedicala.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.silviuc.clinicaMedicala.models.Diagnostic;
import com.silviuc.clinicaMedicala.services.DiagnosticService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*")
public class DiagnosticsController {
	private DiagnosticService diagnosticService;
	
	@Autowired
	public DiagnosticsController(DiagnosticService diagnosticService) {
		this.diagnosticService = diagnosticService;
	}
	
	@GetMapping("/diagnostics")
	public List<Diagnostic> getDiagnostics(){
		return diagnosticService.getAllDiagnostics();
	}
	
}
