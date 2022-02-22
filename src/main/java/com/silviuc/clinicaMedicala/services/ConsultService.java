package com.silviuc.clinicaMedicala.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.silviuc.clinicaMedicala.dataTransferObjects.ConsultDTO;
import com.silviuc.clinicaMedicala.models.Consult;
import com.silviuc.clinicaMedicala.models.Medic;
import com.silviuc.clinicaMedicala.models.Pacient;
import com.silviuc.clinicaMedicala.models.User;
import com.silviuc.clinicaMedicala.repositories.ConsultRepository;
import com.silviuc.clinicaMedicala.repositories.MedicRepository;
import com.silviuc.clinicaMedicala.repositories.PacientRepository;
import com.silviuc.clinicaMedicala.repositories.UserRepository;

@Service
public class ConsultService {
	@Autowired
	private ConsultRepository consultRepository;
	
	@Autowired
	private MedicRepository medicRepository;
	
	@Autowired
	private PacientRepository pacientRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	public ConsultService(ConsultRepository consultRepository, MedicRepository medicRepository,
			PacientRepository pacientRepository, UserRepository userRepository) {
		this.consultRepository = consultRepository;
		this.medicRepository = medicRepository;
		this.pacientRepository = pacientRepository;
		this.userRepository = userRepository;
	}
	
	public List<ConsultDTO> getAllConsults(){
		List<ConsultDTO> consults = new ArrayList<>();
		consultRepository.findAll().forEach(consult -> consults.add(consult.convertToDTO(consult)));
		return consults;
	}
	
	public List<ConsultDTO> getMedicConsults(String username){
		List<ConsultDTO> consults = new ArrayList<>();
		
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: username not found"));;
				
		Medic medic = medicRepository.findByUserId(user.getId())
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: username not found"));;
				
		consultRepository.findByMedicId(medic.getId()).forEach(consult -> consults.add(consult.convertToDTO(consult)));;
		
		return consults;
	}

	public void createConsult(ConsultDTO consultViewModel) {
		Consult entity = new Consult().convertToModel(consultViewModel);
		
		User user = userRepository.findByUsername(consultViewModel.getMedicUsername())
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: username not found"));;
		
		Medic medic = medicRepository.findByUserId(user.getId())
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: username not found"));;
				
		entity.setMedic(medic);
		
		Pacient pacient = pacientRepository.findById(Long.parseLong(consultViewModel.getPacientId()))
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: pacient not found"));
		
		entity.setPacient(pacient);
		
		consultRepository.save(entity);
	}

}
