package com.whoami.Shoppingify.controller;

import com.whoami.Shoppingify.domain.item.Item;
import com.whoami.Shoppingify.dto.item.ItemIdDTO;
import com.whoami.Shoppingify.dto.item.ItemListResponseDTO;
import com.whoami.Shoppingify.dto.item.ItemRequestDTO;
import com.whoami.Shoppingify.dto.item.ItemResponseDTO;
import com.whoami.Shoppingify.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("items")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<ItemListResponseDTO> getAllItems(){
        ItemListResponseDTO items = this.itemService.getItems();
        return ResponseEntity.ok().body(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponseDTO> getItemById(@PathVariable String id){
        ItemResponseDTO item = this.itemService.getItemById(id);
        if(item != null){
            return ResponseEntity.ok(item);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<ItemIdDTO> addItem(@RequestBody ItemRequestDTO body, UriComponentsBuilder uriComponentsBuilder){
        ItemIdDTO itemIdDTO= this.itemService.createItem(body);
        var uri = uriComponentsBuilder.path("/item/{id}").buildAndExpand(itemIdDTO.id()).toUri();
        return ResponseEntity.created(uri).body(itemIdDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateItem(@PathVariable String id, @RequestBody ItemRequestDTO itemRequestDTO){
        boolean existingItem  = this.itemService.updateItem(id, itemRequestDTO);

        if(existingItem){
            return new ResponseEntity<>("Item Updated Successfully", HttpStatus.OK);
        }

        return new ResponseEntity<>("Item Not Found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable String id){
        boolean existingItem = this.itemService.deleteItem(id);;
        if(existingItem){
            return new ResponseEntity<>("Item Deleted Successfully", HttpStatus.OK);
        }

        return new ResponseEntity<>("Item Not Found", HttpStatus.NOT_FOUND);
    }
}
