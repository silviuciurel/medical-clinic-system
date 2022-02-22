package com.silviuc.clinicaMedicala.models;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.silviuc.clinicaMedicala.dataTransferObjects.AppointmentDTO;

@Entity
@Table(name="appointments")
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private Timestamp start;
	
	private Timestamp end;
	
	public Appointment() {}

	public Appointment(Timestamp start, Timestamp end) {
		this.start = start;
		this.end = end;
	}
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="medic_id")
	private Medic medic;
	
	@ManyToOne()
	@JoinColumn(name = "pacient_id")
	private Pacient pacient;
	
	public Appointment convertToModel(AppointmentDTO appointmentDTO) {
		Appointment entity = new Appointment();
		if (appointmentDTO.getId() != null)
			entity.setId(appointmentDTO.getId());
		entity.setStart(appointmentDTO.getStart());
		entity.setEnd(appointmentDTO.getEnd());
		
		return entity;
	}
	
	public AppointmentDTO convertToDTO(Appointment appointment) {
		AppointmentDTO appointmentDTO = new AppointmentDTO();
		if (appointment.getId() != null)
			appointmentDTO.setId(appointment.getId());
		appointmentDTO.setStart(appointment.getStart());
		appointmentDTO.setEnd(appointment.getEnd());
		appointmentDTO.setPacient(appointment.getPacient());
		appointmentDTO.setTitle(appointment.getPacient().getNume());
		
		return appointmentDTO;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Medic getMedic() {
		return medic;
	}

	public void setMedic(Medic medic) {
		this.medic = medic;
	}

	public Pacient getPacient() {
		return pacient;
	}

	public void setPacient(Pacient pacient) {
		this.pacient = pacient;
	}

	public Timestamp getStart() {
		return start;
	}

	public void setStart(Timestamp start) {
		this.start = start;
	}

	public Timestamp getEnd() {
		return end;
	}

	public void setEnd(Timestamp end) {
		this.end = end;
	}
}
