package com.whoami.Shoppingify.dto.ShoppingListDTO;

import com.whoami.Shoppingify.dto.listItem.ListItemDTO;

import java.time.LocalDateTime;
import java.util.List;

public record ShoppingListRequestDTO(
        String name,
        List<ListItemDTO> items
) {
}
