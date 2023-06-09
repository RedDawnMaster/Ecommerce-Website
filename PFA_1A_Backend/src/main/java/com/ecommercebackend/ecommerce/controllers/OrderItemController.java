package com.ecommercebackend.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.ecommerce.services.OrderItemService;

@RestController
@RequestMapping("api/orderItem")
public class OrderItemController {
    @Autowired
    private OrderItemService orderItemService;

    @DeleteMapping("/{reference}/{oReference}")
    public void refund(@PathVariable String reference, @PathVariable String oReference) {
        orderItemService.refund(reference, oReference);
    }

}
