package com.whoami.Shoppingify.dto.item;

public record ItemRequestDTO(
        String name,
        String note,
        String image_url,
        String categoryName
) {
}
