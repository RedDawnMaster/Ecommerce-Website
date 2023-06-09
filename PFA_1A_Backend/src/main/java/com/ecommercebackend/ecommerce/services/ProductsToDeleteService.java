package com.ecommercebackend.ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.ecommerce.models.ProductsToDelete;
import com.ecommercebackend.ecommerce.repositories.ProductsToDeleteDao;

@Service
public class ProductsToDeleteService {
    @Autowired
    private ProductsToDeleteDao productsToDeleteDao;

    public ProductsToDelete findById(Long id) {
        return productsToDeleteDao.findById(id).orElse(null);
    }

    public List<ProductsToDelete> findAll() {
        return productsToDeleteDao.findAll();
    }

    public void save(ProductsToDelete productsToDelete) {
        productsToDeleteDao.save(productsToDelete);
    }
}
