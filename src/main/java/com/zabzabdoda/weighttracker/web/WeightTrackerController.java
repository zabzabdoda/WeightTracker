package com.zabzabdoda.weighttracker.web;

import com.zabzabdoda.weighttracker.dto.ExerciseCategoryDTO;
import com.zabzabdoda.weighttracker.dto.ExerciseDTO;
import com.zabzabdoda.weighttracker.model.Exercise;
import com.zabzabdoda.weighttracker.model.ExerciseCatergory;
import com.zabzabdoda.weighttracker.model.User;
import com.zabzabdoda.weighttracker.services.ExerciseCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.multipart.support.MultipartFilter;

import java.io.IOException;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/exercises")
public class WeightTrackerController {

    @Autowired
    private ExerciseCategoryService exerciseCategoryService;

    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipart = new CommonsMultipartResolver();
        multipart.setMaxUploadSize(50000000);
        return multipart;
    }

    @Bean
    @Order(0)
    public MultipartFilter multipartFilter() {
        MultipartFilter multipartFilter = new MultipartFilter();
        multipartFilter.setMultipartResolverBeanName("multipartResolver");
        return multipartFilter;
    }

    @PostMapping(name = "",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createExerciseCategory(@AuthenticationPrincipal User user, @RequestParam(value = "imageFile", required = false) MultipartFile imageFile, @RequestParam("name") String name, @RequestParam("description") String description){
        Set<ExerciseCatergory> newExercise = null;
        try {
            newExercise = exerciseCategoryService.save(user,imageFile,name,description);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        for(ExerciseCatergory ex : newExercise){
            ex.setImage(null);
        }
        return ResponseEntity.ok(newExercise);
    }

    @PostMapping("/{id}/exercise")
    public ResponseEntity<?> createExercise(@AuthenticationPrincipal User user, @PathVariable Long id){
        Exercise newExercise = exerciseCategoryService.save(id);
        return ResponseEntity.ok(newExercise);
    }

    @GetMapping("/new")
    public ResponseEntity<?> getNewExerciseCategory(@AuthenticationPrincipal User user){
        return ResponseEntity.ok(exerciseCategoryService.createNewExercise(user));
    }

    @PostMapping("/{id}/newExercise")
    public ResponseEntity<?> getNewExercise(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestBody Exercise exercise){
        return ResponseEntity.ok(exerciseCategoryService.createNewExercise(user, exercise, id));
    }

    @DeleteMapping("/{id}/exercise")
    public ResponseEntity<?> deleteNewExercise(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestBody Exercise exercise){
        return ResponseEntity.ok(exerciseCategoryService.delete(id,exercise));
    }

    @GetMapping
    public ResponseEntity<?> getExercises(@AuthenticationPrincipal User user){
        Set<ExerciseCatergory> exerciseSet = exerciseCategoryService.getExercises(user);
        for(ExerciseCatergory ex : exerciseSet){
            ex.setImage(null);
        }
        return ResponseEntity.ok(exerciseSet);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExercise(@PathVariable Long id, @AuthenticationPrincipal User user){
        ExerciseCatergory exercise = exerciseCategoryService.getExercise(id);
        return ResponseEntity.ok(exercise);
    }

    @PostMapping(value = "/{id}/edit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> editExerciseCategory(@PathVariable Long id, @RequestParam("name") String name, @RequestParam("description") String description, @AuthenticationPrincipal User user){
        ExerciseCatergory updatedExercise = exerciseCategoryService.update(name,description,id);
        return ResponseEntity.ok(updatedExercise);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> saveExercise(@RequestBody ExerciseCatergory exercise, @AuthenticationPrincipal User user){
        ExerciseCatergory updatedExercise = exerciseCategoryService.save(exercise);
        return ResponseEntity.ok(updatedExercise);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExercise(@PathVariable Long id, @AuthenticationPrincipal User user){
        exerciseCategoryService.delete(id,user);
        return ResponseEntity.ok(200);
    }

}
