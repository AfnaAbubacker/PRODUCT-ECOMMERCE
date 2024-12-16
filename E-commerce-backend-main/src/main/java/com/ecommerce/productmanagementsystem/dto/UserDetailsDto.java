package com.ecommerce.productmanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDetailsDto {
    private Integer userId;
    private String name;
    private String email;

    public UserDetailsDto(Integer userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

}
