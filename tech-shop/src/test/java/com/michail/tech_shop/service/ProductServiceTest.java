package com.michail.tech_shop.service;

import com.michail.tech_shop.entity.Product;
import com.michail.tech_shop.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void getAllProducts_ShouldReturnListOfProducts() {
        // 1. GIVEN
        Product iphone = new Product("iPhone", "Desc", BigDecimal.TEN, 10, "url", null);
        when(productRepository.findAll()).thenReturn(List.of(iphone));

        // 2. WHEN
        List<Product> result = productService.getAllProducts();

        // 3. THEN
        assertEquals(1, result.size());
        assertEquals("iPhone", result.get(0).getName());
    }
}