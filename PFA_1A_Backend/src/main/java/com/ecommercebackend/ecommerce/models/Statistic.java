package com.ecommercebackend.ecommerce.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "statistic")
public class Statistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double totalProducts;
    private double totalSoldProducts;
    private double totalSales;
    private double totalClients;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(double totalProducts) {
        this.totalProducts = totalProducts;
    }

    public double getTotalSoldProducts() {
        return totalSoldProducts;
    }

    public void setTotalSoldProducts(double totalSoldProducts) {
        this.totalSoldProducts = totalSoldProducts;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(double totalSales) {
        this.totalSales = totalSales;
    }

    public double getTotalClients() {
        return totalClients;
    }

    public void setTotalClients(double totalClients) {
        this.totalClients = totalClients;
    }

}
