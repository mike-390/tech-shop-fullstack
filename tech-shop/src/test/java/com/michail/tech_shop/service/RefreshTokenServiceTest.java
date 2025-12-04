package com.michail.tech_shop.service;

import com.michail.tech_shop.entity.RefreshToken;
import com.michail.tech_shop.entity.User;
import com.michail.tech_shop.repository.RefreshTokenRepository;
import com.michail.tech_shop.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RefreshTokenServiceTest {

    @Mock private RefreshTokenRepository refreshTokenRepository;
    @Mock private UserRepository userRepository;

    @InjectMocks
    private RefreshTokenService refreshTokenService;

    @Test
    void createRefreshToken_ShouldCreateNewToken() {
        // GIVEN
        String email = "test@user.com";
        User user = new User();
        user.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(refreshTokenRepository.findByUser(user)).thenReturn(Optional.empty());
        when(refreshTokenRepository.save(any(RefreshToken.class))).thenAnswer(i -> i.getArguments()[0]);

        // WHEN
        RefreshToken result = refreshTokenService.createRefreshToken(email);

        // THEN
        assertNotNull(result);
        assertNotNull(result.getToken());
        assertEquals(user, result.getUser());
        assertTrue(result.getExpiryDate().isAfter(Instant.now()));
    }

    @Test
    void verifyExpiration_ShouldThrowException_WhenTokenExpired() {
        // GIVEN
        RefreshToken expiredToken = new RefreshToken();
        expiredToken.setToken("expired-uuid");
        // expiered date 
        expiredToken.setExpiryDate(Instant.now().minusSeconds(3600));

        // WHEN & THEN
        Exception exception = assertThrows(RuntimeException.class, () -> {
            refreshTokenService.verifyExpiration(expiredToken);
        });

        assertTrue(exception.getMessage().contains("was expired"));
        verify(refreshTokenRepository).delete(expiredToken);
    }
}