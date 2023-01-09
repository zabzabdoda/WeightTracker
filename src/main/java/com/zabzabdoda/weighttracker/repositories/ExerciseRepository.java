package com.zabzabdoda.weighttracker.repositories;

import com.zabzabdoda.weighttracker.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}