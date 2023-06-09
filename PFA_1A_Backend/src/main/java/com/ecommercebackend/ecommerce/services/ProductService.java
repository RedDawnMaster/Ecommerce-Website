package com.ecommercebackend.ecommerce.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommercebackend.ecommerce.models.CartItem;
import com.ecommercebackend.ecommerce.models.Categorie;
import com.ecommercebackend.ecommerce.models.Order;
import com.ecommercebackend.ecommerce.models.OrderItem;
import com.ecommercebackend.ecommerce.models.Product;
import com.ecommercebackend.ecommerce.models.ProductVariation;
import com.ecommercebackend.ecommerce.models.ProductsToDelete;
import com.ecommercebackend.ecommerce.models.Review;
import com.ecommercebackend.ecommerce.models.Statistic;
import com.ecommercebackend.ecommerce.repositories.ProductDao;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;
    @Autowired
    private CategorieService categorieService;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private ProductVariationService productVariationService;
    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private OrderItemService orderItemService;
    @Autowired
    private StatisticService statisticService;
    @Autowired
    private ProductsToDeleteService productsToDeleteService;

    Product findByLabel(String label) {
        return productDao.findByLabel(label);
    }

    Product findById(Long id) {
        return productDao.findById(id).orElse(null);
    }

    public List<Product> findByLabelContains(String label) {
        return productDao.findByLabelContains(label);
    }

    public List<Product> findByPriceBetween(double lowerBoundPrice,
            double higherBoundPrice) {
        return productDao.findByPriceBetween(lowerBoundPrice, higherBoundPrice);
    }

    public List<Product> findByCategorieLabel(String label) {
        deleteDeletedProducts();
        return productDao.findByCategorieLabel(label);
    }

    public List<Product> findAll() {
        deleteDeletedProducts();
        return productDao.findAll();
    }

    public int countByPriceBetween(double lowerBoundPrice, double higherBoundPrice) {
        return this.productDao.countByPriceBetween(lowerBoundPrice, higherBoundPrice);
    }

    public int countByCategorieLabel(String label) {
        return this.productDao.countByCategorieLabel(label);
    }

    @Transactional
    public int deleteByLabel(String label) {
        int num = 0;
        Product product = findByLabel(label);
        Statistic statistic = statisticService.findById(1L);
        Categorie categorie = product.getCategorie();
        categorie.getProducts().remove(product);
        categorieService.update(categorie);
        if (product.getReviews() != null && product.getReviews().size() != 0)
            num += reviewService.deleteByProductLabel(label);
        List<CartItem> cartItems = cartItemService.findAll().stream().filter(c -> c.getProduct() == product).toList();
        for (CartItem cartItem : cartItems) {
            num += cartItemService.deleteByReferenceAndCartUserUsername(cartItem.getReference(),
                    cartItem.getCart().getUser().getUsername());
        }
        statistic.setTotalProducts(statistic.getTotalProducts() - 1);
        statisticService.save(statistic);
        if (checkProductRefundPeriod(product)) {
            ProductsToDelete productsToDelete = productsToDeleteService.findById(1L);
            productsToDelete.getProducts().add(product);
            productsToDeleteService.save(productsToDelete);
            return 1;
        }
        num += deleteProduct(product);
        return num;
    }

    @Transactional
    private int deleteProduct(Product product) {
        int num = 0;
        List<OrderItem> orderItems = orderItemService.findAll().stream().filter(o -> o.getProduct() == product)
                .toList();
        for (OrderItem orderItem : orderItems) {
            Order order = orderItem.getOrder();
            order.setDeletedProductsTotal(
                    order.getDeletedProductsTotal() + orderItem.getQuantity() * orderItem.getProduct().getPrice());
            order.getOrderItems().remove(orderItem);
            orderService.update(order);
            num += orderItemService.deleteByReferenceAndOrderReference(orderItem.getReference(), order.getReference());
        }
        num += productVariationService.deleteByProductLabel(product.getLabel());
        num += productDao.deleteByLabel(product.getLabel());
        return num;
    }

    @Transactional
    public Product save(Product product) {
        if (findByLabel(product.getLabel()) != null)
            return null;
        Statistic statistic = statisticService.findById(1L);
        Categorie categorie = product.getCategorie();
        product = productDao.save(product);
        if (categorie.getProducts() == null)
            categorie.setProducts(new ArrayList<Product>());
        categorie.getProducts().add(product);
        categorieService.update(categorie);
        if (product.getProductVariations() != null) {
            for (ProductVariation productVariation : product.getProductVariations()) {
                productVariation.setProduct(product);
                productVariationService.saveWith(productVariation);
            }
        }
        statistic.setTotalProducts(statistic.getTotalProducts() + 1);
        statisticService.save(statistic);
        return product;
    }

    @Transactional
    public int update(Product product) {
        Product found = findById(product.getId());

        if (!found.getLabel().equals(product.getLabel()) && findByLabel(product.getLabel()) != null)
            return -1;
        if (found.getCategorie() != product.getCategorie()) {
            Categorie oldCategorie = found.getCategorie();
            Categorie newCategorie = product.getCategorie();
            oldCategorie.getProducts().remove(product);
            if (newCategorie.getProducts() == null)
                newCategorie.setProducts(new ArrayList<Product>());
            newCategorie.getProducts().add(product);
            categorieService.update(oldCategorie);
            categorieService.update(newCategorie);
        }
        if (product.getReviews() == null)
            product.setReviews(found.getReviews());
        updateStars(product);
        productDao.save(product);
        return 1;
    }

    private void updateStars(Product product) {
        if (product.getReviews() != null && product.getReviews().size() != 0) {
            int sum = 0;
            product.setEvaluationCount(product.getReviews().size());
            for (Review review : product.getReviews()) {
                sum += review.getStars();
            }
            sum /= product.getEvaluationCount();
            product.setStars(sum);
        } else {
            product.setStars(0);
            product.setEvaluationCount(0);
        }
    }

    @Transactional
    private void deleteDeletedProducts() {
        ProductsToDelete productsToDelete = productsToDeleteService.findById(1L);
        if (productsToDelete.getProducts().size() != 0) {
            for (Product product : productsToDelete.getProducts()) {
                if (!checkProductRefundPeriod(product))
                    deleteProduct(product);
            }
        }
    }

    private boolean checkProductRefundPeriod(Product product) {
        List<OrderItem> orderItems = orderItemService.findAll().stream().filter(o -> o.getProduct() == product)
                .toList();
        for (OrderItem orderItem : orderItems) {
            Date today = new Date();
            Date refundDeadline = new Date(
                    orderItem.getOrder().getDeliveryDate().getTime() + Order.getRefundPeriod() * 24 * 60 * 60 * 1000);
            if (today.before(refundDeadline))
                return true;
        }
        return false;
    }

}
