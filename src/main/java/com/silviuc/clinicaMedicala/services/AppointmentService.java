package com.silviuc.clinicaMedicala.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.silviuc.clinicaMedicala.dataTransferObjects.AppointmentDTO;
import com.silviuc.clinicaMedicala.models.Appointment;
import com.silviuc.clinicaMedicala.models.Medic;
import com.silviuc.clinicaMedicala.models.Pacient;
import com.silviuc.clinicaMedicala.models.User;
import com.silviuc.clinicaMedicala.repositories.AppointmentRepository;
import com.silviuc.clinicaMedicala.repositories.MedicRepository;
import com.silviuc.clinicaMedicala.repositories.PacientRepository;
import com.silviuc.clinicaMedicala.repositories.UserRepository;

@Service
public class AppointmentService {
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private MedicRepository medicRepository;
	
	@Autowired
	private PacientRepository pacientRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	public AppointmentService(AppointmentRepository appointmentRepository, MedicRepository medicRepository,
			PacientRepository pacientRepository, UserRepository userRepository) {
		this.appointmentRepository = appointmentRepository;
		this.medicRepository = medicRepository;
		this.pacientRepository = pacientRepository;
		this.userRepository = userRepository;
	}
	
	public List<AppointmentDTO> getAppointmentsMedic(Long id){
		List<AppointmentDTO> appointments = new ArrayList<>();
		
		appointmentRepository.findByMedicId(id).forEach(appointment -> appointments.add(appointment.convertToDTO(appointment)));
		
		return appointments;
	}
	
	public List<AppointmentDTO> getAppointmentsMedicUsername(String username){
		List<AppointmentDTO> appointments = new ArrayList<>();
		
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: username not found"));;
				
		Medic medic = medicRepository.findByUserId(user.getId())
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: username not found"));;
		
		appointmentRepository.findByMedicId(medic.getId()).forEach(appointment -> appointments.add(appointment.convertToDTO(appointment)));
		
		return appointments;
	}
	
	public void CreateAppointment(AppointmentDTO appointmentViewModel) {
		Appointment entity = new Appointment().convertToModel(appointmentViewModel);
		
		Pacient pacient = pacientRepository.findById(Long.parseLong(appointmentViewModel.getPacientId()))
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: pacient not found"));
		entity.setPacient(pacient);
		
		Medic medic = medicRepository.findById(Long.parseLong(appointmentViewModel.getMedicId()))
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: medic not found"));
		entity.setMedic(medic);
		
		appointmentRepository.save(entity);
	}
	
	public void deleteAppointment(Long id) {
		appointmentRepository.deleteById(id);
	}
}
