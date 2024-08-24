package com.whoami.Shoppingify.service;

import com.whoami.Shoppingify.domain.category.Category;
import com.whoami.Shoppingify.dto.category.CategoryRequestDTO;
import com.whoami.Shoppingify.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category findById(String id) {
        return this.categoryRepository.findById(id).orElse(null);
    }

    public void createCategory(CategoryRequestDTO category){
        if(categoryRepository.findByName(category.name()).isPresent()){
            throw new IllegalArgumentException("Category already exists");
        }

        Category newCategory = new Category();
        newCategory.setName(category.name());
        categoryRepository.save(newCategory);
    }

    public List<Category> getAllCategory(){
        return this.categoryRepository.findAll();
    }

    public boolean updateCategory(String id, Category newCategory) {
        Optional<Category> categoryOptional = this.categoryRepository.findById(id);
        if(categoryOptional.isPresent()){
            Category category = categoryOptional.get();
            category.setName(newCategory.getName());
            this.categoryRepository.save(category);
            return true;
        }
        return false;
    }

    public boolean deleteCategory(String id) {
        if(this.categoryRepository.existsById(id)){
            this.categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
