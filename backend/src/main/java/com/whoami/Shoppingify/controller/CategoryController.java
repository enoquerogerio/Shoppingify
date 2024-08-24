package com.whoami.Shoppingify.controller;

import com.whoami.Shoppingify.domain.category.Category;
import com.whoami.Shoppingify.dto.category.CategoryRequestDTO;
import com.whoami.Shoppingify.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/{id}")
    public  ResponseEntity<Category> getCategory(@PathVariable String id){
        Category category = categoryService.findById(id);
        if(category != null){
            return ResponseEntity.ok(category);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<String> createCategory(@Valid @RequestBody CategoryRequestDTO category) {
        categoryService.createCategory(category);
        return new ResponseEntity<>("Category added successfully", HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategory();
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable String id, @RequestBody Category category ){
        boolean existingCategory = this.categoryService.updateCategory(id, category);;
        if(existingCategory){
            return new ResponseEntity<>("Category update successfully", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Category Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deteleCategory(@PathVariable String id){
        boolean existingCategory = this.categoryService.deleteCategory(id);;
        if(existingCategory){
            return new ResponseEntity<>("Category Deleted successfully", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Category Not Found", HttpStatus.NOT_FOUND);
        }
    }
}
