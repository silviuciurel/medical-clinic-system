package com.silviuc.clinicaMedicala.models;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.silviuc.clinicaMedicala.dataTransferObjects.ConsultDTO;

@Entity
@Table(name="consults")
public class Consult {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private Date dataConsult;
	
	@NotBlank
	@Size(max=1000)
	private String anamneza;
	
	public Consult() {}
	
	public Consult(Date dataConsult, String anamneza) {
		this.dataConsult = dataConsult;
		this.anamneza = anamneza;
	}
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "medic_id")
	private Medic medic;
	
	@ManyToOne()
	@JoinColumn(name = "pacient_id")
	private Pacient pacient;
	
	@OneToOne
	@JoinColumn(name = "diagnostic_id")
	private Diagnostic diagnostic;
	
	public Consult convertToModel(ConsultDTO consultDTO) {
		Consult entity = new Consult();
		if(consultDTO.getId() != null)
			entity.setId(consultDTO.getId());
		entity.setDataConsult(consultDTO.getDataConsult());
		entity.setAnamneza(consultDTO.getAnamneza());
		entity.setDiagnostic(consultDTO.getDiagnostic());
		return entity;
	}
	
	public ConsultDTO convertToDTO(Consult consult) {
		ConsultDTO consultDTO = new ConsultDTO();
		if(consult.getId() != null)
			consultDTO.setId(consult.getId());
		consultDTO.setDataConsult(consult.getDataConsult());
		consultDTO.setAnamneza(consult.getAnamneza());
		consultDTO.setDiagnostic(consult.getDiagnostic());
		consultDTO.setPacientId(consult.getPacient().getId().toString());
		consultDTO.setPacient(consult.getPacient());
		
		return consultDTO;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDataConsult() {
		return dataConsult;
	}

	public void setDataConsult(Date dataConsult) {
		this.dataConsult = dataConsult;
	}

	public String getAnamneza() {
		return anamneza;
	}

	public void setAnamneza(String anamneza) {
		this.anamneza = anamneza;
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

	public Diagnostic getDiagnostic() {
		return diagnostic;
	}

	public void setDiagnostic(Diagnostic diagnostic) {
		this.diagnostic = diagnostic;
	}
	
}
