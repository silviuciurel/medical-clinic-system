package com.silviuc.clinicaMedicala.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.silviuc.clinicaMedicala.models.Medic;

@Repository
public interface MedicRepository extends JpaRepository<Medic, Long> {
	Optional<Medic> findByUserId(Long id);
}
