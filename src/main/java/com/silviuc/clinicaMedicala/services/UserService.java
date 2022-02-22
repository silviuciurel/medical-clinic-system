package com.silviuc.clinicaMedicala.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.silviuc.clinicaMedicala.dataTransferObjects.UserDTO;
import com.silviuc.clinicaMedicala.models.Role;
import com.silviuc.clinicaMedicala.models.RoleName;
import com.silviuc.clinicaMedicala.models.User;
import com.silviuc.clinicaMedicala.repositories.RoleRepository;
import com.silviuc.clinicaMedicala.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public List<UserDTO> getAllUsers(){
		List<UserDTO> users = new ArrayList<>();
		userRepository.findAll().forEach(user -> users.add(user.convertToDTO(user)));
		return users;
	}
	
	public UserDTO getOneUser(Long id) {
		User user = userRepository.getOne(id);
		if (user != null)
			return user.convertToDTO(user);
		else
			return null;
	}
	
	
	public void createUser(UserDTO userDTO) {
		
		User entity = new User().convertToModel(userDTO);
		
		/*User entity = new User();
		if(userViewModel.getId() != null)
			entity.setId(userViewModel.getId());
		entity.setUsername(userViewModel.getUsername());
		entity.setPassword(new BCryptPasswordEncoder().encode(userViewModel.getPassword()));*/
		
		Set<Role> roles = new HashSet<>(); 
		
		switch(userDTO.getRole()) {
		case "ROLE_ADMIN":
			Role admRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found."));;
			roles.add(admRole);
			break;
		case "ROLE_MEDIC":
			Role medRole = roleRepository.findByName(RoleName.ROLE_MEDIC)
					.orElseThrow(() -> new RuntimeException("Fail! -> Cause: Medic Role not found."));;
			roles.add(medRole);
			break;
		case "ROLE_RECEPTIONER":
			Role recRole = roleRepository.findByName(RoleName.ROLE_RECEPTIONER)
					.orElseThrow(() -> new RuntimeException("Fail! -> Cause: Receptioner Role not found."));;
			roles.add(recRole);
			break;
		}
		
		entity.setRoles(roles);
		
		userRepository.save(entity);
	}
	
	public User updateUser(UserDTO userDTO, Long id) {
		User entity = new User().convertToModel(userDTO);
		
		return userRepository.findById(id)
				.map(user -> {
					user.setUsername(entity.getUsername());
					user.setPassword(entity.getPassword());
					return userRepository.save(user);
				})
				.orElseGet(() -> {
					entity.setId(id);
					return userRepository.save(entity);
				});
	}
	
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}
}
