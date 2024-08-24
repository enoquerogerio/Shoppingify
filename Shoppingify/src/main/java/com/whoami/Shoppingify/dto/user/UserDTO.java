package com.whoami.Shoppingify.dto.user;

import java.time.LocalDateTime;

public record UserDTO(
        String id,
        String username,
        String email,
        LocalDateTime createdAt
) {
}
