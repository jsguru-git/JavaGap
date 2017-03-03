package com.isoftnet.javagap.repository;

import com.isoftnet.javagap.domain.Testimonial;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Testimonial entity.
 */
@SuppressWarnings("unused")
public interface TestimonialRepository extends JpaRepository<Testimonial,Long> {

}
