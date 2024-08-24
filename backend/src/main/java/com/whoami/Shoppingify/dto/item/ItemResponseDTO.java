package com.whoami.Shoppingify.dto.item;

import com.whoami.Shoppingify.domain.item.Item;

import java.util.Optional;

public class ItemResponseDTO {
    ItemDTO item;

    public ItemResponseDTO(Item item){
        this.item = new ItemDTO(item.getId(), item.getName(), item.getNote(), item.getImage_url(), item.getCategory().getName());
    }

    public ItemDTO getItem() {
        return item;
    }
}
