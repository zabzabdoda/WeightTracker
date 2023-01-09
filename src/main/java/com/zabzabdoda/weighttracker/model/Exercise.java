package com.zabzabdoda.weighttracker.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Data
public class Exercise implements Comparable<Exercise>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int weight;
    private int reps;
    private int sets;
    private Date date;


    @Override
    public int compareTo(Exercise o) {
        return date.compareTo(o.getDate());
    }
}
