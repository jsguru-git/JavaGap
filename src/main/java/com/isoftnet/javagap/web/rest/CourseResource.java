package com.isoftnet.javagap.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isoftnet.javagap.domain.Course;
import com.isoftnet.javagap.service.CourseService;
import com.isoftnet.javagap.web.rest.util.HeaderUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Course.
 */
@RestController
@RequestMapping("/api")
public class CourseResource {

    private final Logger log = LoggerFactory.getLogger(CourseResource.class);
        
    @Inject
    private CourseService courseService;

    /**
     * POST  /courses : Create a new course.
     *
     * @param course the course to create
     * @return the ResponseEntity with status 201 (Created) and with body the new course, or with status 400 (Bad Request) if the course has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/courses")
    @Timed
    public ResponseEntity<Course> createCourse(@Valid @RequestBody Course course) throws URISyntaxException {
        log.debug("REST request to save Course : {}", course);
        if (course.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("course", "idexists", "A new course cannot already have an ID")).body(null);
        }
        Course result = courseService.save(course);
        return ResponseEntity.created(new URI("/api/courses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("course", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /courses : Updates an existing course.
     *
     * @param course the course to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated course,
     * or with status 400 (Bad Request) if the course is not valid,
     * or with status 500 (Internal Server Error) if the course couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/courses")
    @Timed
    public ResponseEntity<Course> updateCourse(@Valid @RequestBody Course course) throws URISyntaxException {
        log.debug("REST request to update Course : {}", course);
        if (course.getId() == null) {
            return createCourse(course);
        }
        Course result = courseService.save(course);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("course", course.getId().toString()))
            .body(result);
    }

    /**
     * GET  /courses : get all the courses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of courses in body
     */
    @GetMapping("/courses")
    @Timed
    public List<Course> getAllCourses() {
        log.debug("REST request to get all Courses");
        return courseService.findAll();
    }

    /**
     * GET  /courses/:id : get the "id" course.
     *
     * @param id the id of the course to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the course, or with status 404 (Not Found)
     */
    @GetMapping("/courses/{id}")
    @Timed
    public ResponseEntity<Course> getCourse(@PathVariable Long id) {
        log.debug("REST request to get Course : {}", id);
        Course course = courseService.findOne(id);
        return Optional.ofNullable(course)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /courses/:id : delete the "id" course.
     *
     * @param id the id of the course to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/courses/{id}")
    @Timed
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        log.debug("REST request to delete Course : {}", id);
        courseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("course", id.toString())).build();
    }

}
