package com.michail.tech_shop.service;

import com.michail.tech_shop.entity.RefreshToken;
import com.michail.tech_shop.repository.RefreshTokenRepository;
import com.michail.tech_shop.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public RefreshToken createRefreshToken(String email) {
        var user = userRepository.findByEmail(email).orElseThrow();
        refreshTokenRepository.findByUser(user).ifPresent(refreshTokenRepository::delete);

        RefreshToken refreshToken = new RefreshToken(
                UUID.randomUUID().toString(),
                Instant.now().plusMillis(100*60*24*7),
                user
        );

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {

        if (token.getExpiryDate().compareTo(Instant.now()) < 0){
            refreshTokenRepository.delete(token);
            throw new RuntimeException(token.getToken() +"Refresh token was expired.");
        }

        return token;
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @jakarta.transaction.Transactional
    public void deleteByUser(com.michail.tech_shop.entity.User user) {
        refreshTokenRepository.deleteByUser(user);
    }
}


