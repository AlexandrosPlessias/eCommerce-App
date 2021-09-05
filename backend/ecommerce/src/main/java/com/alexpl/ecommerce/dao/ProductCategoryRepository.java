package com.alexpl.ecommerce.dao;

import com.alexpl.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// http://localhost:8080/api/product-category
// "productCategory" is the Name of JSON entry
// "product-category" is the reference for the path
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
