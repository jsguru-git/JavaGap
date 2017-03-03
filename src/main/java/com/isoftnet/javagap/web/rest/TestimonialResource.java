package com.isoftnet.javagap.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isoftnet.javagap.domain.Testimonial;

import com.isoftnet.javagap.repository.TestimonialRepository;
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
 * REST controller for managing Testimonial.
 */
@RestController
@RequestMapping("/api")
public class TestimonialResource {

    private final Logger log = LoggerFactory.getLogger(TestimonialResource.class);
        
    @Inject
    private TestimonialRepository testimonialRepository;

    /**
     * POST  /testimonials : Create a new testimonial.
     *
     * @param testimonial the testimonial to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testimonial, or with status 400 (Bad Request) if the testimonial has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/testimonials")
    @Timed
    public ResponseEntity<Testimonial> createTestimonial(@Valid @RequestBody Testimonial testimonial) throws URISyntaxException {
        log.debug("REST request to save Testimonial : {}", testimonial);
        if (testimonial.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("testimonial", "idexists", "A new testimonial cannot already have an ID")).body(null);
        }
        Testimonial result = testimonialRepository.save(testimonial);
        return ResponseEntity.created(new URI("/api/testimonials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("testimonial", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /testimonials : Updates an existing testimonial.
     *
     * @param testimonial the testimonial to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testimonial,
     * or with status 400 (Bad Request) if the testimonial is not valid,
     * or with status 500 (Internal Server Error) if the testimonial couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/testimonials")
    @Timed
    public ResponseEntity<Testimonial> updateTestimonial(@Valid @RequestBody Testimonial testimonial) throws URISyntaxException {
        log.debug("REST request to update Testimonial : {}", testimonial);
        if (testimonial.getId() == null) {
            return createTestimonial(testimonial);
        }
        Testimonial result = testimonialRepository.save(testimonial);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("testimonial", testimonial.getId().toString()))
            .body(result);
    }

    /**
     * GET  /testimonials : get all the testimonials.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testimonials in body
     */
    @GetMapping("/testimonials")
    @Timed
    public List<Testimonial> getAllTestimonials() {
        log.debug("REST request to get all Testimonials");
        List<Testimonial> testimonials = testimonialRepository.findAll();
        return testimonials;
    }

    /**
     * GET  /testimonials/:id : get the "id" testimonial.
     *
     * @param id the id of the testimonial to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testimonial, or with status 404 (Not Found)
     */
    @GetMapping("/testimonials/{id}")
    @Timed
    public ResponseEntity<Testimonial> getTestimonial(@PathVariable Long id) {
        log.debug("REST request to get Testimonial : {}", id);
        Testimonial testimonial = testimonialRepository.findOne(id);
        return Optional.ofNullable(testimonial)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /testimonials/:id : delete the "id" testimonial.
     *
     * @param id the id of the testimonial to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/testimonials/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        log.debug("REST request to delete Testimonial : {}", id);
        testimonialRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("testimonial", id.toString())).build();
    }

}
