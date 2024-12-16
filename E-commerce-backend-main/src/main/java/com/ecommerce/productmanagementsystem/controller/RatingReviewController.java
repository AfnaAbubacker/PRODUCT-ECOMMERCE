package com.ecommerce.productmanagementsystem.controller;

import com.ecommerce.productmanagementsystem.dto.RatingReviewDto;
import com.ecommerce.productmanagementsystem.service.RatingReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RatingReviewController {

    @Autowired
    private RatingReviewService ratingReviewService;

    @PostMapping("/auth/ReviewRating-add")
    public ResponseEntity<RatingReviewDto> SaveRatingReview(@RequestBody RatingReviewDto ratingReviewReq){
        return ResponseEntity.ok(ratingReviewService.SaveRatingReview(ratingReviewReq));
    }

    @GetMapping("/auth/get-all-ReviewRating")
    public ResponseEntity<RatingReviewDto> getAllReviewRatings(){
        return ResponseEntity.ok(ratingReviewService.getAllReviewRatings());
    }

    @GetMapping("/auth/get-ReviewRating/{id}")
    public ResponseEntity<RatingReviewDto> getReviewRatingsById(@PathVariable Integer id){
        return ResponseEntity.ok(ratingReviewService.getReviewRatingsById(id));
    }

    @PutMapping("/auth/update-ReviewRating/{id}")
    public ResponseEntity<RatingReviewDto> updateReviewRatingDetails(@PathVariable Integer id, @RequestBody RatingReviewDto updateReviewRatings){
        return ResponseEntity.ok(ratingReviewService.updateReviewRatingDetails(id, updateReviewRatings));
    }

    @DeleteMapping("/auth/delete-ReviewRating/{id}")
    public ResponseEntity<RatingReviewDto> deleteReviewRatingById(@PathVariable Integer id){
        return ResponseEntity.ok(ratingReviewService.deleteReviewRatingById(id));
    }

    @PostMapping("/auth/ReviewRating-existing/")
    public ResponseEntity<RatingReviewDto> getExistRatingReviewByUserId(@RequestBody RatingReviewDto ratingReviewReq){
        return ResponseEntity.ok(ratingReviewService.getExistRatingReviewByUserId(ratingReviewReq));

    }
}
