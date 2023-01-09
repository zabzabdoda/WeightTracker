package com.zabzabdoda.weighttracker.services;

import com.zabzabdoda.weighttracker.dto.ExerciseCategoryDTO;
import com.zabzabdoda.weighttracker.dto.ExerciseDTO;
import com.zabzabdoda.weighttracker.model.Exercise;
import com.zabzabdoda.weighttracker.model.ExerciseCatergory;
import com.zabzabdoda.weighttracker.model.User;
import com.zabzabdoda.weighttracker.repositories.ExerciseCategoryRepository;
import com.zabzabdoda.weighttracker.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ExerciseCategoryService {

    @Autowired
    private ExerciseCategoryRepository exerciseCategoryRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;


    public ExerciseCatergory createNewExercise(User user){
        ExerciseCatergory exercise = new ExerciseCatergory();
        exercise.setCompletedBy(user);
        return exercise;
        //return exerciseCategoryRepository.save(exercise);
    }

    public Set<ExerciseCatergory> getExercises(User user) {
        return exerciseCategoryRepository.findByCompletedBy(user);
    }

    public ExerciseCatergory getExercise(long id) {
        ExerciseCatergory exerciseCatergory = exerciseCategoryRepository.findById(id).get();
        Collections.sort(exerciseCatergory.getExercises());
        Collections.reverse(exerciseCatergory.getExercises());
        return exerciseCatergory;
    }

    public Set<ExerciseCatergory> save(User user, MultipartFile image, String name, String description) throws IOException {
        ExerciseCatergory exerciseCatergory;
        if(image != null){
            exerciseCatergory = new ExerciseCatergory(name,image.getBytes(),description,user);

        }else{
            exerciseCatergory = new ExerciseCatergory(name,null,description,user);
        }
        exerciseCategoryRepository.save(exerciseCatergory);
        return exerciseCategoryRepository.findByCompletedBy(user);
    }

    public ExerciseCatergory save(ExerciseCatergory exercise) {
        ExerciseCatergory exerciseCatergory = exerciseCategoryRepository.findById(exercise.getId()).get();
        exerciseCatergory.setName(exercise.getName());
        exerciseCatergory.setDescription(exercise.getDescription());
        Collections.sort(exerciseCatergory.getExercises());
        Collections.reverse(exerciseCatergory.getExercises());
        return exerciseCategoryRepository.save(exerciseCatergory);
    }

    public ExerciseCatergory update(String name, String description, Long id){
        ExerciseCatergory exerciseCatergory = exerciseCategoryRepository.findById(id).get();
        exerciseCatergory.setName(name);
        exerciseCatergory.setDescription(description);
        return exerciseCategoryRepository.save(exerciseCatergory);
    }

    public Exercise save(Long id){
        Optional<ExerciseCatergory> exerciseCatergory = exerciseCategoryRepository.findById(id);
        if(exerciseCatergory.isPresent()){
            Exercise ex = new Exercise();
            exerciseCatergory.get().getExercises().add(ex);
            exerciseRepository.save(ex);
            exerciseCategoryRepository.save(exerciseCatergory.get());
            return ex;
        }
        return null;
    }

    public void delete(Long id, User user) {
        exerciseCategoryRepository.deleteById(id);
        //return exerciseCategoryRepository.findByCompletedBy(user);
    }

    public ExerciseCatergory createNewExercise(User user, Exercise exercise, Long id) {
        System.out.println(exercise);
        ExerciseCatergory exerciseCatergory = exerciseCategoryRepository.findById(id).get();
        List<Exercise> exs = exerciseCatergory.getExercises();
        for(int i = 0; i < exs.size(); i++){
            if(exs.get(i).getId().equals(exercise.getId())){
                exs.set(i,exercise);
            }
        }
        exerciseRepository.save(exercise);
        exerciseCategoryRepository.save(exerciseCatergory);
        Collections.sort(exerciseCatergory.getExercises());
        Collections.reverse(exerciseCatergory.getExercises());
        return exerciseCatergory;
    }

    public ExerciseCatergory delete(Long id, Exercise exercise) {
        System.out.println(exerciseCategoryRepository.findAll());
        System.out.println(id);
        ExerciseCatergory exerciseCatergory = exerciseCategoryRepository.findById(id).get();

        exerciseCatergory.getExercises().removeIf(x -> x.getId().equals(exercise.getId()));
        exerciseRepository.deleteById(exercise.getId());
        Collections.sort(exerciseCatergory.getExercises());
        Collections.reverse(exerciseCatergory.getExercises());
        return exerciseCatergory;
    }
}
