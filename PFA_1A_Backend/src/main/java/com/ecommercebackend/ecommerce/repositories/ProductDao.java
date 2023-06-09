package com.ecommercebackend.ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommercebackend.ecommerce.models.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Long> {
        Product findByLabel(String label);

        List<Product> findByLabelContains(String label);

        List<Product> findByPriceBetween(double lowerBoundPrice, double higherBoundPrice);

        List<Product> findByCategorieLabel(String label);

        int countByPriceBetween(double lowerBoundPrice, double higherBoundPrice);

        int countByCategorieLabel(String label);

        int deleteByLabel(String label);
}
