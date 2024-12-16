package com.ecommerce.productmanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ecommerce.productmanagementsystem.entity.RatingReview;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class RatingReviewDto {

    private Integer rating_review_id;
    private Integer rating_value;
    private String review_description;
    private ReqRes request_response;
    private List<RatingReview> ratingReviewList;
    private RatingReview ratingReview;
    private Integer product_id;
    private Integer user_id;
    private String user_name;
    private List<RatingReviewDto> ratingReviewDtoList;
}
