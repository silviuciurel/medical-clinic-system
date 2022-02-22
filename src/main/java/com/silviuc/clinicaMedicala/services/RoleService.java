package com.silviuc.clinicaMedicala.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.silviuc.clinicaMedicala.dataTransferObjects.RoleDTO;
import com.silviuc.clinicaMedicala.models.Role;
import com.silviuc.clinicaMedicala.repositories.RoleRepository;

@Service
public class RoleService {
	
	private RoleRepository roleRepository;

	@Autowired
	public RoleService(RoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}
	
	public List<RoleDTO> getAllRoles(){
		List<RoleDTO> roles = new ArrayList<>();
		roleRepository.findAll().forEach(role -> roles.add(role.convertToDTO(role)));
		return roles;
	}
	
	public RoleDTO getOneRole(Long id) {
		Role role = roleRepository.getOne(id);
		if (role != null)
			return role.convertToDTO(role);
		else
			return null;
	}
	
	public void createRole(RoleDTO roleDTO) {
		Role role = new Role().convertToModel(roleDTO);
		roleRepository.save(role);
	}
	
	public void deleteRole(Long id) {
		roleRepository.deleteById(id);
	}
}
