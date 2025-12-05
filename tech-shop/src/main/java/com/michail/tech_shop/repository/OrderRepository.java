package com.michail.tech_shop.repository;

import com.michail.tech_shop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findByUserEmailOrderByOrderDateDesc(String email);
    List<Order> findAllByOrderByOrderDateDesc();
    Optional<Order> findByIdAndUserEmail(Long id, String email);
}
