package com.ecommerce.productmanagementsystem.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ecommerce.productmanagementsystem.dto.ProductsDto;
import com.ecommerce.productmanagementsystem.dto.RatingReviewDto;
import com.ecommerce.productmanagementsystem.dto.ReqRes;
import com.ecommerce.productmanagementsystem.entity.Products;
import com.ecommerce.productmanagementsystem.entity.RatingReview;
import com.ecommerce.productmanagementsystem.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductsService {
    @Autowired
    private ProductsRepository productsRepository;
    @Autowired
    private ObjectMapper objectMapper;

    public ProductsDto saveProductWithImage(String productData, MultipartFile imageFile) {
        ProductsDto productResponse = new ProductsDto();
        try {
            Products product = objectMapper.readValue(productData, Products.class);
            if (imageFile != null && !imageFile.isEmpty()) {
                System.out.println("Image size: " + imageFile.getSize());

                if (imageFile.getSize() > 5 * 1024 * 1024) {
                    productResponse.setRequest_response(new ReqRes(null, 400, "File size exceeds limit of 5MB"));
                    return productResponse;
                }
                product.setProduct_image(imageFile.getBytes());
            }
            Products savedProduct = productsRepository.save(product);
            productResponse.setSingleProduct(savedProduct);
            productResponse.setRequest_response(new ReqRes("Product saved successfully", 200, null));
        } catch (IOException e) {
            productResponse.setRequest_response(new ReqRes(null, 500, "Error processing file: " + e.getMessage()));
        } catch (Exception e) {
            productResponse.setRequest_response(new ReqRes(null, 500, e.getMessage()));
        }
        return productResponse;
    }


    public ProductsDto getAllProducts() {
        ProductsDto productresponse = new ProductsDto();
        try {
            List<Products> result = productsRepository.findAll();
            if (!result.isEmpty()) {
                productresponse.setProducts(result);
                productresponse.setRequest_response(new ReqRes("Product Found Successfully", 200, null));
            } else {
                productresponse.setRequest_response(new ReqRes("Product Found Successfully", 404, null));
            }
            return productresponse;
        } catch (Exception e) {
            productresponse.setRequest_response(new ReqRes(null, 500, e.getMessage()));
            return productresponse;
        }
    }


    public ProductsDto getProductById(Integer id) {
        ProductsDto productresponse = new ProductsDto();
        try {
            Products prodById = productsRepository.findById(id).orElseThrow(() -> new RuntimeException("Product Not found"));
            productresponse.setSingleProduct(prodById);
            productresponse.setRequest_response(new ReqRes("Product with Id '"+ id +"' found successfully" , 200, null));

        } catch (Exception e) {
            productresponse.setRequest_response(new ReqRes(null, 500, e.getMessage()));
        }
        return productresponse;
    }


    public ProductsDto updateProductWithImage(String productData, MultipartFile imageFile) {
        ProductsDto productResponse = new ProductsDto();
        try {
            Products updatedProduct = objectMapper.readValue(productData, Products.class);
            Optional<Products> existingProductOpt = productsRepository.findById(updatedProduct.getProduct_id());

            if (existingProductOpt.isPresent()) {
                Products existingProduct = existingProductOpt.get();

                if (imageFile != null && !imageFile.isEmpty()) {
                    existingProduct.setProduct_image(imageFile.getBytes());
                }

                existingProduct.setProduct_name(updatedProduct.getProduct_name());
                existingProduct.setProduct_description(updatedProduct.getProduct_description());
                existingProduct.setProduct_price(updatedProduct.getProduct_price());

                Products savedProduct = productsRepository.save(existingProduct);
                productResponse.setSingleProduct(savedProduct);
                productResponse.setRequest_response(new ReqRes("Product updated successfully", 200, null));
            } else {
                productResponse.setRequest_response(new ReqRes(null, 404, "Product not found"));
            }
        } catch (IOException e) {
            productResponse.setRequest_response(new ReqRes(null, 500, "Error processing file: " + e.getMessage()));
        } catch (Exception e) {
            productResponse.setRequest_response(new ReqRes(null, 500, e.getMessage()));
        }
        return productResponse;
    }


    public ProductsDto deleteProductById(Integer prodId) {
        ProductsDto productresponse = new ProductsDto();
        try {
            Optional<Products> productsOptional = productsRepository.findById(prodId);
            if (productsOptional.isPresent()) {
                productsRepository.deleteById(prodId);
                productresponse.setRequest_response(new ReqRes("Product deleted successfully" , 200, null));
            } else {
                productresponse.setRequest_response(new ReqRes("Product not Found", 404, null));
            }
        } catch (Exception e) {
            productresponse.setRequest_response(new ReqRes(null, 500, e.getMessage()));
        }
        return productresponse;
    }


    public RatingReviewDto getProductAllRatingReviews(RatingReviewDto ratingReviewReq) {
        RatingReviewDto responseData = new RatingReviewDto();
        try {
            if (ratingReviewReq.getProduct_id() == null) {
                throw new IllegalArgumentException("Product ID must not be null.");
            }

            List<RatingReview> matchingReviews = productsRepository.findByProductId(
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
                    dto.setUser_id(review.getUser().getId());  // Use user ID only
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
