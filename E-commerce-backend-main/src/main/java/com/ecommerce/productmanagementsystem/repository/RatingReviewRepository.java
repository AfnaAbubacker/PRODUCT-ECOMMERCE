package com.ecommerce.productmanagementsystem.repository;

import com.ecommerce.productmanagementsystem.entity.RatingReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingReviewRepository extends JpaRepository<RatingReview,Integer> {
    @Query("SELECT r FROM RatingReview r WHERE r.user.id = :userId AND r.product.id = :productId")
    List<RatingReview> findByUserIdAndProductId(@Param("userId") Integer userId, @Param("productId") Integer productId);
}
