package com.ecommercebackend.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.ecommerce.models.ProductVariation;
import com.ecommercebackend.ecommerce.services.ProductVariationService;

@RestController
@RequestMapping("api/productVariation")
public class ProductVariationController {
    @Autowired
    private ProductVariationService productVariationService;

    @GetMapping("/{label}")
    public List<ProductVariation> findByProductLabel(@PathVariable String label) {
        return this.productVariationService.findByProductLabel(label);
    }

    @DeleteMapping("/{label}/{type}/{value}")
    public int deleteByProductLabelAndTypeAndValue(@PathVariable String label, @PathVariable String type,
            @PathVariable String value) {
        return productVariationService.deleteByProductLabelAndTypeAndValue(label, type, value);
    }

    @PutMapping("/")
    public int update(@RequestBody ProductVariation productVariation) {
        return productVariationService.update(productVariation);
    }
}
