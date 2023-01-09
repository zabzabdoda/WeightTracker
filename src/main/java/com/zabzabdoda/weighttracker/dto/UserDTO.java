package com.zabzabdoda.weighttracker.dto;

import com.zabzabdoda.weighttracker.model.User;

public class UserDTO {

    private String username;
    private String password;
    private String confirmpassword;

    public UserDTO(String username, String password, String confirmpassword) {
        this.username = username;
        this.password = password;
        this.confirmpassword = confirmpassword;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmpassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmpassword = confirmPassword;
    }
}
