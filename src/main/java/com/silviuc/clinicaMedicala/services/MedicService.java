package com.silviuc.clinicaMedicala.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.silviuc.clinicaMedicala.dataTransferObjects.MedicDTO;
import com.silviuc.clinicaMedicala.models.Medic;
import com.silviuc.clinicaMedicala.models.User;
import com.silviuc.clinicaMedicala.repositories.MedicRepository;
import com.silviuc.clinicaMedicala.repositories.UserRepository;

@Service
public class MedicService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MedicRepository medicRepository;

	@Autowired
	public MedicService(UserRepository userRepository, MedicRepository medicRepository) {
		super();
		this.userRepository = userRepository;
		this.medicRepository = medicRepository;
	}
	
	public List<MedicDTO> getAllMedics(){
		List<MedicDTO> medics = new ArrayList<>();
		medicRepository.findAll().forEach(medic -> medics.add(medic.convertToDTO(medic)));
		return medics;
	}
	
	public MedicDTO getOneMedic(Long id) {
		Medic medic = medicRepository.getOne(id);
		if (medic != null)
			return medic.convertToDTO(medic);
		else
			return null;
	}
	
	public void createMedic(MedicDTO medicViewModel) {
		Medic entity = new Medic().convertToModel(medicViewModel);
		
		User user = userRepository.findByUsername(medicViewModel.getUsername())
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: username not found"));;
		
		entity.setUser(user);
		
		medicRepository.save(entity); 
	}
	
	public Medic updateMedic(MedicDTO medicViewModel, Long id) {
		Medic entity = new Medic().convertToModel(medicViewModel);
		
		return medicRepository.findById(id)
				.map(medic -> {
					medic.setNume(entity.getNume());
					medic.setCodParafa(entity.getCodParafa());
					medic.setSpecialitate(entity.getSpecialitate());
					medic.setEmail(entity.getEmail());
					medic.setDataAngajarii(entity.getDataAngajarii());
					return medicRepository.save(medic);
				})
				.orElseGet(() -> {
					entity.setId(id);
					return medicRepository.save(entity);
				});
	}

}
