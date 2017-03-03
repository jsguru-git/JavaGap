package com.isoftnet.javagap.web.rest;

import com.isoftnet.javagap.JavagapApp;

import com.isoftnet.javagap.domain.Testimonial;
import com.isoftnet.javagap.repository.TestimonialRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.isoftnet.javagap.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TestimonialResource REST controller.
 *
 * @see TestimonialResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JavagapApp.class)
public class TestimonialResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_ON = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_ON = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    @Inject
    private TestimonialRepository testimonialRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restTestimonialMockMvc;

    private Testimonial testimonial;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestimonialResource testimonialResource = new TestimonialResource();
        ReflectionTestUtils.setField(testimonialResource, "testimonialRepository", testimonialRepository);
        this.restTestimonialMockMvc = MockMvcBuilders.standaloneSetup(testimonialResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testimonial createEntity(EntityManager em) {
        Testimonial testimonial = new Testimonial()
                .title(DEFAULT_TITLE)
                .text(DEFAULT_TEXT)
                .createdOn(DEFAULT_CREATED_ON)
                .createdBy(DEFAULT_CREATED_BY);
        return testimonial;
    }

    @Before
    public void initTest() {
        testimonial = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestimonial() throws Exception {
        int databaseSizeBeforeCreate = testimonialRepository.findAll().size();

        // Create the Testimonial

        restTestimonialMockMvc.perform(post("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testimonial)))
            .andExpect(status().isCreated());

        // Validate the Testimonial in the database
        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeCreate + 1);
        Testimonial testTestimonial = testimonialList.get(testimonialList.size() - 1);
        assertThat(testTestimonial.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testTestimonial.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testTestimonial.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testTestimonial.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
    }

    @Test
    @Transactional
    public void createTestimonialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testimonialRepository.findAll().size();

        // Create the Testimonial with an existing ID
        Testimonial existingTestimonial = new Testimonial();
        existingTestimonial.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestimonialMockMvc.perform(post("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingTestimonial)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = testimonialRepository.findAll().size();
        // set the field null
        testimonial.setTitle(null);

        // Create the Testimonial, which fails.

        restTestimonialMockMvc.perform(post("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testimonial)))
            .andExpect(status().isBadRequest());

        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTextIsRequired() throws Exception {
        int databaseSizeBeforeTest = testimonialRepository.findAll().size();
        // set the field null
        testimonial.setText(null);

        // Create the Testimonial, which fails.

        restTestimonialMockMvc.perform(post("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testimonial)))
            .andExpect(status().isBadRequest());

        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedByIsRequired() throws Exception {
        int databaseSizeBeforeTest = testimonialRepository.findAll().size();
        // set the field null
        testimonial.setCreatedBy(null);

        // Create the Testimonial, which fails.

        restTestimonialMockMvc.perform(post("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testimonial)))
            .andExpect(status().isBadRequest());

        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTestimonials() throws Exception {
        // Initialize the database
        testimonialRepository.saveAndFlush(testimonial);

        // Get all the testimonialList
        restTestimonialMockMvc.perform(get("/api/testimonials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testimonial.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(sameInstant(DEFAULT_CREATED_ON))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())));
    }

    @Test
    @Transactional
    public void getTestimonial() throws Exception {
        // Initialize the database
        testimonialRepository.saveAndFlush(testimonial);

        // Get the testimonial
        restTestimonialMockMvc.perform(get("/api/testimonials/{id}", testimonial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testimonial.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.createdOn").value(sameInstant(DEFAULT_CREATED_ON)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestimonial() throws Exception {
        // Get the testimonial
        restTestimonialMockMvc.perform(get("/api/testimonials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestimonial() throws Exception {
        // Initialize the database
        testimonialRepository.saveAndFlush(testimonial);
        int databaseSizeBeforeUpdate = testimonialRepository.findAll().size();

        // Update the testimonial
        Testimonial updatedTestimonial = testimonialRepository.findOne(testimonial.getId());
        updatedTestimonial
                .title(UPDATED_TITLE)
                .text(UPDATED_TEXT)
                .createdOn(UPDATED_CREATED_ON)
                .createdBy(UPDATED_CREATED_BY);

        restTestimonialMockMvc.perform(put("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestimonial)))
            .andExpect(status().isOk());

        // Validate the Testimonial in the database
        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeUpdate);
        Testimonial testTestimonial = testimonialList.get(testimonialList.size() - 1);
        assertThat(testTestimonial.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTestimonial.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testTestimonial.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testTestimonial.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingTestimonial() throws Exception {
        int databaseSizeBeforeUpdate = testimonialRepository.findAll().size();

        // Create the Testimonial

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestimonialMockMvc.perform(put("/api/testimonials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testimonial)))
            .andExpect(status().isCreated());

        // Validate the Testimonial in the database
        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestimonial() throws Exception {
        // Initialize the database
        testimonialRepository.saveAndFlush(testimonial);
        int databaseSizeBeforeDelete = testimonialRepository.findAll().size();

        // Get the testimonial
        restTestimonialMockMvc.perform(delete("/api/testimonials/{id}", testimonial.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Testimonial> testimonialList = testimonialRepository.findAll();
        assertThat(testimonialList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
