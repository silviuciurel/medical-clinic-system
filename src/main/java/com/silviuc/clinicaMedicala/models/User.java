package com.silviuc.clinicaMedicala.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.silviuc.clinicaMedicala.dataTransferObjects.UserDTO;

@Entity
@Table(name="users", uniqueConstraints = {
		@UniqueConstraint(columnNames = {"username"})
})

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(min=3, max=50)
	private String username;
	
	@NotBlank
	@Size(min=6, max=100)
	private String password;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles",
			joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	private Set<Role> roles = new HashSet<>();
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Medic medic;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Receptioner receptioner;
	
	public User() {}
	
	public User(String username, String password)
	{
		this.username = username;
		this.password = password;	
	}
	
	public User(Long id, String username, String password)
	{
		this.id = id;
		this.username = username;
		this.password = password;	
	}
	
	public User convertToModel(UserDTO userDTO) {
		User entity = new User();
		if(userDTO.getId() != null)
			entity.setId(userDTO.getId());
		entity.setUsername(userDTO.getUsername());
		entity.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
		
		return entity;
	}
	
	public UserDTO convertToDTO(User user) {
		UserDTO userDTO = new UserDTO();
		if (user.getId() != null)
			userDTO.setId(user.getId());
		userDTO.setUsername(user.getUsername());
		userDTO.setPassword(user.getPassword());
		
		Set<Role> roles = user.getRoles();
		
		Role role = roles.stream().findFirst().get();
		
		userDTO.setRole(role.getName().toString());
		
		return userDTO;
	}

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public Set<Role> getRoles(){
		return roles;
	}
	
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Medic getMedic() {
		return medic;
	}

	public void setMedic(Medic medic) {
		this.medic = medic;
	}
	
}
	
	
