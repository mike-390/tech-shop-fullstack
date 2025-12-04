package com.michail.tech_shop.service;

import com.michail.tech_shop.controller.auth.RegisterRequest;
import com.michail.tech_shop.entity.User;
import com.michail.tech_shop.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtService jwtService;
    @Mock private RefreshTokenService refreshTokenService;

    @InjectMocks
    private AuthenticationService authService;

    @Test
    void register_ShouldThrowException_IfEmailExists() {
        // GIVEN
        RegisterRequest request = new RegisterRequest("Mike", "Dev", "existing@test.com", "pass");
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(new User()));

        // WHEN & THEN
        assertThrows(RuntimeException.class, () -> authService.register(request));
        verify(userRepository, never()).save(any());
    }
}