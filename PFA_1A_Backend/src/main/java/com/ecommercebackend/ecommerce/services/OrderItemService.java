package com.ecommercebackend.ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommercebackend.ecommerce.models.Order;
import com.ecommercebackend.ecommerce.models.OrderItem;
import com.ecommercebackend.ecommerce.models.Product;
import com.ecommercebackend.ecommerce.models.Statistic;
import com.ecommercebackend.ecommerce.models.User;
import com.ecommercebackend.ecommerce.repositories.OrderItemDao;

@Service
public class OrderItemService {
    @Autowired
    private OrderItemDao orderItemDao;
    @Autowired
    private OrderService orderService;
    @Autowired
    private ProductService productService;
    @Autowired
    private StatisticService statisticService;
    @Autowired
    private UserService userService;

    private OrderItem findByReferenceAndOrderReference(String reference, String oReference) {
        return orderItemDao.findByReferenceAndOrderReference(reference, oReference);
    }

    OrderItem findById(Long id) {
        return orderItemDao.findById(id).orElse(null);
    }

    List<OrderItem> findAll() {
        return orderItemDao.findAll();
    }

    @Transactional
    int deleteByReferenceAndOrderReference(String reference, String oReference) {
        OrderItem orderItem = findByReferenceAndOrderReference(reference, oReference);
        Order order = orderItem.getOrder();
        order.getOrderItems().remove(orderItem);
        orderService.update(order);
        return orderItemDao.deleteByReferenceAndOrderReference(reference, oReference);
    }

    @Transactional
    int deleteByOrderReference(String reference) {
        Order order = orderService.findByReference(reference);
        order.setOrderItems(null);
        orderService.update(order);
        return orderItemDao.deleteByOrderReference(reference);
    }

    @Transactional
    public void refund(String reference, String oReference) {
        OrderItem orderItem = findByReferenceAndOrderReference(reference, oReference);
        Order order = orderItem.getOrder();
        User user = order.getUser();
        Statistic statistic = statisticService.findById(1L);
        Product product = orderItem.getProduct();
        order.getOrderItems().remove(orderItem);
        orderService.update(order);
        user.setTotalBought(user.getTotalBought() - (orderItem.getQuantity() * orderItem.getProduct().getPrice()));
        userService.update(user);
        product.setStock(product.getStock() + orderItem.getQuantity());
        product.setNumberOfOrders(product.getNumberOfOrders() - orderItem.getQuantity());
        productService.update(product);
        statistic
                .setTotalSales(
                        statistic.getTotalSales() - (orderItem.getQuantity() * orderItem.getProduct().getPrice()));
        statistic.setTotalSoldProducts(statistic.getTotalSoldProducts() - orderItem.getQuantity());
        statisticService.save(statistic);
        deleteByReferenceAndOrderReference(reference, oReference);
    }

    void save(OrderItem orderItem) {
        orderItemDao.save(orderItem);
    }
}
