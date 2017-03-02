package com.isoftnet.javagap.repository;

import com.isoftnet.javagap.domain.Help;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Help entity.
 */
@SuppressWarnings("unused")
public interface HelpRepository extends JpaRepository<Help,Long> {

}
