package com.ecommercebackend.ecommerce.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommercebackend.ecommerce.models.Cart;
import com.ecommercebackend.ecommerce.models.CartItem;
import com.ecommercebackend.ecommerce.models.ProductVariation;
import com.ecommercebackend.ecommerce.repositories.CartItemDao;

@Service
public class CartItemService {
    @Autowired
    private CartItemDao cartItemDao;
    @Autowired
    private CartService cartService;

    private CartItem findByReferenceAndCartUserUsername(String reference, String username) {
        return cartItemDao.findByReferenceAndCartUserUsername(reference, username);
    }

    List<CartItem> findAll() {
        return cartItemDao.findAll();
    }

    @Transactional
    public int deleteByReferenceAndCartUserUsername(String reference, String username) {
        CartItem cartItem = findByReferenceAndCartUserUsername(reference, username);
        Cart cart = cartItem.getCart();
        cart.getCartItems().remove(cartItem);
        cartService.update(cart);
        return cartItemDao.deleteByReferenceAndCartUserUsername(reference, username);
    }

    @Transactional
    public int deleteByCartUserUsername(String username) {
        Cart cart = cartService.findByUserUsername(username);
        cart.setCartItems(null);
        cartService.update(cart);
        return cartItemDao.deleteByCartUserUsername(username);
    }

    @Transactional
    public CartItem save(CartItem cartItem, Long id) {
        generateReference(cartItem);
        Cart cart = cartService.findById(id);
        cart.getCartItems().size();
        CartItem found = findByReferenceAndCartUserUsername(cartItem.getReference(),
                cart.getUser().getUsername());

        if (found != null) {
            found.setQuantity(found.getQuantity() + cartItem.getQuantity());
            cartItemDao.save(found);
            cartService.update(cart);
            return found;
        } else {
            cartItem.setCart(cart);
            cartItem = cartItemDao.save(cartItem);
            if (cart.getCartItems() == null)
                cart.setCartItems(new ArrayList<CartItem>());
            cart.getCartItems().add(cartItem);
            cartService.update(cart);
        }
        return cartItem;
    }

    void update(CartItem cartItem) {
        cartItemDao.save(cartItem);
    }

    private void generateReference(CartItem cartItem) {
        String reference = new String(cartItem.getProduct().getLabel());
        if (cartItem.getProductVariations() != null) {
            sortVariations(cartItem);
            for (ProductVariation productVariation : cartItem.getProductVariations()) {
                reference += "_" + productVariation.getValue();
            }
        }
        cartItem.setReference(reference);
    }

    private void sortVariations(CartItem cartItem) {
        Collections.sort(cartItem.getProductVariations(), new Comparator<ProductVariation>() {
            public int compare(ProductVariation p1, ProductVariation p2) {
                return p1.getType().compareTo(p2.getType());
            }
        });
    }

}
