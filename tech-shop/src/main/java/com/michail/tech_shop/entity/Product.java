package com.michail.tech_shop.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity(name="Product")
@Table(name="products")
public class Product {

    @Id
    @SequenceGenerator(
            name = "product_sequence",
            sequenceName = "product_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name="name",
            nullable=false,
            columnDefinition = "TEXT"
    )
    private String name;
    @Column(
            name = "description",
            columnDefinition = "TEXT"
    )
    private String description;
    @Column(
            name = "price",
            nullable = false
    )
    private BigDecimal price;
    @Column(
            name = "stock",
            nullable = false
    )
    private Integer stock;
    private String imageUrl;
    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(
            name = "category_id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "fk_category_product"
            )
    )
    private Category category;

    public Product(String name, String description, BigDecimal price, Integer stock, String imageUrl, Category category ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.category = category;
    }

    public Product() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
