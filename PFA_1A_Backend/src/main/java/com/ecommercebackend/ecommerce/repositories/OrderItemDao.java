package com.ecommercebackend.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommercebackend.ecommerce.models.OrderItem;

@Repository
public interface OrderItemDao extends JpaRepository<OrderItem, Long> {
    OrderItem findByReferenceAndOrderReference(String reference, String oReference);

    int deleteByReferenceAndOrderReference(String reference, String oReference);

    int deleteByOrderReference(String reference);
}
