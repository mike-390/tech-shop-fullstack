package com.michail.tech_shop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.michail.tech_shop.controller.auth.AuthenticationResponse;
import com.michail.tech_shop.controller.auth.RegisterRequest;
import com.michail.tech_shop.controller.product.ProductRequest;
import com.michail.tech_shop.entity.Category;
import com.michail.tech_shop.entity.User;
import com.michail.tech_shop.repository.CategoryRepository;
import com.michail.tech_shop.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = "application.security.jwt.secret-key=5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437")
@AutoConfigureMockMvc
@Transactional
class AdminAccessIntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private UserRepository userRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private String customerToken;
    private Long categoryId;

    @BeforeEach
    void setUp() throws Exception {
        Category category = new Category("Test Cat", "Desc");

        Category savedCategory = categoryRepository.save(category);
        this.categoryId = savedCategory.getId(); 

        // 2. Create CUSTOMER (via Register to get token)
        RegisterRequest customerReq = new RegisterRequest("Cust", "Omer", "cust@test.com", "pass");
        MvcResult result = mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customerReq))).andReturn();

        AuthenticationResponse response = objectMapper.readValue(result.getResponse().getContentAsString(), AuthenticationResponse.class);
        customerToken = response.getAccessToken();

        // 3. Create ADMIN manually in DB (if not exists)
        if (userRepository.findByEmail("admin@test.com").isEmpty()) {
            User admin = new User("admin@test.com", passwordEncoder.encode("adminpass"), "Super", "Admin", "ADMIN");
            userRepository.save(admin);
        }
    }

    @Test
    void createProduct_ShouldFail_WhenCustomer() throws Exception {
        // GIVEN: Request to create a product with the Valid Category ID
        ProductRequest productRequest = new ProductRequest(
                "Hack Product",
                "Description",
                BigDecimal.TEN,
                1,
                "http://fake-url.com/img.jpg",
                categoryId.toString()
        );

        // WHEN: Sending request with CUSTOMER token
        // THEN: Expect 403 Forbidden
        mockMvc.perform(post("/api/products")
                        .header("Authorization", "Bearer " + customerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequest)))
                .andExpect(status().isForbidden());
    }
}