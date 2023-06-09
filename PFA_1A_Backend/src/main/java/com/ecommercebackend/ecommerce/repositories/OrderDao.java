package com.ecommercebackend.ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommercebackend.ecommerce.models.Order;

@Repository
public interface OrderDao extends JpaRepository<Order, Long> {
    Order findByReference(String reference);

    List<Order> findByUserUsername(String username);

    int deleteByReference(String reference);

    int deleteByUserUsername(String username);
}
