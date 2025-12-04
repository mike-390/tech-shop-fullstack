package com.michail.tech_shop.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity(name="RefreshToken")
@Table(name="refresh_tokens")
public class RefreshToken {

    @Id
    @SequenceGenerator(
            name = "refresh_sequence",
            sequenceName = "refresh_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "refresh_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "token",
            nullable = false
    )
    private String token;
    @Column(
            name = "expiry_date"
    )
    private Instant expiryDate;
    @OneToOne()
    @JoinColumn(name="user_id",referencedColumnName = "id")
    private User user;

    public RefreshToken( String  token, Instant expiryDate, User user ) {
        this.token = token;
        this.expiryDate = expiryDate;
        this.user = user;
    }

    public RefreshToken() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Instant getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Instant expiryDate) {
        this.expiryDate = expiryDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
