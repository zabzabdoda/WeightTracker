package com.zabzabdoda.weighttracker.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ExerciseStatusEnum {
    
    PENDING_SUBMISSION("Pending Submission", 0),
    SUBMITTED("Submitted", 1),
    IN_REVIEW("In Review", 2),
    NEEDS_UPDATE("Needs Update", 3),
    COMPLETED("Completed", 4);

    private String status;
    private int step;

    ExerciseStatusEnum(String status, int step) {
        this.status = status;
        this.step = step;
    }

    public int getStep() {
        return step;
    }

    public String getStatus() {
        return status;
    }
}
