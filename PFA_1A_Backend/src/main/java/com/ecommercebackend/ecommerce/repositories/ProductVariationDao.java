package com.ecommercebackend.ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommercebackend.ecommerce.models.ProductVariation;

@Repository
public interface ProductVariationDao extends JpaRepository<ProductVariation, Long> {
    ProductVariation findByProductLabelAndTypeAndValue(String label, String type, String value);

    List<ProductVariation> findByProductLabel(String label);

    int deleteByProductLabelAndTypeAndValue(String label, String type, String value);

    int deleteByProductLabel(String label);
}
