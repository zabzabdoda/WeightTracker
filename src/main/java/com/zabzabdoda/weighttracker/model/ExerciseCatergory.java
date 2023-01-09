package com.zabzabdoda.weighttracker.model;

import lombok.Data;
import org.hibernate.annotations.Cascade;
import org.hibernate.type.ImageType;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class ExerciseCatergory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ElementCollection
    @OneToMany(orphanRemoval = true)
    private List<Exercise> exercises;

    @Lob
    private byte[] image;

    private String description;

    @ManyToOne
    private User completedBy;

    public ExerciseCatergory(){
        this.name = "";
        this.description = "";
        this.image = null;
        this.completedBy = null;
        this.exercises = new ArrayList<>();
    }

    public ExerciseCatergory(String name, byte[] image, String description, User completedBy) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.completedBy = completedBy;
        this.exercises = new ArrayList<>();
    }
}
