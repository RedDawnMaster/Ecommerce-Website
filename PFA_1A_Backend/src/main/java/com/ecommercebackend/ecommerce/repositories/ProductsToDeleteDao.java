package com.ecommercebackend.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommercebackend.ecommerce.models.ProductsToDelete;

@Repository
public interface ProductsToDeleteDao extends JpaRepository<ProductsToDelete, Long> {

}
