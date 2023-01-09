package com.zabzabdoda.weighttracker.repositories;

import com.zabzabdoda.weighttracker.model.Exercise;
import com.zabzabdoda.weighttracker.model.ExerciseCatergory;
import com.zabzabdoda.weighttracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ExerciseCategoryRepository extends JpaRepository<ExerciseCatergory,Long> {

    Set<ExerciseCatergory> findByCompletedBy(User user);

}
