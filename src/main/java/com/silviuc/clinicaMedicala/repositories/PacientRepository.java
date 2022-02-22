package com.silviuc.clinicaMedicala.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.silviuc.clinicaMedicala.models.Pacient;

@Repository
public interface PacientRepository extends JpaRepository<Pacient, Long> {

}
