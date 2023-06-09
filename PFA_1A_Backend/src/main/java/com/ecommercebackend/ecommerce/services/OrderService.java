package com.ecommercebackend.ecommerce.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommercebackend.ecommerce.models.Order;
import com.ecommercebackend.ecommerce.models.OrderItem;
import com.ecommercebackend.ecommerce.models.User;
import com.ecommercebackend.ecommerce.repositories.OrderDao;

@Service
public class OrderService {
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private UserService userService;
    @Autowired
    private OrderItemService orderItemService;

    Order findByReference(String reference) {
        return orderDao.findByReference(reference);
    }

    private Order findById(Long id) {
        return orderDao.findById(id).orElse(null);
    }

    @Transactional
    public List<Order> findByUserUsername(String username) {
        List<Order> orders = orderDao.findByUserUsername(username);
        for (Order order : orders) {
            checkDelivered(order);
        }
        return orders;
    }

    @Transactional
    private int deleteByReference(String reference) {
        int num;
        Order order = findByReference(reference);
        User user = order.getUser();
        user.getOrders().remove(order);
        userService.update(user);
        num = orderItemService.deleteByOrderReference(reference);
        num += orderDao.deleteByReference(reference);
        return num;
    }

    private int deleteByReferenceEmpty(String reference) {
        int num = 0;
        Order order = findByReference(reference);
        User user = order.getUser();
        user.getOrders().remove(order);
        userService.update(user);
        num += orderDao.deleteByReference(reference);
        return num;
    }

    @Transactional
    int deleteByUserUsername(String username) {
        int num = 0;
        User user = userService.findByUsername(username);
        for (Order order : user.getOrders()) {
            num += orderItemService.deleteByOrderReference(order.getReference());
        }
        user.setOrders(null);
        userService.update(user);
        num += orderDao.deleteByUserUsername(username);
        return num;
    }

    @Transactional
    void save(Order order) {
        order = orderDao.save(order);
        User user = order.getUser();
        user.setTotalBought(user.getTotalBought() + order.getTotal());
        if (user.getOrders() == null)
            user.setOrders(new ArrayList<Order>());
        user.getOrders().add(order);
        userService.update(user);
        for (OrderItem orderItem : order.getOrderItems()) {
            orderItem.setOrder(order);
            orderItemService.save(orderItem);
        }
        String reference = new String(order.getUser().getUsername() + "_" + order.getId());
        order.setReference(reference);
        orderDao.save(order);
    }

    void update(Order order) {
        if (order.getOrderItems() != null && order.getOrderItems().size() != 0) {
            double total = 0;
            for (OrderItem orderItem : order.getOrderItems()) {
                total += orderItem.getQuantity() * orderItem.getProduct().getPrice();
            }
            total += order.getDeletedProductsTotal();
            order.setTotal(total);
        } else if (order.getDeletedProductsTotal() != 0) {
            order.setTotal(order.getDeletedProductsTotal());
        } else {
            deleteByReferenceEmpty(order.getReference());
            return;
        }
        orderDao.save(order);
    }

    void checkDelivered(Order order) {
        Date today = new Date();
        if (today.after(order.getDeliveryDate())) {
            order.setDelivered(true);
            orderDao.save(order);
        }
    }

    public boolean checkRefundable(Long id) {
        Order order = findById(id);
        Date today = new Date();
        Date refundDeadline = new Date(
                order.getDeliveryDate().getTime() + Order.getRefundPeriod() * 24 * 60 * 60 * 1000);
        if (today.before(refundDeadline))
            return true;
        return false;
    }
}
