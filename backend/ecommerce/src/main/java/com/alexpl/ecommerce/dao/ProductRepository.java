package com.alexpl.ecommerce.dao;

import com.alexpl.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

// "products" is the Name of JSON entry
// "products" is the reference for the path
public interface ProductRepository extends JpaRepository<Product,Long> {

}
