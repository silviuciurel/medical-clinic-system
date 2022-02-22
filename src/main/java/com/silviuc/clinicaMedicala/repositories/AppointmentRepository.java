package com.silviuc.clinicaMedicala.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.silviuc.clinicaMedicala.models.Appointment;
import com.silviuc.clinicaMedicala.models.Consult;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	List<Appointment> findByMedicId(Long id);
}
