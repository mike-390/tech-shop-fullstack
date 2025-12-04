package com.michail.tech_shop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.michail.tech_shop.controller.auth.AuthenticationRequest;
import com.michail.tech_shop.controller.auth.AuthenticationResponse;
import com.michail.tech_shop.controller.auth.RegisterRequest;
import com.michail.tech_shop.controller.order.OrderItemRequest;
import com.michail.tech_shop.controller.order.OrderRequest;
import com.michail.tech_shop.entity.Category;
import com.michail.tech_shop.entity.Product;
import com.michail.tech_shop.repository.CategoryRepository;
import com.michail.tech_shop.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = "application.security.jwt.secret-key=5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437")
@AutoConfigureMockMvc
@Transactional
class OrderIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private Long productId;
    private String token;

    @BeforeEach
    void setUp() throws Exception {
        // 1. REGISTER USER
        RegisterRequest registerRequest = new RegisterRequest("Test", "User", "integration@test.com", "password");

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)));

        // 2. LOGIN (to get the Token)
        AuthenticationRequest loginRequest = new AuthenticationRequest("integration@test.com", "password");

        MvcResult loginResult = mockMvc.perform(post("/api/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andReturn();

        String responseContent = loginResult.getResponse().getContentAsString();
        AuthenticationResponse authResponse = objectMapper.readValue(responseContent, AuthenticationResponse.class);
        token = authResponse.getAccessToken();

        // 3. CREATE PRODUCT IN DB
        Category category = new Category("Integration Test Cat", "Desc");
        categoryRepository.save(category);

        Product product = new Product("Integration Product", "Desc", new BigDecimal("500"), 100, "url", category);
        productRepository.save(product);
        productId = product.getId();
    }

    @Test
    void shouldPlaceOrderSuccessfully() throws Exception {
        // GIVEN: Prepare order request (2 items)
        OrderItemRequest itemRequest = new OrderItemRequest(productId, 2);
        OrderRequest orderRequest = new OrderRequest(List.of(itemRequest));

        // WHEN: Send POST request to /api/orders
        mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + token) // Include Token
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderRequest)))

                // THEN: Verify response
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("PENDING"))
                .andExpect(jsonPath("$.priceTotal").value(1000.0)); // 2 * 500 = 1000
    }
}