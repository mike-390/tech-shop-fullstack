package com.michail.tech_shop;

import com.michail.tech_shop.entity.Category;
import com.michail.tech_shop.entity.Product;
import com.michail.tech_shop.entity.User;
import com.michail.tech_shop.repository.CategoryRepository;
import com.michail.tech_shop.repository.ProductRepository;
import com.michail.tech_shop.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@SpringBootApplication
public class TechShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechShopApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(CategoryRepository categoryRepository,
                                        ProductRepository productRepository,
                                        UserRepository userRepository,
                                        PasswordEncoder passwordEncoder) {
        return args -> {
            // check if the category "Smartphones" already exists
            Category smartphones = categoryRepository.findByName("Smartphones");

            // if it does NOT exist (is null), then create it
            if (smartphones == null) {
                smartphones = new Category(
                        "Smartphones",
                        "Latest technology mobile phones"
                );
                categoryRepository.save(smartphones);

                //create the iPhone only if we created the category
                Product iphone = new Product(
                        "iPhone 15",
                        "Apple's latest iPhone with Titanium frame",
                        new BigDecimal("999.99"),
                        10,
                        "https://fake-url.com/iphone.jpg",
                        smartphones
                );
                productRepository.save(iphone);

                System.out.println("SUCCESS: Data seeded!");
            } else {
                System.out.println("INFO: Data already exists. Skipping seed.");
            }

            if (userRepository.findByEmail("admin@techshop.com").isEmpty()) {
                User admin = new User(
                        "admin@techshop.com",              // Email
                        passwordEncoder.encode("admin123"), // Password 
                        "Super",                            // First Name
                        "Admin",                            // Last Name
                        "ADMIN"                             // Role 
                );
                userRepository.save(admin);
                System.out.println("SUCCESS: Admin user created (admin@techshop.com / admin123)");
            } else {
                System.out.println("INFO: Admin user already exists.");
            }
        };
    }
}