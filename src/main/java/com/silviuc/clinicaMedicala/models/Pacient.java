package com.silviuc.clinicaMedicala.models;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.silviuc.clinicaMedicala.dataTransferObjects.PacientDTO;

@Entity
@Table(name="pacients")

public class Pacient {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(min=6, max=100)
	private String nume;
	
	@NotBlank
	@Size(min=13, max=13)
	private String cnp;
	
	@NotNull
	private Date dataNasterii;
	
	@NotBlank
	@Size(min=10, max=15)
	private String telefon;
	
	@NotBlank
	@Size(min=4, max=150)
	private String adresa;
	
	@Email
	@Size(max=100)
	private String email;
	
	public Pacient() {}

	public Pacient(String nume, String cnp, Date dataNasterii, String telefon, String adresa, String email) {
		this.nume = nume;
		this.cnp = cnp;
		this.dataNasterii = dataNasterii;
		this.telefon = telefon;
		this.adresa = adresa;
		this.email = email;
	}
	
	public Pacient convertToModel(PacientDTO pacientDTO) {
		Pacient entity = new Pacient();
		if (pacientDTO.getId() != null)
			entity.setId(pacientDTO.getId());
		entity.setNume(pacientDTO.getNume());
		entity.setCnp(pacientDTO.getCnp());
		entity.setDataNasterii(pacientDTO.getDataNasterii());
		entity.setAdresa(pacientDTO.getAdresa());
		entity.setTelefon(pacientDTO.getTelefon());
		entity.setEmail(pacientDTO.getEmail());
		
		return entity;
	}
	
	public PacientDTO convertToDTO(Pacient pacient) {
		PacientDTO pacientDTO = new PacientDTO();
		if (pacient.getId() != null)
			pacientDTO.setId(pacient.getId());
		pacientDTO.setNume(pacient.getNume());
		pacientDTO.setCnp(pacient.getCnp());
		pacientDTO.setDataNasterii(pacient.getDataNasterii());
		pacientDTO.setAdresa(pacient.getAdresa());
		pacientDTO.setTelefon(pacient.getTelefon());
		pacientDTO.setEmail(pacient.getEmail());
		
		return pacientDTO;
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

	public String getCnp() {
		return cnp;
	}

	public void setCnp(String cnp) {
		this.cnp = cnp;
	}

	public Date getDataNasterii() {
		return dataNasterii;
	}

	public void setDataNasterii(Date dataNasterii) {
		this.dataNasterii = dataNasterii;
	}

	public String getTelefon() {
		return telefon;
	}

	public void setTelefon(String telefon) {
		this.telefon = telefon;
	}

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
}
