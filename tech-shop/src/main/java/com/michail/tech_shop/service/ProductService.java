package com.michail.tech_shop.service;

import com.michail.tech_shop.controller.product.ProductRequest;
import com.michail.tech_shop.entity.Category;
import com.michail.tech_shop.entity.Product;
import com.michail.tech_shop.repository.CategoryRepository;
import com.michail.tech_shop.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(ProductRequest request) {
        Category category = categoryRepository.findByName(request.getCategoryName());

        if (category == null) {
            category = new Category(request.getCategoryName(), "Auto-created");
            category = categoryRepository.save(category);
        }

        Product product = new Product(
                request.getName(),
                request.getDescription(),
                request.getPrice(),
                request.getStock(),
                request.getImageUrl(),
                category
        );

        return productRepository.save(product);
    }
}
