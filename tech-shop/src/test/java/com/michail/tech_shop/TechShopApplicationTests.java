package com.michail.tech_shop;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

// Use a dummy secret key for testing purposes to satisfy the Spring Security requirement.
// This key is NOT used in production.
@SpringBootTest(properties = "application.security.jwt.secret-key=5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437")
class TechShopApplicationTests {

    @Test
    void contextLoads() {
    }

}