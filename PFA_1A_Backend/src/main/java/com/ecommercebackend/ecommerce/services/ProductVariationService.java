package com.ecommercebackend.ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommercebackend.ecommerce.models.CartItem;
import com.ecommercebackend.ecommerce.models.OrderItem;
import com.ecommercebackend.ecommerce.models.Product;
import com.ecommercebackend.ecommerce.models.ProductVariation;
import com.ecommercebackend.ecommerce.repositories.ProductVariationDao;

@Service
public class ProductVariationService {
    @Autowired
    private ProductVariationDao productVariationDao;
    @Autowired
    private ProductService productService;
    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private OrderItemService orderItemService;

    private ProductVariation findByProductLabelAndTypeAndValue(String label, String type, String value) {
        return productVariationDao.findByProductLabelAndTypeAndValue(label, type, value);
    }

    public List<ProductVariation> findByProductLabel(String label) {
        return this.productVariationDao.findByProductLabel(label);
    }

    private ProductVariation findById(Long id) {
        return productVariationDao.findById(id).orElse(null);
    }

    @Transactional
    public int deleteByProductLabelAndTypeAndValue(String label, String type, String value) {
        ProductVariation productVariation = findByProductLabelAndTypeAndValue(label, type, value);
        Product product = productVariation.getProduct();
        List<CartItem> cartItems = cartItemService.findAll().stream()
                .filter(c -> c.getProductVariations().contains(productVariation)).toList();
        List<OrderItem> orderItems = orderItemService.findAll().stream()
                .filter(o -> o.getProductVariations().contains(productVariation)).toList();
        product.getProductVariations().remove(productVariation);
        productService.update(product);
        cartItems.forEach(c -> {
            c.getProductVariations().remove(productVariation);
            cartItemService.update(c);
        });
        orderItems.forEach(o -> {
            o.getProductVariations().remove(productVariation);
            orderItemService.save(o);
        });
        return productVariationDao.deleteByProductLabelAndTypeAndValue(label, type, value);
    }

    @Transactional
    int deleteByProductLabel(String label) {
        Product product = productService.findByLabel(label);
        product.setProductVariations(null);
        productService.update(product);
        return productVariationDao.deleteByProductLabel(label);
    }

    void saveWith(ProductVariation productVariation) {
        productVariation.setEnabled(true);
        productVariationDao.save(productVariation);
    }

    public int update(ProductVariation productVariation) {
        ProductVariation found = findById(productVariation.getId());
        if (productVariation.getProduct() == null)
            productVariation.setProduct(found.getProduct());
        if (!found.getValue().equals(productVariation.getValue())
                && findByProductLabelAndTypeAndValue(productVariation.getProduct().getLabel(),
                        productVariation.getType(), productVariation.getValue()) != null)
            return -1;
        if (productVariation.getProduct() == null)
            productVariation.setProduct(found.getProduct());
        productVariationDao.save(productVariation);
        return 1;
    }
}
