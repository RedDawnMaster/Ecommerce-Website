package com.ecommercebackend.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.ecommerce.models.CartItem;
import com.ecommercebackend.ecommerce.services.CartItemService;

@RestController
@RequestMapping("api/cartItem")
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;

    @DeleteMapping("/{reference}/{username}")
    public int deleteByReferenceAndCartUserUsername(@PathVariable String reference, @PathVariable String username) {
        return cartItemService.deleteByReferenceAndCartUserUsername(reference, username);
    }

    @DeleteMapping("/{username}")
    public int deleteByCartUserUsername(@PathVariable String username) {
        return cartItemService.deleteByCartUserUsername(username);
    }

    @PostMapping("/{id}")
    public CartItem save(@RequestBody CartItem cartItem, @PathVariable Long id) {
        return cartItemService.save(cartItem, id);
    }
}
