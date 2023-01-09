package com.zabzabdoda.weighttracker.dto;

import com.zabzabdoda.weighttracker.model.ExerciseCatergory;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ExerciseCategoryDTO {

    private ExerciseCatergory exerciseCatergory;
    private MultipartFile image;

    public ExerciseCategoryDTO(ExerciseCatergory exerciseCatergory, MultipartFile image) {
        this.exerciseCatergory = exerciseCatergory;
        this.image = image;
    }
}
