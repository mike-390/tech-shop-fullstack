package com.michail.tech_shop.service;

import com.michail.tech_shop.controller.order.OrderItemRequest;
import com.michail.tech_shop.controller.order.OrderRequest;
import com.michail.tech_shop.entity.Order;
import com.michail.tech_shop.entity.OrderItem;
import com.michail.tech_shop.entity.Product;
import com.michail.tech_shop.entity.User;
import com.michail.tech_shop.repository.OrderRepository;
import com.michail.tech_shop.repository.ProductRepository;
import com.michail.tech_shop.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private OrderRepository orderRepository;
    private ProductRepository productRepository;
    private UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Order placeOrder(OrderRequest orderRequest, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PENDING");
        order.setOrderDate(java.time.LocalDateTime.now());

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if(product.getStock() < itemRequest.getQuantity()){
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }

            product.setStock(product.getStock() - itemRequest.getQuantity());
            productRepository.save(product);

            BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            totalAmount = totalAmount.add(lineTotal);

            OrderItem orderItem = new OrderItem(order, product, itemRequest.getQuantity(), product.getPrice());
            orderItems.add(orderItem);
        }
        order.setOrderItems(orderItems);
        order.setPriceTotal(totalAmount);

        return orderRepository.save(order);
    }
}
