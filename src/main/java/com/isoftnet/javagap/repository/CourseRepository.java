package com.isoftnet.javagap.repository;

import com.isoftnet.javagap.domain.Course;
import org.springframework.data.jpa.repository.*;
import java.util.Optional;
import java.util.List;

/**
 * Spring Data JPA repository for the Course entity.
 */
@SuppressWarnings("unused")
public interface CourseRepository extends JpaRepository<Course,Long> {

	Course findByName(String name);
}
