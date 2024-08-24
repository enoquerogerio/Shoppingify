package com.whoami.Shoppingify.controller;


import com.whoami.Shoppingify.domain.user.User;
import com.whoami.Shoppingify.dto.user.ResponseDTO;
import com.whoami.Shoppingify.dto.user.UserIdDTO;
import com.whoami.Shoppingify.dto.user.UserRequestDTO;
import com.whoami.Shoppingify.security.JWTProviderService;
import com.whoami.Shoppingify.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private  final JWTProviderService tokenService;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder, JWTProviderService tokenService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserIdDTO> register(@RequestBody UserRequestDTO body, UriComponentsBuilder uriComponentsBuilder){
        UserIdDTO userIdDTO = this.userService.createUser(body);
        var uri = uriComponentsBuilder.path("/user/{id}").buildAndExpand(userIdDTO.userId()).toUri();
        return ResponseEntity.created(uri).body(userIdDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserRequestDTO body) {
        User user = this.userService.findByEmail(body.email());
        if (user == null) {
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }

        if (this.passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getUsername(), token));
        }
        return ResponseEntity.badRequest().body("Email and Password are incorrect!");
    }
}
