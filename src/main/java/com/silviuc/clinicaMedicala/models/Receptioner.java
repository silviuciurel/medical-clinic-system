package com.silviuc.clinicaMedicala.models;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.silviuc.clinicaMedicala.dataTransferObjects.ReceptionerDTO;

@Entity
@Table(name="receptioners")

public class Receptioner {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(min=6, max=100)
	private String nume;
	
	@Size(max=100)
	@Email
	private String email;
	
	@NotNull
	private Date dataAngajarii;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	public Receptioner() {}
	
	public Receptioner(String nume, String email, Date dataAngajarii) {
		this.nume = nume;
		this.email = email;
		this.dataAngajarii = dataAngajarii;
	}
	
	public Receptioner convertToModel(ReceptionerDTO receptionerDTO) {
		Receptioner entity = new Receptioner();
		if (receptionerDTO.getId() != null)
			entity.setId(receptionerDTO.getId());
		entity.setNume(receptionerDTO.getNume());
		entity.setEmail(receptionerDTO.getEmail());
		entity.setDataAngajarii(receptionerDTO.getDataAngajarii());
		
		return entity;
	}
	
	public ReceptionerDTO convertToDTO(Receptioner receptioner) {
		ReceptionerDTO receptionerDTO = new ReceptionerDTO();
		if (receptioner.getId() != null)
			receptionerDTO.setId(receptioner.getId());
		receptionerDTO.setNume(receptioner.getNume());
		receptionerDTO.setEmail(receptioner.getEmail());
		receptionerDTO.setDataAngajarii(receptioner.getDataAngajarii());
		
		return receptionerDTO;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNume() {
		return nume;
	}

	public void setNume(String nume) {
		this.nume = nume;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getDataAngajarii() {
		return dataAngajarii;
	}

	public void setDataAngajarii(Date dataAngajarii) {
		this.dataAngajarii = dataAngajarii;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
