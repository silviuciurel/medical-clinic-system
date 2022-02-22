package com.silviuc.clinicaMedicala.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="diagnostics")
public class Diagnostic {
	@Id
	private Long id;
	
	@NotBlank
	private String denumireBoala;

	public Long getId() {
		return id;
	}

	/*public void setId(Long id) {
		this.id = id;
	}*/

	public String getDenumireBoala() {
		return denumireBoala;
	}

	public void setDenumireBoala(String denumireBoala) {
		this.denumireBoala = denumireBoala;
	}

}
