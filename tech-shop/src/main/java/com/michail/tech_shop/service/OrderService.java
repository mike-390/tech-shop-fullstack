package com.michail.tech_shop.service;

import com.michail.tech_shop.controller.order.OrderItemRequest;
import com.michail.tech_shop.controller.order.OrderRequest;
import com.michail.tech_shop.dto.OrderItemDto;
import com.michail.tech_shop.dto.OrderResponseDto;
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
import java.util.stream.Collectors;

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

    public List<OrderResponseDto> getUserOrders(String email){
        List<Order> orders = orderRepository.findAllByOrderByOrderDateDesc();
        return mapToDto(orders);
    }

    public List<OrderResponseDto> getAllOrders(){
        List<Order> orders = orderRepository.findAllByOrderByOrderDateDesc();
        return  mapToDto(orders);
    }

    public OrderResponseDto getOrderById(Long orderId, String email, boolean isAdmin){
        Order order;
        if(isAdmin){
            order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
        } else {
            order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found or access denied"));
        }
        return mapToDto(List.of(order)).get(0);
    }

    @Transactional
    public OrderResponseDto updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(newStatus);
        Order savedOrder = orderRepository.save(order);

        // Επιστροφή του DTO (όπως κάνουμε στο getOrderById)
        return mapToDto(List.of(savedOrder)).get(0);
    }

    private List<OrderResponseDto> mapToDto(List<Order> orders) {
        return orders.stream().map(order -> {
            List<OrderItemDto> itemDtos = order.getOrderItems().stream()
                    .map(item -> new OrderItemDto(
                            item.getProduct().getName(),
                            item.getProduct().getImageUrl(),
                            item.getQuantity(),
                            item.getPrice()
                    )).collect(Collectors.toList());

            return new OrderResponseDto(
                    order.getId(),
                    order.getOrderDate(),
                    order.getPriceTotal(),
                    order.getStatus(),
                    itemDtos
            );
        }).collect(Collectors.toList());
    }
}
