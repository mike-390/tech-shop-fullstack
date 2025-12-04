package com.michail.tech_shop.service;

import com.michail.tech_shop.controller.order.OrderItemRequest;
import com.michail.tech_shop.controller.order.OrderRequest;
import com.michail.tech_shop.entity.Order;
import com.michail.tech_shop.entity.Product;
import com.michail.tech_shop.entity.User;
import com.michail.tech_shop.repository.OrderRepository;
import com.michail.tech_shop.repository.ProductRepository;
import com.michail.tech_shop.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock private OrderRepository orderRepository;
    @Mock private ProductRepository productRepository;
    @Mock private UserRepository userRepository;

    @InjectMocks
    private OrderService orderService;

    private User user;
    private Product product;

    @BeforeEach
    void setUp() {
        user = new User("mike@test.com", "pass", "Mike", "Dev", "CUSTOMER");
        product = new Product("iPhone", "Desc", new BigDecimal("1000"), 10, "url", null);
        product.setId(1L);
    }

    @Test
    void placeOrder_Successful_ShouldReduceStock() {
        // GIVEN
        OrderRequest request = new OrderRequest(List.of(new OrderItemRequest(1L, 2))); 

        when(userRepository.findByEmail("mike@test.com")).thenReturn(Optional.of(user));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArguments()[0]);

        // WHEN
        Order result = orderService.placeOrder(request, "mike@test.com");

        // THEN
        assertNotNull(result);
        assertEquals(new BigDecimal("2000"), result.getPriceTotal()); // 2 * 1000 = 2000
        assertEquals(8, product.getStock()); // 10 - 2 = 8 
    }

    @Test
    void placeOrder_NoStock_ShouldThrowException() {
        // GIVEN
        OrderRequest request = new OrderRequest(List.of(new OrderItemRequest(1L, 20))); // i want 20 pieces dut i have only 10.

        when(userRepository.findByEmail("mike@test.com")).thenReturn(Optional.of(user));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        // WHEN & THEN
        Exception exception = assertThrows(RuntimeException.class, () -> {
            orderService.placeOrder(request, "mike@test.com");
        });

        assertTrue(exception.getMessage().contains("Not enough stock"));
        verify(orderRepository, never()).save(any()); // nothing should be saved
    }
}