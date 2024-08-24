package com.whoami.Shoppingify.dto.listItem;

public record ListItemDTO(
        String itemId,
        int quantity,
        boolean isPurchased
) {
}
