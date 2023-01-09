package com.zabzabdoda.weighttracker;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class passwordEncoder {

    @Test
    public void encode_Password(){
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("PASSWORD: "+passwordEncoder.encode("test"));
    }

}
