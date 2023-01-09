package com.zabzabdoda.weighttracker.services;

import com.zabzabdoda.weighttracker.model.User;
import com.zabzabdoda.weighttracker.repositories.UserRepository;
import com.zabzabdoda.weighttracker.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService{

    @Autowired
    private CustomPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElseThrow(() -> new UsernameNotFoundException("Invalid Credentials"));

        /*User user = new User();
        user.setUsername("zab");
        user.setPassword(passwordEncoder.passwordEncoder().encode("test"));
        user.setId(1L);
        return user;*/
    }

}
