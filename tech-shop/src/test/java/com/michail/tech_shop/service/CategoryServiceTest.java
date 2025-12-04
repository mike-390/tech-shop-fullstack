package com.michail.tech_shop.service;

import com.michail.tech_shop.entity.Category;
import com.michail.tech_shop.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    @Test
    void getAllCategories_ShouldReturnList() {
        // GIVEN
        Category laptop = new Category("Laptops", "Gaming");
        when(categoryRepository.findAll()).thenReturn(List.of(laptop));

        // WHEN
        List<Category> result = categoryService.getAllCategories();

        // THEN
        assertEquals(1, result.size());
        assertEquals("Laptops", result.get(0).getName());
    }

    @Test
    void createCategory_ShouldSaveAndReturn() {
        // GIVEN
        Category newCategory = new Category("Tablets", "Android & iPad");
        when(categoryRepository.save(any(Category.class))).thenReturn(newCategory);

        // WHEN
        Category result = categoryService.createCategory(newCategory);

        // THEN
        assertNotNull(result);
        assertEquals("Tablets", result.getName());
        verify(categoryRepository).save(any(Category.class));
    }
}