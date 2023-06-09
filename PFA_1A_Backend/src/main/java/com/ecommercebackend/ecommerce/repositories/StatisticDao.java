package com.ecommercebackend.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommercebackend.ecommerce.models.Statistic;

@Repository
public interface StatisticDao extends JpaRepository<Statistic, Long> {

}
