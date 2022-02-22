package com.silviuc.clinicaMedicala.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.silviuc.clinicaMedicala.dataTransferObjects.ReceptionerDTO;
import com.silviuc.clinicaMedicala.models.Receptioner;
import com.silviuc.clinicaMedicala.models.User;
import com.silviuc.clinicaMedicala.repositories.ReceptionerRepository;
import com.silviuc.clinicaMedicala.repositories.UserRepository;

@Service
public class ReceptionerService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ReceptionerRepository receptionerRepository;

	@Autowired
	public ReceptionerService(UserRepository userRepository, ReceptionerRepository receptionerRepository) {
		this.userRepository = userRepository;
		this.receptionerRepository = receptionerRepository;
	}
	
	public List<ReceptionerDTO> getAllReceptioners(){
		List<ReceptionerDTO> receptioners = new ArrayList<>();
		receptionerRepository.findAll().forEach(receptioner -> receptioners.add(receptioner.convertToDTO(receptioner)));
		return receptioners;
	}
	
	public ReceptionerDTO getOneReceptioner(Long id) {
		Receptioner receptioner = receptionerRepository.getOne(id);
		if (receptioner != null)
			return receptioner.convertToDTO(receptioner);
		else
			return null;
	}
	
	public void createReceptioner(ReceptionerDTO receptionerDTO) {
		Receptioner entity = new Receptioner().convertToModel(receptionerDTO);
		
		User user = userRepository.findByUsername(receptionerDTO.getUsername())
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: username not found"));;
		
		entity.setUser(user);
		
		receptionerRepository.save(entity);
	}
	
	public Receptioner updateReceptioner(ReceptionerDTO receptionerDTO, Long id) {
		Receptioner entity = new Receptioner().convertToModel(receptionerDTO);
		
		return receptionerRepository.findById(id)
				.map(receptioner -> {
					receptioner.setNume(entity.getNume());
					receptioner.setEmail(entity.getEmail());
					receptioner.setDataAngajarii(entity.getDataAngajarii());
					return receptionerRepository.save(receptioner);
				})
				.orElseGet(() -> {
					entity.setId(id);
					return receptionerRepository.save(entity);
				});				
	}
	

}
