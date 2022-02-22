package com.silviuc.clinicaMedicala.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.silviuc.clinicaMedicala.models.Diagnostic;
import com.silviuc.clinicaMedicala.repositories.DiagnosticRepository;

@Service
public class DiagnosticService {
	@Autowired
	private DiagnosticRepository diagnosticRepository;
	
	@Autowired
	public DiagnosticService(DiagnosticRepository diagnosticRepository) {
		this.diagnosticRepository = diagnosticRepository;
	}
	
	public List<Diagnostic> getAllDiagnostics(){
		List<Diagnostic> diagnostics = new ArrayList<>();
		diagnosticRepository.findAll().forEach(diagnostic -> diagnostics.add(diagnostic));
		return diagnostics;
	}
	
}
