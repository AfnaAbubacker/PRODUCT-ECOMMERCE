package com.ecommerce.productmanagementsystem.repository;

import com.ecommerce.productmanagementsystem.entity.Products;
import com.ecommerce.productmanagementsystem.entity.RatingReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer> {
    @Query("SELECT r FROM RatingReview r WHERE r.product.id = :productId")
    List<RatingReview> findByProductId(@Param("productId") Integer productId);
}
