package com.whoami.Shoppingify.controller;

import com.whoami.Shoppingify.domain.user.User;
import com.whoami.Shoppingify.dto.user.UserIdDTO;
import com.whoami.Shoppingify.dto.user.UserRequestDTO;
import com.whoami.Shoppingify.dto.user.UserResponseDTO;
import com.whoami.Shoppingify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userName}")
    public ResponseEntity<Object> findUserByUserName(@PathVariable String userName){
        User user = this.userService.findByUserName(userName);
        if(user !=null){
            return ResponseEntity.ok(new UserResponseDTO(user));
        }
        return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);

    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody UserRequestDTO userRequestDTO){
        boolean user = this.userService.updateUser(id, userRequestDTO);
        if(user){
            return new ResponseEntity<>("User Updated Successfully",HttpStatus.OK);
        }else {
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }
    }

}
