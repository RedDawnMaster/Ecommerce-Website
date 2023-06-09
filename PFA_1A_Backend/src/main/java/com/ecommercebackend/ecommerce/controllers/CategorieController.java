package com.ecommercebackend.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.ecommerce.models.Categorie;
import com.ecommercebackend.ecommerce.services.CategorieService;

@RestController
@RequestMapping("api/categorie")
public class CategorieController {
    @Autowired
    private CategorieService categorieService;

    @GetMapping("/")
    public List<Categorie> findAll() {
        return categorieService.findAll();
    }

    @DeleteMapping("/{label}")
    public int deleteByLabel(@PathVariable String label) {
        return categorieService.deleteByLabel(label);
    }

    @PostMapping("/")
    public Categorie save(@RequestBody Categorie categorie) {
        return categorieService.save(categorie);
    }

    @PutMapping("/")
    public int update(@RequestBody Categorie categorie) {
        return categorieService.update(categorie);
    }
}
