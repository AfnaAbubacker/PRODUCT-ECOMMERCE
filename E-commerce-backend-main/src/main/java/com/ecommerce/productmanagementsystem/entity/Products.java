package com.ecommerce.productmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_products")
@Data
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_id;
    private String product_name;
    private String product_description;
    private Integer product_price;
    @Lob
    @Column(name = "product_image", columnDefinition = "LONGBLOB", nullable = true)
    private byte[] product_image;

}
