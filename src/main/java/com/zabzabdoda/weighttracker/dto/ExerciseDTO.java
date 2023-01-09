package com.zabzabdoda.weighttracker.dto;

import com.zabzabdoda.weighttracker.model.Exercise;
import com.zabzabdoda.weighttracker.model.ExerciseCatergory;

public class ExerciseDTO {

    private Exercise exercise;
    private ExerciseCatergory exerciseCatergory;

    public ExerciseDTO(Exercise exercise, ExerciseCatergory exerciseCatergory) {
        this.exercise = exercise;
        this.exerciseCatergory = exerciseCatergory;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public ExerciseCatergory getExerciseCatergory() {
        return exerciseCatergory;
    }

    public void setExerciseCatergory(ExerciseCatergory exerciseCatergory) {
        this.exerciseCatergory = exerciseCatergory;
    }
}
