package com.ecommerce.productmanagementsystem.controller;

import com.ecommerce.productmanagementsystem.dto.ProductsDto;
import com.ecommerce.productmanagementsystem.dto.RatingReviewDto;
import com.ecommerce.productmanagementsystem.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @PostMapping("/auth/add-product")
    public ResponseEntity<ProductsDto> saveProduct(
            @RequestParam("product") String productData,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {
        System.out.println("Received product data: " + productData);
        ProductsDto savedProduct = productsService.saveProductWithImage(productData, imageFile);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/auth/get-all-product")
    public ResponseEntity<ProductsDto> getAllProducts(){
        return ResponseEntity.ok(productsService.getAllProducts()   );

    }

    @GetMapping("/auth/get-product/{prodId}")
    public ResponseEntity<ProductsDto> getProductByID(@PathVariable Integer prodId){
        return ResponseEntity.ok(productsService.getProductById(prodId));

    }

    @PutMapping("/auth/update-product/{id}")
    public ResponseEntity<ProductsDto> updateProduct(
            @RequestParam("product") String productData,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {
        System.out.println("Received product data: " + productData);
        ProductsDto updatedProduct = productsService.updateProductWithImage(productData, imageFile);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/auth/delete-product/{prodId}")
    public ResponseEntity<ProductsDto> deleteProduct(@PathVariable Integer prodId){
        return ResponseEntity.ok(productsService.deleteProductById(prodId));
    }

    //for rating of each product
    @PostMapping("/auth/get-product-ratingreview/")
    public ResponseEntity<RatingReviewDto> getProductAllRatingReviews(@RequestBody RatingReviewDto ratingReviewReq){
        return ResponseEntity.ok(productsService.getProductAllRatingReviews(ratingReviewReq));
    }

}
