package com.isoftnet.javagap.service.impl;

import com.isoftnet.javagap.service.CourseService;
import com.isoftnet.javagap.domain.Course;
import com.isoftnet.javagap.repository.CourseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Course.
 */
@Service
@Transactional
public class CourseServiceImpl implements CourseService{

    private final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);
    
    @Inject
    private CourseRepository courseRepository;

    /**
     * Save a course.
     *
     * @param course the entity to save
     * @return the persisted entity
     */
    public Course save(Course course) {
        log.debug("Request to save Course : {}", course);
        Course result = courseRepository.save(course);
        return result;
    }

    /**
     *  Get all the courses.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Course> findAll() {
        log.debug("Request to get all Courses");
        List<Course> result = courseRepository.findAll();

        return result;
    }

    /**
     *  Get one course by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Course findOne(Long id) {
        log.debug("Request to get Course : {}", id);
        Course course = courseRepository.findOne(id);
        return course;
    }

    /**
     *  Delete the  course by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Course : {}", id);
        courseRepository.delete(id);
    }

	@Override
	public Course findOneByName(String name)
	{
		return courseRepository.findByName(name.trim());
	}
}
