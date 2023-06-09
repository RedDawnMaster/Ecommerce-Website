package com.ecommercebackend.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.ecommerce.models.Order;
import com.ecommercebackend.ecommerce.services.OrderService;

@RestController
@RequestMapping("api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/{username}")
    public List<Order> findByUserUsername(@PathVariable String username) {
        return orderService.findByUserUsername(username);
    }

    @GetMapping("/id/{id}")
    public boolean checkRefundable(@PathVariable Long id) {
        return this.orderService.checkRefundable(id);
    }
}
