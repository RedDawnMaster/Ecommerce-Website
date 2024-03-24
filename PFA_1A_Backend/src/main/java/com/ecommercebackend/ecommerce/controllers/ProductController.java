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

import com.ecommercebackend.ecommerce.models.Product;
import com.ecommercebackend.ecommerce.services.ProductService;

@RestController
@RequestMapping("api/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/{label}")
    public List<Product> findByLabelContains(@PathVariable String label) {
        return productService.findByLabelContains(label);
    }

    @GetMapping("/categorie/{label}")
    public List<Product> findByCategorieLabel(@PathVariable String label) {
        return productService.findByCategorieLabel(label);
    }

    @GetMapping("/{lowerBoundPrice}/{higherBoundPrice}")
    public List<Product> findByPriceBetween(@PathVariable double lowerBoundPrice,
            @PathVariable double higherBoundPrice) {
        return productService.findByPriceBetween(lowerBoundPrice, higherBoundPrice);
    }

    @GetMapping("/")
    public List<Product> findAll() {
        return productService.findAll();
    }

    @GetMapping("/countProductsByPrice/{lowerBoundPrice}/{higherBoundPrice}")
    public int countByPriceBetween(@PathVariable double lowerBoundPrice, @PathVariable double higherBoundPrice) {
        return this.productService.countByPriceBetween(lowerBoundPrice, higherBoundPrice);
    }

    @GetMapping("/countByCategorieLabel/{label}")
    public int countByCategorieLabel(@PathVariable String label) {
        return this.productService.countByCategorieLabel(label);
    }

    @DeleteMapping("/{label}")
    public int deleteByLabel(@PathVariable String label) {
        return productService.deleteByLabel(label);
    }

    @PostMapping("/")
    public Product save(@RequestBody Product product) {
        return productService.save(product);
    }

    @PutMapping("/")
    public int update(@RequestBody Product product) {
        return productService.update(product);
    }

}
