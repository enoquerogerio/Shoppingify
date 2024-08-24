package com.whoami.Shoppingify.dto.ShoppingListDTO;

import com.whoami.Shoppingify.domain.listItem.ListItem;

import java.time.LocalDateTime;
import java.util.List;

public record ShoppingListDTO(
        String id,
        String name,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<ListItem> items
) {
}
