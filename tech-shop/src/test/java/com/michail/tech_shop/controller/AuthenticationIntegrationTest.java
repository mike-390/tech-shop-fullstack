package com.michail.tech_shop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.michail.tech_shop.controller.auth.AuthenticationRequest;
import com.michail.tech_shop.controller.auth.RegisterRequest;
import com.michail.tech_shop.repository.OrderRepository;
import com.michail.tech_shop.repository.RefreshTokenRepository;
import com.michail.tech_shop.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = "application.security.jwt.secret-key=5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437")
@AutoConfigureMockMvc
@Transactional
class AuthenticationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @BeforeEach
    void setUp() {
        
        refreshTokenRepository.deleteAll(); /
        orderRepository.deleteAll();        
        userRepository.deleteAll();        
    }

    @Test
    void shouldRegisterUserSuccessfully() throws Exception {
        // GIVEN
        RegisterRequest request = new RegisterRequest("Test", "User", "newuser@test.com", "password123");

        // WHEN & THEN
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.access_token").exists())
                .andExpect(jsonPath("$.refresh_token").exists());
    }

    @Test
    void shouldAuthenticateUserSuccessfully() throws Exception {
        // GIVEN (Register user first)
        RegisterRequest registerRequest = new RegisterRequest("Login", "User", "login@test.com", "password123");
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)));

        // WHEN (Attempt Login)
        AuthenticationRequest loginRequest = new AuthenticationRequest("login@test.com", "password123");

        // THEN
        mockMvc.perform(post("/api/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.access_token").exists());
    }

    @Test
    void shouldFailLoginWithWrongPassword() throws Exception {
        // GIVEN
        RegisterRequest registerRequest = new RegisterRequest("Wrong", "Pass", "wrong@test.com", "password123");
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)));

        // WHEN (Login with wrong password)
        AuthenticationRequest loginRequest = new AuthenticationRequest("wrong@test.com", "WRONG_PASSWORD");

        // THEN (Expect 403 Forbidden)
        mockMvc.perform(post("/api/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());
    }
}