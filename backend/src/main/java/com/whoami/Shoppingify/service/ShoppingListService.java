package com.whoami.Shoppingify.service;

import com.whoami.Shoppingify.domain.item.Item;
import com.whoami.Shoppingify.domain.listItem.ListItem;
import com.whoami.Shoppingify.domain.shoppingList.ShoppingList;
import com.whoami.Shoppingify.domain.user.User;
import com.whoami.Shoppingify.dto.ShoppingListDTO.*;
import com.whoami.Shoppingify.dto.listItem.ListItemDTO;
import com.whoami.Shoppingify.repositories.ItemRepository;
import com.whoami.Shoppingify.repositories.ListItemRepository;
import com.whoami.Shoppingify.repositories.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShoppingListService {
    private final ShoppingListRepository shoppingListRepository;
    private final ItemRepository itemRepository;
    private final UserService userService;
    private final ListItemRepository listItemRepository;

    @Autowired
    public ShoppingListService(ShoppingListRepository shoppingListRepository, ItemRepository itemRepository, ListItemRepository listItemRepository, UserService userService) {
        this.shoppingListRepository = shoppingListRepository;
        this.itemRepository = itemRepository;
        this.listItemRepository = listItemRepository;
        this.userService = userService;
    }

    public ShoppingListIdDTO createOrUpdateList(ShoppingListRequestDTO newShoppingList, Authentication authentication) {
        User user = this.userService.getCurrentUser(authentication);

        ShoppingList shoppingList = this.shoppingListRepository.findByUserAndStatus(user, ShoppingList.ListStatus.ACTIVE)
                .orElseGet(() -> {
                    ShoppingList newList = new ShoppingList();
                    newList.setStatus(ShoppingList.ListStatus.ACTIVE);
                    newList.setCreatedAt(LocalDateTime.now());
                    newList.setUser(user);
                    newList.setItems(new ArrayList<>());
                    return newList;
                });

        shoppingList.setName(newShoppingList.name());
        shoppingList.setUpdatedAt(LocalDateTime.now());

        for(ListItemDTO itemDTO: newShoppingList.items()){
            ListItem listItem = shoppingList.getItems().stream()
                    .filter(item -> item.getItem().getId().equals(itemDTO.itemId()))
                    .findFirst()
                    .orElseGet(() ->{
                        ListItem newItem = new ListItem();
                        Item item = this.itemRepository.findById(itemDTO.itemId())
                                .orElseThrow(() -> new IllegalArgumentException("Invalid item ID"));

                        newItem.setItem(item);
                        newItem.setShoppingList(shoppingList);
                        shoppingList.getItems().add(newItem);
                        return newItem;
                    });
            listItem.setQuantity(itemDTO.quantity());
            listItem.setPurchased(itemDTO.isPurchased());
        }

        return new ShoppingListIdDTO(this.shoppingListRepository.save(shoppingList).getId()) ;
    }


    @Transactional(readOnly = true)
    public ShoppingList getActiveList(Authentication authentication) {
        User user = this.userService.getCurrentUser(authentication);

        return shoppingListRepository.findByUserAndStatus(user, ShoppingList.ListStatus.ACTIVE)
                .orElseThrow(() -> new IllegalStateException("No active shopping list found"));
    }

    @Transactional(readOnly = true)
    public List<ShoppingList> getShoppingHistory(Authentication authentication) {
        User user = this.userService.getCurrentUser(authentication);

        return shoppingListRepository.findByUserAndStatusNot(user, ShoppingList.ListStatus.ACTIVE);
    }

    @Transactional
    public ShoppingList completeList(String listId, Authentication authentication) {
        ShoppingList shoppingList = getShoppingListForUser(listId, authentication);
        shoppingList.setStatus(ShoppingList.ListStatus.COMPLETED);
        shoppingList.setUpdatedAt(LocalDateTime.now());
        return shoppingListRepository.save(shoppingList);
    }

    @Transactional
    public ShoppingList cancelList(String listId, Authentication authentication) {
        ShoppingList shoppingList = getShoppingListForUser(listId, authentication);
        shoppingList.setStatus(ShoppingList.ListStatus.CANCELLED);
        shoppingList.setUpdatedAt(LocalDateTime.now());
        return shoppingListRepository.save(shoppingList);
    }

    @Transactional
    public ShoppingList toggleItemCompletion(String listId, String itemId, Authentication authentication) {
        ShoppingList shoppingList = getShoppingListForUser(listId, authentication);
        ListItem listItem = shoppingList.getItems().stream()
                .filter(item -> item.getItem().getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Item not found in the shopping list"));

        listItem.setPurchased(!listItem.isPurchased());
        this.listItemRepository.save(listItem);
        return shoppingList;
    }

    @Transactional
    public ShoppingList addItemToList(String listId, String itemId, int quantity, Authentication authentication) {
        ShoppingList shoppingList = getShoppingListForUser(listId, authentication);
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid item ID"));

        ListItem shoppingListItem = shoppingList.getItems().stream()
                .filter(listItem -> listItem.getItem().getId().equals(itemId))
                .findFirst()
                .orElseGet(() -> {
                    ListItem newItem = new ListItem();
                    newItem.setItem(item);
                    newItem.setShoppingList(shoppingList);
                    shoppingList.getItems().add(newItem);
                    return newItem;
                });

        shoppingListItem.setQuantity(shoppingListItem.getQuantity() + quantity);
        this.listItemRepository.save(shoppingListItem);
        return shoppingList;
    }

    @Transactional
    public ShoppingList removeItemFromList(String listId, String itemId, Authentication authentication) {
        ShoppingList shoppingList = getShoppingListForUser(listId, authentication);
        shoppingList.getItems().removeIf(item -> item.getItem().getId().equals(itemId));
        return shoppingListRepository.save(shoppingList);
    }

    @Transactional
    public ShoppingList updateItemQuantity(String listId, String itemId, int quantity, Authentication authentication) {
        ShoppingList shoppingList = getShoppingListForUser(listId, authentication);
        ListItem listItem = shoppingList.getItems().stream()
                .filter(item -> item.getItem().getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Item not found in the shopping list"));

        listItem.setQuantity(quantity);
        this.listItemRepository.save(listItem);
        return shoppingList;
    }

    private ShoppingList getShoppingListForUser(String listId, Authentication authentication) {
        ShoppingList shoppingList = this.shoppingListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid shopping list ID"));

        User user = this.userService.getCurrentUser(authentication);
        if (!shoppingList.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Shopping list does not exist");
        }

        return shoppingList;
    }
}
