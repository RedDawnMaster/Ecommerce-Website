package com.ecommercebackend.ecommerce.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommercebackend.ecommerce.models.Categorie;
import com.ecommercebackend.ecommerce.models.Product;
import com.ecommercebackend.ecommerce.repositories.CategorieDao;

@Service
public class CategorieService {
    @Autowired
    private CategorieDao categorieDao;
    @Autowired
    private ProductService productService;

    private Categorie findByLabel(String label) {
        return categorieDao.findByLabel(label);
    }

    private Categorie findById(Long id) {
        return categorieDao.findById(id).orElse(null);
    }

    public List<Categorie> findAll() {
        return categorieDao.findAll();
    }

    @Transactional
    public int deleteByLabel(String label) {
        Categorie categorie = findByLabel(label);
        if (categorie.getProducts() != null && categorie.getProducts().size() != 0) {
            Categorie other = findByLabel("Other");
            if (other == null) {
                other = new Categorie();
                other.setLabel("Other");
                other.setProducts(categorie.getProducts());
            } else {
                if (other.getProducts() == null)
                    other.setProducts(new ArrayList<Product>());
                for (Product product : categorie.getProducts()) {
                    other.getProducts().add(product);
                }
            }
            other.setTotal(other.getProducts().size());
            other = categorieDao.save(other);
            for (Product product : categorie.getProducts()) {
                product.setCategorie(other);
                productService.update(product);
            }
        }
        return categorieDao.deleteByLabel(label);
    }

    public Categorie save(Categorie categorie) {
        if (findByLabel(categorie.getLabel()) != null)
            return null;
        return categorieDao.save(categorie);
    }

    public int update(Categorie categorie) {
        Categorie found = findById(categorie.getId());
        if (!found.getLabel().equals(categorie.getLabel()) && findByLabel(categorie.getLabel()) != null)
            return -1;
        if (categorie.getProducts() == null)
            categorie.setProducts(found.getProducts());
        categorie.setTotal(categorie.getProducts().size());
        categorieDao.save(categorie);
        return 1;
    }
}
