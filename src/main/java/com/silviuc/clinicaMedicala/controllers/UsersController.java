package com.silviuc.clinicaMedicala.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.silviuc.clinicaMedicala.dataTransferObjects.UserDTO;
import com.silviuc.clinicaMedicala.models.User;
import com.silviuc.clinicaMedicala.repositories.RoleRepository;
import com.silviuc.clinicaMedicala.repositories.UserRepository;
import com.silviuc.clinicaMedicala.services.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*")
public class UsersController {
	
	private UserService userService;
	
	@Autowired
	public UsersController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/users")
	@PreAuthorize("hasRole('ADMIN')")
	public List<UserDTO> getUsers(){
		return userService.getAllUsers();
	}
	
	@GetMapping("/user/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public UserDTO getUser(@PathVariable Long id) {
		return userService.getOneUser(id);
	}
	
	@PostMapping("/newuser")
	@PreAuthorize("hasRole('ADMIN')")
	@ResponseStatus(HttpStatus.CREATED)
	public HttpStatus createUser(@RequestBody UserDTO userDTO) {
		userService.createUser(userDTO);
		return HttpStatus.CREATED;
	}
	
	@PutMapping("/edituser/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void updateUser(@RequestBody UserDTO userDTO, @PathVariable Long id) {
		/*return userRepository.findById(id)
				.map(user -> {
					user.setUsername(newUser.getUsername());
					user.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword()));
					return userRepository.save(user);
				})
				.orElseGet(() -> {
					newUser.setId(id);
					return userRepository.save(newUser);
				});*/
		userService.updateUser(userDTO, id);
	}
	
	@DeleteMapping("/deleteuser/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public Map<String, Boolean> deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("user deleted", Boolean.TRUE);
		return response;
	}
	
}
