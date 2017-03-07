package com.isoftnet.javagap.repository;

import com.isoftnet.javagap.domain.News;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the News entity.
 */
@SuppressWarnings("unused")
public interface NewsRepository extends JpaRepository<News,Long> {

}
