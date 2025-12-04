package com.michail.tech_shop.controller;

import com.michail.tech_shop.controller.auth.AuthenticationRequest;
import com.michail.tech_shop.controller.auth.AuthenticationResponse;
import com.michail.tech_shop.controller.auth.RefreshTokenRequest;
import com.michail.tech_shop.controller.auth.RegisterRequest;
import com.michail.tech_shop.entity.User;
import com.michail.tech_shop.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService service;

    public AuthenticationController(AuthenticationService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerUser(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshToken(
            @RequestBody RefreshTokenRequest request
    ) {
        return ResponseEntity.ok(service.refreshToken(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found or invalid token.");
        }
        service.logout(user);
        return ResponseEntity.ok("Logged out successfully");
    }
}
