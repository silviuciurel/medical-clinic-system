package com.silviuc.clinicaMedicala.dataTransferObjects;

import com.silviuc.clinicaMedicala.models.RoleName;

public class RoleDTO {
	private Long id;
	private RoleName name;
	
	public RoleDTO() {}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public RoleName getName() {
		return name;
	}
	public void setName(RoleName name) {
		this.name = name;
	}
	
}
