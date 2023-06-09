package com.ecommercebackend.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommercebackend.ecommerce.models.Categorie;

@Repository
public interface CategorieDao extends JpaRepository<Categorie, Long> {
    Categorie findByLabel(String label);

    int deleteByLabel(String label);
}
