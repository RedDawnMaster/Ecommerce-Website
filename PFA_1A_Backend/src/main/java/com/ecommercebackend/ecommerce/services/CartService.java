package com.ecommercebackend.ecommerce.services;

import java.util.ArrayList;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommercebackend.ecommerce.models.Cart;
import com.ecommercebackend.ecommerce.models.CartItem;
import com.ecommercebackend.ecommerce.models.Order;
import com.ecommercebackend.ecommerce.models.OrderItem;
import com.ecommercebackend.ecommerce.models.Product;
import com.ecommercebackend.ecommerce.models.Statistic;
import com.ecommercebackend.ecommerce.models.User;
import com.ecommercebackend.ecommerce.repositories.CartDao;

@Service
public class CartService {
    @Autowired
    private CartDao cartDao;
    @Autowired
    private UserService userService;
    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private StatisticService statisticService;
    @Autowired
    private ProductService productService;

    public Cart findByUserUsername(String username) {
        return cartDao.findByUserUsername(username);
    }

    Cart findById(Long id) {
        return cartDao.findById(id).orElse(null);
    }

    @Transactional
    int deleteByUserUsername(String username) {
        int num;
        User user = userService.findByUsername(username);
        user.setCart(null);
        userService.update(user);
        num = cartItemService.deleteByCartUserUsername(username);
        num += cartDao.deleteByUserUsername(username);
        return num;
    }

    public void save(Cart cart) {
        cartDao.save(cart);
    }

    void update(Cart cart) {
        updateTotal(cart);
        cartDao.save(cart);
    }

    public double getCartTotal(Long id) {
        Cart cart = findById(id);
        return cart.getTotal();
    }

    private void updateTotal(Cart cart) {
        double total = 0;
        if (cart.getCartItems() != null) {
            for (CartItem cartItem : cart.getCartItems()) {
                total += cartItem.getQuantity() * cartItem.getProduct().getPrice();
            }
        }

        cart.setTotal(total);
    }

    @Transactional
    public String checkout(String username) {
        Cart cart = findByUserUsername(username);
        String error = checkStocks(cart);
        if (!error.equals("Insufficient stocks for : "))
            return error;
        Order order = new Order();
        Statistic statistic = statisticService.findById(1L);
        double totalSoldProducts = 0;
        order.setTotal(cart.getTotal());
        order.setOrderDate(new Date());
        Date deliveryDate = new Date(order.getOrderDate().getTime() + Order.getDeliveryTime() * 24 * 60 * 60 * 1000);
        order.setDeliveryDate(deliveryDate);
        order.setUser(cart.getUser());
        order.setOrderItems(new ArrayList<OrderItem>());
        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            Product product = cartItem.getProduct();
            orderItem.setReference(cartItem.getReference());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setProduct(product);
            orderItem.setProductVariations(cartItem.getProductVariations());
            order.getOrderItems().add(orderItem);
            totalSoldProducts += orderItem.getQuantity();
            product.setNumberOfOrders(product.getNumberOfOrders() + orderItem.getQuantity());
            product.setStock(product.getStock() - orderItem.getQuantity());
            productService.update(product);
        }
        cartItemService.deleteByCartUserUsername(username);
        orderService.save(order);
        statistic.setTotalSales(statistic.getTotalSales() + order.getTotal());
        statistic.setTotalSoldProducts(statistic.getTotalSoldProducts() + totalSoldProducts);
        statisticService.save(statistic);
        return "completed";
    }

    private String checkStocks(Cart cart) {
        String error = new String("Insufficient stocks for : ");
        for (CartItem cartItem : cart.getCartItems()) {
            Product product = cartItem.getProduct();
            if (product.getStock() < cartItem.getQuantity())
                error += product.getLabel() + " ";
        }
        return error;
    }
}
