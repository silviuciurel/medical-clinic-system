package com.silviuc.clinicaMedicala.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.silviuc.clinicaMedicala.models.Receptioner;

@Repository
public interface ReceptionerRepository extends JpaRepository<Receptioner, Long> {

}
