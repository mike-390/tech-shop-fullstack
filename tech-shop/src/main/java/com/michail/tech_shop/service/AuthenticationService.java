package com.michail.tech_shop.service;

import com.michail.tech_shop.controller.auth.AuthenticationRequest;
import com.michail.tech_shop.controller.auth.AuthenticationResponse;
import com.michail.tech_shop.controller.auth.RefreshTokenRequest; // <--- Import
import com.michail.tech_shop.controller.auth.RegisterRequest;
import com.michail.tech_shop.entity.User;
import com.michail.tech_shop.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService; 

    public AuthenticationService(UserRepository userRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager,
                                 RefreshTokenService refreshTokenService) { 
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.refreshTokenService = refreshTokenService;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("The email " + request.getEmail() + "is already in use!");
        }

        var user = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getFirstName(),
                request.getLastName(),
                "CUSTOMER"
        );

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getEmail()); 

        return new AuthenticationResponse(jwtToken, refreshToken.getToken());
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getEmail());

        return new AuthenticationResponse(jwtToken, refreshToken.getToken());
    }

    // refresh Token
    public AuthenticationResponse refreshToken(RefreshTokenRequest request) {
        return refreshTokenService.findByToken(request.getToken())
                .map(refreshTokenService::verifyExpiration)
                .map(refreshToken -> refreshToken.getUser())
                .map(user -> {
                    String accessToken = jwtService.generateToken(user);
                    // We return a new access token and the SAME refresh token
                    return new AuthenticationResponse(accessToken, request.getToken());
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));
    }

    // lOGOUT
    public void logout(User user) {
        refreshTokenService.deleteByUser(user);
    }
}