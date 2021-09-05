package com.alexpl.ecommerce.dao;

import com.alexpl.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

// http://localhost:8080/api/products
// "products" is the Name of JSON entry
// "products" is the reference for the path

// Add CORS (Cross-Origin Resource Sharing) support for call my repo from "localhost:4200" (By Fron End).

// i.e.: An example of a cross-origin request: the front-end JavaScript code served from https://domain-a.com uses XMLHttpRequest
// to make a request for https://domain-b.com/data.json.

//For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the
// Fetch API follow the same-origin policy. This means that a web application using those APIs can only request resources from the
// same origin the application was loaded from unless the response from other origins includes the right CORS headers.
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product,Long> {

}
