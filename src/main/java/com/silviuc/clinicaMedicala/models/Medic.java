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

import com.silviuc.clinicaMedicala.dataTransferObjects.MedicDTO;

@Entity
@Table(name="medics")

public class Medic {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(min=6, max=100)
	private String nume;
	
	@NotBlank
	@Size(min=6, max=10)
	private String codParafa;
	
	@NotBlank
	@Size(min=3, max=50)
	private String specialitate;
	
	@Size(max=100)
	@Email
	private String email;
	
	@NotNull
	private Date dataAngajarii;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	public Medic() {}
	
	public Medic(String nume, String codParafa, String specialitate, String email, Date dataAngajarii) {
		this.nume = nume;
		this.codParafa = codParafa;
		this.specialitate = specialitate;
		this.email = email;
		this.dataAngajarii = dataAngajarii;
	}
	
	public Medic convertToModel(MedicDTO medicDTO
			) {
		Medic entity = new Medic();
		if(medicDTO.getId() != null)
			entity.setId(medicDTO.getId());
		entity.setCodParafa(medicDTO.getCodParafa());
		entity.setNume(medicDTO.getNume());
		entity.setSpecialitate(medicDTO.getSpecialitate());
		entity.setEmail(medicDTO.getEmail());
		entity.setDataAngajarii(medicDTO.getDataAngajarii());
		
		return entity;
	}
	
	public MedicDTO convertToDTO(Medic medic) {
		MedicDTO medicDTO = new MedicDTO();
		if (medic.getId() != null)
			medicDTO.setId(medic.getId());
		medicDTO.setCodParafa(medic.getCodParafa());
		medicDTO.setNume(medic.getNume());
		medicDTO.setSpecialitate(medic.getSpecialitate());
		medicDTO.setEmail(medic.getEmail());
		medicDTO.setDataAngajarii(medic.getDataAngajarii());
		
		return medicDTO;
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

	public String getCodParafa() {
		return codParafa;
	}

	public void setCodParafa(String codParafa) {
		this.codParafa = codParafa;
	}

	public String getSpecialitate() {
		return specialitate;
	}

	public void setSpecialitate(String specialitate) {
		this.specialitate = specialitate;
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
