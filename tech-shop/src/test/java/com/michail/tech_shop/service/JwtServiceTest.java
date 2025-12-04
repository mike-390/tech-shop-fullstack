package com.michail.tech_shop.service;

import com.michail.tech_shop.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class JwtServiceTest {

    @InjectMocks
    private JwtService jwtService;

    private User user;

    @BeforeEach
    void setUp() {

        ReflectionTestUtils.setField(jwtService, "secretKey", "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437");

        // create a user for testing purposes
        user = new User();
        user.setEmail("test@user.com");
    }

    @Test
    void generateToken_ShouldReturnToken() {
        // WHEN
        String token = jwtService.generateToken(user);

        // THEN
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void extractUsername_ShouldReturnCorrectEmail() {
        // GIVEN
        String token = jwtService.generateToken(user);

        // WHEN
        String extractedUsername = jwtService.extractUsername(token);

        // THEN
        assertEquals("test@user.com", extractedUsername);
    }

    @Test
    void isTokenValid_ShouldReturnTrue_ForValidToken() {
        // GIVEN
        String token = jwtService.generateToken(user);

        // WHEN
        boolean isValid = jwtService.isTokenValid(token, user);

        // THEN
        assertTrue(isValid);
    }

    @Test
    void isTokenValid_ShouldReturnFalse_ForWrongUser() {
        // GIVEN
        String token = jwtService.generateToken(user);

        User wrongUser = new User();
        wrongUser.setEmail("hacker@user.com");

        // WHEN
        boolean isValid = jwtService.isTokenValid(token, wrongUser);

        // THEN
        assertFalse(isValid);
    }
}