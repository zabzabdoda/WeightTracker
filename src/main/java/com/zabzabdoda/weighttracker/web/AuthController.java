package com.zabzabdoda.weighttracker.web;

import com.zabzabdoda.weighttracker.dto.AuthCredentialsRequest;
import com.zabzabdoda.weighttracker.dto.UserDTO;
import com.zabzabdoda.weighttracker.model.User;
import com.zabzabdoda.weighttracker.repositories.UserRepository;
import com.zabzabdoda.weighttracker.util.CustomPasswordEncoder;
import com.zabzabdoda.weighttracker.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody UserDTO user){
        String errorMsg = "";
        System.out.println(user.getPassword());
        System.out.println(user.getConfirmPassword());
        if(!user.getPassword().equals(user.getConfirmPassword())){
            errorMsg = "Passwords do not match!";
        }else if(userRepository.findByUsername(user.getUsername()).isPresent()){
            errorMsg = "User with that name already exists!";
        }else{
            User newUser = new User();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(passwordEncoder.passwordEncoder().encode(user.getPassword()));
            newUser.setCohortStartDate(LocalDate.now());
            userRepository.save(newUser);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(), user.getPassword()
                    )
            );
            User user1 = (User) authentication.getPrincipal();
            user1.setPassword(null);
            return ResponseEntity.ok().header(
                    HttpHeaders.AUTHORIZATION,
                    jwtUtil.generateToken(user1)
            ).body(user1);
        }
        Map<String,Object> map = new HashMap<>();
        map.put("msg",errorMsg);
        return ResponseEntity.status(201).body(new JSONObject(map));

    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(), request.getPassword()
                    )
            );
            User user = (User) authentication.getPrincipal();
            user.setPassword(null);
            return ResponseEntity.ok().header(
                    HttpHeaders.AUTHORIZATION,
                    jwtUtil.generateToken(user)
            ).body(user);
        } catch (BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @GetMapping("validate")
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user){
        try {
            boolean isTokenValid = JWTUtil.validateToken(token, user);
            return ResponseEntity.ok(isTokenValid);
        }catch (ExpiredJwtException ex){
            return ResponseEntity.ok(false);
        }
    }

}
