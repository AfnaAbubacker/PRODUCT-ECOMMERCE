package com.ecommerce.productmanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ecommerce.productmanagementsystem.entity.Products;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductsDto {

    private Integer product_id;
    private String product_name;
    private String product_description;
    private Integer product_price;
    private ReqRes request_response;
    private List<Products> products;
    private Products SingleProduct;
    private byte[] product_image;
}
