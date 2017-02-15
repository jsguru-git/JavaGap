package com.isoftnet.javagap.repository;

import com.isoftnet.javagap.domain.ContactUs;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ContactUs entity.
 */
@SuppressWarnings("unused")
public interface ContactUsRepository extends JpaRepository<ContactUs,Long> {

}
