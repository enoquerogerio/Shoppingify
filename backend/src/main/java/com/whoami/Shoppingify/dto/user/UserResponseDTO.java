package com.whoami.Shoppingify.dto.user;

import com.whoami.Shoppingify.domain.user.User;

public class UserResponseDTO {
    UserDTO user;

    public UserResponseDTO(User user){
        this.user = new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getCreatedAt());
    }

    public UserDTO getUser() {
        return user;
    }
}
