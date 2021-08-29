package com.alexpl.ecommerce.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;

@Entity
@Table(name = "product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;

    @Column(name = "sku")
    private String sku;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unit_price;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "units_in_stock")
    private Integer units_in_stock;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date date_created;

    @Column(name = "last_updated")
    @CreationTimestamp
    private Date last_updated;


}
