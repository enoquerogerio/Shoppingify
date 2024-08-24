package com.whoami.Shoppingify.dto.item;

public record ItemDTO(
        String id,
        String name,
        String note,
        String image_url,
        String categoryName
) {
}
