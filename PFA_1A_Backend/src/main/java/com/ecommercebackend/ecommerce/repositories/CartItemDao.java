package com.ecommercebackend.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommercebackend.ecommerce.models.CartItem;

@Repository
public interface CartItemDao extends JpaRepository<CartItem, Long> {
    CartItem findByReferenceAndCartUserUsername(String reference, String username);

    int deleteByReferenceAndCartUserUsername(String reference, String username);

    int deleteByCartUserUsername(String username);
}
