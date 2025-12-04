package com.michail.tech_shop.config;

import com.michail.tech_shop.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

         // check if the "Authorization" header exists
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // remove the "Bearer " prefix and keep only the token
        jwt = authHeader.substring(7);

        // extract the email (username) from the token
        userEmail = jwtService.extractUsername(jwt);
        System.out.println("👤 Extracted email: " + userEmail);
        // if we found an email and the user is not already authenticated
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Find the user in the database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            System.out.println("👤 User authorities: " + userDetails.getAuthorities());
             // Check if the token is valid
            if (jwtService.isTokenValid(jwt, userDetails)) {

                // CREATE THE USER’S AUTHENTICATION TOKEN
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // Store it in the SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println("Authentication set successfully");
            } else {
                System.out.println("Token validation failed");
            }
        }

        filterChain.doFilter(request, response);
    }


}