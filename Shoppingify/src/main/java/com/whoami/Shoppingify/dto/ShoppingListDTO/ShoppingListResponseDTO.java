package com.whoami.Shoppingify.dto.ShoppingListDTO;

import com.whoami.Shoppingify.domain.shoppingList.ShoppingList;

public class ShoppingListResponseDTO{
    ShoppingListDTO shoppingList;

    public ShoppingListResponseDTO(ShoppingList shoppingList){
        this.shoppingList = new ShoppingListDTO(shoppingList.getId(), shoppingList.getName(), shoppingList.getStatus().toString(), shoppingList.getCreatedAt(), shoppingList.getUpdatedAt(), shoppingList.getItems());
    }

    public ShoppingListDTO getShoppingList() {
        return shoppingList;
    }
}
