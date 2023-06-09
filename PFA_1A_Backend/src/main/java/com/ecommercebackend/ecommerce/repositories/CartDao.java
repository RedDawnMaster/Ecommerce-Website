package com.ecommercebackend.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommercebackend.ecommerce.models.Cart;

@Repository
public interface CartDao extends JpaRepository<Cart, Long> {
    Cart findByUserUsername(String username);

    int deleteByUserUsername(String username);
}
