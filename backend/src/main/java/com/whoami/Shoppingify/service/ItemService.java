package com.whoami.Shoppingify.service;

import com.whoami.Shoppingify.domain.category.Category;
import com.whoami.Shoppingify.domain.item.Item;
import com.whoami.Shoppingify.dto.item.*;
import com.whoami.Shoppingify.repositories.CategoryRepository;
import com.whoami.Shoppingify.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private ItemRepository itemRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository, CategoryRepository categoryRepository) {
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Item> getAllItems() {
        return this.itemRepository.findAll();
    }

    public ItemListResponseDTO getItems(){
        List<Item> itemList = this.getAllItems();
        List<ItemDTO> itemDTOList = itemList.stream().map(item -> new ItemDTO(item.getId(), item.getName(), item.getNote(), item.getImage_url(), item.getCategory().getName())).toList();
        return new ItemListResponseDTO(itemDTOList);
    }

    public ItemIdDTO createItem(ItemRequestDTO newItem){
        Category category = this.categoryRepository.findByName(newItem.categoryName())
                .orElseGet(() ->{
                    Category newCategory = new Category();
                    newCategory.setName(newItem.categoryName());
                    return categoryRepository.save(newCategory);
                });
        Item item = new Item();

        item.setName(newItem.name());
        item.setNote(newItem.note());
        item.setImage_url(newItem.image_url());
        item.setCategory(category);
        return new ItemIdDTO(itemRepository.save(item).getId());
    }

    public ItemResponseDTO getItemById(String id) {
        Item item = this.itemRepository.findById(id).orElse(null);
        if (item != null) {
            return new ItemResponseDTO(item);
        }
        return null;
    }

    public boolean updateItem(String itemId, ItemRequestDTO newItem) {

        Category category = this.categoryRepository.findByName(newItem.categoryName())
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(newItem.categoryName());
                    return categoryRepository.save(newCategory);
                });
        Optional<Item> itemOptional = this.itemRepository.findById(itemId);
        if(itemOptional.isPresent()){
            Item item = itemOptional.get();
            item.setId(itemId);
            item.setName(newItem.name());
            item.setNote(newItem.note());
            item.setCategory(category);
            item.setImage_url(newItem.image_url());
            this.itemRepository.save(item);
            return true;
        }
        return false;
    }

    public boolean deleteItem(String id) {
        if(this.itemRepository.existsById(id)){
            this.itemRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
