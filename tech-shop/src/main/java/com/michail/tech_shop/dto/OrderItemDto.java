package com.michail.tech_shop.dto;

import java.math.BigDecimal;

public class OrderItemDto {

    private String productName;
    private String imageUrl;
    private Integer quantity;
    private BigDecimal price;

    public OrderItemDto(String productName, String imageUrl, Integer quantity, BigDecimal price) {
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
