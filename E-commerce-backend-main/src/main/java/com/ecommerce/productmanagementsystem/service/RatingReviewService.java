package com.ecommerce.productmanagementsystem.service;

import com.ecommerce.productmanagementsystem.dto.RatingReviewDto;
import com.ecommerce.productmanagementsystem.dto.ReqRes;
import com.ecommerce.productmanagementsystem.entity.OurUsers;
import com.ecommerce.productmanagementsystem.entity.Products;
import com.ecommerce.productmanagementsystem.entity.RatingReview;
import com.ecommerce.productmanagementsystem.repository.ProductsRepository;
import com.ecommerce.productmanagementsystem.repository.RatingReviewRepository;
import com.ecommerce.productmanagementsystem.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class RatingReviewService {

    @Autowired
    private RatingReviewRepository ratingReviewRepository;
    @Autowired
    private ProductsRepository productsRepository;
    @Autowired
    private UsersRepo ourUsersRepository;


    public RatingReviewDto SaveRatingReview(RatingReviewDto ratingReviewReq) {
        RatingReviewDto responsedata = new RatingReviewDto();
        try {
            RatingReview ratingReview = new RatingReview();
            ratingReview.setRating_value(ratingReviewReq.getRating_value());
            ratingReview.setReview_description(ratingReviewReq.getReview_description());

            Products product = productsRepository.findById(ratingReviewReq.getProduct_id())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            OurUsers user = ourUsersRepository.findById(ratingReviewReq.getUser_id())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            ratingReview.setProduct(product);
            ratingReview.setUser(user);
            RatingReview savedData = ratingReviewRepository.save(ratingReview);

            if (savedData.getRating_review_id() > 0) {
                responsedata.setRequest_response(new ReqRes("Review Saved Successfully", 200, null));
            } else {
                responsedata.setRequest_response(new ReqRes("Failed to Save", 404, null));
            }

            System.out.println("Saved RatingReview: " + savedData);

        } catch (Exception e) {
            responsedata.setRequest_response(new ReqRes(null, 500, e.getMessage()));
        }
        return responsedata;
    }


    public RatingReviewDto getAllReviewRatings() {
        RatingReviewDto responsedata = new RatingReviewDto();

        try{
            List<RatingReview> result = ratingReviewRepository.findAll();
            if(!result.isEmpty()){
                responsedata.setRatingReviewList(result);
                responsedata.setRequest_response(new ReqRes("Rating & Review data found Successfully", 200, null));
            }else{
                responsedata.setRequest_response(new ReqRes("Rating & Review not Found", 404, null));
            }
        } catch (Exception e) {
            responsedata.setRequest_response(new ReqRes(null, 500, e.getMessage()));
        }
        return responsedata;
    }


    public RatingReviewDto getReviewRatingsById(Integer id) {
        RatingReviewDto responsedata = new RatingReviewDto();
        try{
            RatingReview RatingReviewById = ratingReviewRepository.findById(id).orElseThrow(()-> new RuntimeException("No Data found"));
            responsedata.setRatingReview(RatingReviewById);
            responsedata.setRequest_response(new ReqRes("Rating review with Id '"+ id +"'found successfully" , 200, null));
        } catch (Exception e) {
            responsedata.setRequest_response(new ReqRes(null, 500, e.getMessage()));
        }
        return responsedata;
    }


    public RatingReviewDto updateReviewRatingDetails(Integer id, RatingReviewDto updateReviewRatings) {
        RatingReviewDto responsedata = new RatingReviewDto();
        try{
            Optional<RatingReview> ratingReviewOptional =ratingReviewRepository.findById(id);
            if (ratingReviewOptional.isPresent()) {
                RatingReview existingData = ratingReviewOptional.get();
                existingData.setRating_value(updateReviewRatings.getRating_value());
                existingData.setReview_description(updateReviewRatings.getReview_description());
                RatingReview SavedRatingReview = ratingReviewRepository.save(existingData);
                responsedata.setRatingReview(SavedRatingReview);
                responsedata.setRequest_response(new ReqRes("Rating and Review updated successfully" , 200, null));

            } else {
                responsedata.setRequest_response(new ReqRes("Data not Found", 404, null));
            }

        } catch (Exception e) {
            responsedata.setRequest_response(new ReqRes(null, 500, e.getMessage()));
        }
        return responsedata;
    }


    public RatingReviewDto deleteReviewRatingById(Integer id) {
        RatingReviewDto responsedata = new RatingReviewDto();
        try{
            Optional<RatingReview> ratingReviewOptional = ratingReviewRepository.findById(id);
            if (ratingReviewOptional.isPresent()) {
                ratingReviewRepository.deleteById(id);
                responsedata.setRequest_response(new ReqRes("Rating and Review deleted successfully" , 200, null));
            } else {
                responsedata.setRequest_response(new ReqRes("Data not Found", 404, null));
            }
        } catch (Exception e) {
            responsedata.setRequest_response(new ReqRes(null, 500, e.getMessage()));
        }
        return responsedata;
    }


    public RatingReviewDto getExistRatingReviewByUserId(RatingReviewDto ratingReviewReq) {
        RatingReviewDto responseData = new RatingReviewDto();
        try {
            if (ratingReviewReq.getProduct_id() == null || ratingReviewReq.getUser_id() == null) {
                throw new IllegalArgumentException("Product ID and User ID must not be null.");
            }

            List<RatingReview> matchingReviews = ratingReviewRepository.findByUserIdAndProductId(
                    ratingReviewReq.getUser_id(),
                    ratingReviewReq.getProduct_id()
            );

            if (matchingReviews.isEmpty()) {
                responseData.setRequest_response(new ReqRes("No data found", 404, null));
            } else {
                List<RatingReviewDto> reviewDtos = matchingReviews.stream().map(review -> {
                    RatingReviewDto dto = new RatingReviewDto();
                    dto.setRating_review_id(review.getRating_review_id());
                    dto.setProduct_id(review.getProduct().getProduct_id());
                    dto.setRating_value(review.getRating_value());
                    dto.setReview_description(review.getReview_description());
                    dto.setUser_id(review.getUser().getId());
                    dto.setUser_name(review.getUser().getName());
                    return dto;
                }).collect(Collectors.toList());

                responseData.setRatingReviewDtoList(reviewDtos);
                responseData.setRequest_response(new ReqRes("Data fetched successfully", 200, null));
            }

        } catch (Exception e) {
            responseData.setRequest_response(new ReqRes(null, 500, e.getMessage()));
        }
        return responseData;
    }

}
