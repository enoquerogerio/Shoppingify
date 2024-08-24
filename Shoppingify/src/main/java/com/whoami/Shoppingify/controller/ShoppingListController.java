package com.whoami.Shoppingify.controller;

import com.whoami.Shoppingify.domain.shoppingList.ShoppingList;
import com.whoami.Shoppingify.dto.ShoppingListDTO.ShoppingListIdDTO;
import com.whoami.Shoppingify.dto.ShoppingListDTO.ShoppingListRequestDTO;
import com.whoami.Shoppingify.dto.ShoppingListDTO.ShoppingListResponseDTO;
import com.whoami.Shoppingify.service.ShoppingListService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class ShoppingListController {
    private final ShoppingListService shoppingListService;

    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }

    @PostMapping("/shopping-lists")
    public ResponseEntity<ShoppingListIdDTO> createOrUpdateList(@Valid @RequestBody ShoppingListRequestDTO newShoppingList, Authentication authentication) {
        ShoppingListIdDTO savedListId = shoppingListService.createOrUpdateList(newShoppingList, authentication);
        return ResponseEntity.ok(savedListId);
    }

    @GetMapping("/shopping-lists/active")
    public ResponseEntity<ShoppingList> getShoppingListById(Authentication authentication){
        ShoppingList shoppingList = this.shoppingListService.getActiveList(authentication);
        return ResponseEntity.ok(shoppingList);
        //return ResponseEntity.ok(new ShoppingListResponseDTO(shoppingList));
    }

    @PutMapping("/shopping-lists/{id}/complete")
    public ResponseEntity<ShoppingList> completeList(Authentication authentication, @PathVariable String id) {
        ShoppingList completedList = shoppingListService.completeList(id, authentication);
        return ResponseEntity.ok(completedList);
       // return ResponseEntity.ok(new ShoppingListResponseDTO(completedList));
    }

    @GetMapping("/shopping-lists/history")
    public ResponseEntity<List<ShoppingList>> getShoppingHistory(Authentication authentication) {
        List<ShoppingList> history = shoppingListService.getShoppingHistory(authentication);
        return ResponseEntity.ok(history);
    }

    @PutMapping("/shopping-lists/{id}/cancel")
    public ResponseEntity<ShoppingList> cancelList(@PathVariable String id, Authentication authentication) {
        ShoppingList cancelledList = shoppingListService.cancelList(id, authentication);
        return ResponseEntity.ok(cancelledList);
    }

    @PutMapping("/shopping-lists/{listId}/items/{itemId}/toggle")
    public ResponseEntity<ShoppingList> toggleItemCompletion(Authentication authentication, @PathVariable String listId, @PathVariable String itemId) {
        ShoppingList updatedList = shoppingListService.toggleItemCompletion(listId, itemId, authentication);
        return ResponseEntity.ok(updatedList);
    }

    @PostMapping("/shopping-lists/{listId}/items/{itemId}")
    public ResponseEntity<ShoppingList> addItemToList(@PathVariable String listId, @PathVariable String itemId, @RequestParam int quantity, Authentication authentication) {
        ShoppingList updatedList = shoppingListService.addItemToList(listId, itemId, quantity, authentication);
        return ResponseEntity.ok(updatedList);
    }

    @DeleteMapping("/shopping-lists/{listId}/items/{itemId}")
    public ResponseEntity<ShoppingList> removeItemFromList(@PathVariable String listId, @PathVariable String itemId, Authentication authentication) {
        ShoppingList updatedList = shoppingListService.removeItemFromList(listId, itemId, authentication);
        return ResponseEntity.ok(updatedList);
    }

    @PutMapping("/shopping-lists/{listId}/items/{itemId}")
    public ResponseEntity<ShoppingList> updateItemQuantity(@PathVariable String listId, @PathVariable String itemId, @RequestParam int quantity, Authentication authentication) {
        ShoppingList updatedList = shoppingListService.updateItemQuantity(listId, itemId, quantity, authentication);
        return ResponseEntity.ok(updatedList);
    }
}
