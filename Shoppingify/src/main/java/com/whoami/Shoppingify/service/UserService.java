package com.whoami.Shoppingify.service;

import com.whoami.Shoppingify.domain.user.User;
import com.whoami.Shoppingify.dto.user.UserIdDTO;
import com.whoami.Shoppingify.dto.user.UserRequestDTO;
import com.whoami.Shoppingify.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findByEmail(String email){
        return this.userRepository.findByEmail(email).orElse(null);
    }

    public User findByUserName(String name){
        return this.userRepository.findByUsername(name).orElse(null);
    }

    public UserIdDTO createUser(UserRequestDTO userRequestDTO){
        if (userRepository.findByUsername(userRequestDTO.username()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.findByEmail(userRequestDTO.email()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();

        user.setUsername(userRequestDTO.username());
        user.setEmail(userRequestDTO.email());
        user.setPassword(this.passwordEncoder.encode(userRequestDTO.password()));

        return new UserIdDTO(userRepository.save(user).getId());
    }

    public boolean updateUser(String id, UserRequestDTO userRequestDTO) {
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUsername(userRequestDTO.username());
            user.setEmail(userRequestDTO.email());
            user.setPassword(this.passwordEncoder.encode(userRequestDTO.password()));
            this.userRepository.save(user);
            return true;
        }
        return false;
    }

    public User getCurrentUser(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
}
