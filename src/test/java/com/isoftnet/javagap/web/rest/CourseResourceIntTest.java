package com.isoftnet.javagap.web.rest;

import com.isoftnet.javagap.JavagapApp;

import com.isoftnet.javagap.domain.Course;
import com.isoftnet.javagap.repository.CourseRepository;
import com.isoftnet.javagap.service.CourseService;

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
 * Test class for the CourseResource REST controller.
 *
 * @see CourseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JavagapApp.class)
public class CourseResourceIntTest {

    private static final Double DEFAULT_DURATION = 1D;
    private static final Double UPDATED_DURATION = 2D;

    private static final Integer DEFAULT_WATCH_COUNT = 1;
    private static final Integer UPDATED_WATCH_COUNT = 2;

    private static final ZonedDateTime DEFAULT_PUBLISHED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PUBLISHED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_LAST_UPDATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_ABOUT = "AAAAAAAAAA";
    private static final String UPDATED_ABOUT = "BBBBBBBBBB";

    private static final String DEFAULT_PREREQUISITE = "AAAAAAAAAA";
    private static final String UPDATED_PREREQUISITE = "BBBBBBBBBB";

    private static final String DEFAULT_SYSTEM_REQUIREMENT = "AAAAAAAAAA";
    private static final String UPDATED_SYSTEM_REQUIREMENT = "BBBBBBBBBB";

    private static final String DEFAULT_REPOSITORY = "AAAAAAAAAA";
    private static final String UPDATED_REPOSITORY = "BBBBBBBBBB";

    private static final String DEFAULT_CURRICULUM = "AAAAAAAAAA";
    private static final String UPDATED_CURRICULUM = "BBBBBBBBBB";

    private static final String DEFAULT_EXPECTATIONS = "AAAAAAAAAA";
    private static final String UPDATED_EXPECTATIONS = "BBBBBBBBBB";

    private static final String DEFAULT_SPECIALIZATION = "AAAAAAAAAA";
    private static final String UPDATED_SPECIALIZATION = "BBBBBBBBBB";

    private static final Double DEFAULT_RATING = 1D;
    private static final Double UPDATED_RATING = 2D;

    private static final String DEFAULT_VIDEO_LINK = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_LINK = "BBBBBBBBBB";

    @Inject
    private CourseRepository courseRepository;

    @Inject
    private CourseService courseService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restCourseMockMvc;

    private Course course;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CourseResource courseResource = new CourseResource();
        ReflectionTestUtils.setField(courseResource, "courseService", courseService);
        this.restCourseMockMvc = MockMvcBuilders.standaloneSetup(courseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Course createEntity(EntityManager em) {
        Course course = new Course()
                .duration(DEFAULT_DURATION)
                .watchCount(DEFAULT_WATCH_COUNT)
                .publishedDate(DEFAULT_PUBLISHED_DATE)
                .lastUpdatedDate(DEFAULT_LAST_UPDATED_DATE)
                .about(DEFAULT_ABOUT)
                .prerequisite(DEFAULT_PREREQUISITE)
                .systemRequirement(DEFAULT_SYSTEM_REQUIREMENT)
                .repository(DEFAULT_REPOSITORY)
                .curriculum(DEFAULT_CURRICULUM)
                .expectations(DEFAULT_EXPECTATIONS)
                .specialization(DEFAULT_SPECIALIZATION)
                .rating(DEFAULT_RATING)
                .videoLink(DEFAULT_VIDEO_LINK);
        return course;
    }

    @Before
    public void initTest() {
        course = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourse() throws Exception {
        int databaseSizeBeforeCreate = courseRepository.findAll().size();

        // Create the Course

        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isCreated());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeCreate + 1);
        Course testCourse = courseList.get(courseList.size() - 1);
        assertThat(testCourse.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testCourse.getWatchCount()).isEqualTo(DEFAULT_WATCH_COUNT);
        assertThat(testCourse.getPublishedDate()).isEqualTo(DEFAULT_PUBLISHED_DATE);
        assertThat(testCourse.getLastUpdatedDate()).isEqualTo(DEFAULT_LAST_UPDATED_DATE);
        assertThat(testCourse.getAbout()).isEqualTo(DEFAULT_ABOUT);
        assertThat(testCourse.getPrerequisite()).isEqualTo(DEFAULT_PREREQUISITE);
        assertThat(testCourse.getSystemRequirement()).isEqualTo(DEFAULT_SYSTEM_REQUIREMENT);
        assertThat(testCourse.getRepository()).isEqualTo(DEFAULT_REPOSITORY);
        assertThat(testCourse.getCurriculum()).isEqualTo(DEFAULT_CURRICULUM);
        assertThat(testCourse.getExpectations()).isEqualTo(DEFAULT_EXPECTATIONS);
        assertThat(testCourse.getSpecialization()).isEqualTo(DEFAULT_SPECIALIZATION);
        assertThat(testCourse.getRating()).isEqualTo(DEFAULT_RATING);
        assertThat(testCourse.getVideoLink()).isEqualTo(DEFAULT_VIDEO_LINK);
    }

    @Test
    @Transactional
    public void createCourseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courseRepository.findAll().size();

        // Create the Course with an existing ID
        Course existingCourse = new Course();
        existingCourse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingCourse)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAboutIsRequired() throws Exception {
        int databaseSizeBeforeTest = courseRepository.findAll().size();
        // set the field null
        course.setAbout(null);

        // Create the Course, which fails.

        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isBadRequest());

        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrerequisiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = courseRepository.findAll().size();
        // set the field null
        course.setPrerequisite(null);

        // Create the Course, which fails.

        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isBadRequest());

        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSystemRequirementIsRequired() throws Exception {
        int databaseSizeBeforeTest = courseRepository.findAll().size();
        // set the field null
        course.setSystemRequirement(null);

        // Create the Course, which fails.

        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isBadRequest());

        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRepositoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = courseRepository.findAll().size();
        // set the field null
        course.setRepository(null);

        // Create the Course, which fails.

        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isBadRequest());

        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCurriculumIsRequired() throws Exception {
        int databaseSizeBeforeTest = courseRepository.findAll().size();
        // set the field null
        course.setCurriculum(null);

        // Create the Course, which fails.

        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isBadRequest());

        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCourses() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        // Get all the courseList
        restCourseMockMvc.perform(get("/api/courses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(course.getId().intValue())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.doubleValue())))
            .andExpect(jsonPath("$.[*].watchCount").value(hasItem(DEFAULT_WATCH_COUNT)))
            .andExpect(jsonPath("$.[*].publishedDate").value(hasItem(sameInstant(DEFAULT_PUBLISHED_DATE))))
            .andExpect(jsonPath("$.[*].lastUpdatedDate").value(hasItem(sameInstant(DEFAULT_LAST_UPDATED_DATE))))
            .andExpect(jsonPath("$.[*].about").value(hasItem(DEFAULT_ABOUT.toString())))
            .andExpect(jsonPath("$.[*].prerequisite").value(hasItem(DEFAULT_PREREQUISITE.toString())))
            .andExpect(jsonPath("$.[*].systemRequirement").value(hasItem(DEFAULT_SYSTEM_REQUIREMENT.toString())))
            .andExpect(jsonPath("$.[*].repository").value(hasItem(DEFAULT_REPOSITORY.toString())))
            .andExpect(jsonPath("$.[*].curriculum").value(hasItem(DEFAULT_CURRICULUM.toString())))
            .andExpect(jsonPath("$.[*].expectations").value(hasItem(DEFAULT_EXPECTATIONS.toString())))
            .andExpect(jsonPath("$.[*].specialization").value(hasItem(DEFAULT_SPECIALIZATION.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())))
            .andExpect(jsonPath("$.[*].videoLink").value(hasItem(DEFAULT_VIDEO_LINK.toString())));
    }

    @Test
    @Transactional
    public void getCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        // Get the course
        restCourseMockMvc.perform(get("/api/courses/{id}", course.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(course.getId().intValue()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION.doubleValue()))
            .andExpect(jsonPath("$.watchCount").value(DEFAULT_WATCH_COUNT))
            .andExpect(jsonPath("$.publishedDate").value(sameInstant(DEFAULT_PUBLISHED_DATE)))
            .andExpect(jsonPath("$.lastUpdatedDate").value(sameInstant(DEFAULT_LAST_UPDATED_DATE)))
            .andExpect(jsonPath("$.about").value(DEFAULT_ABOUT.toString()))
            .andExpect(jsonPath("$.prerequisite").value(DEFAULT_PREREQUISITE.toString()))
            .andExpect(jsonPath("$.systemRequirement").value(DEFAULT_SYSTEM_REQUIREMENT.toString()))
            .andExpect(jsonPath("$.repository").value(DEFAULT_REPOSITORY.toString()))
            .andExpect(jsonPath("$.curriculum").value(DEFAULT_CURRICULUM.toString()))
            .andExpect(jsonPath("$.expectations").value(DEFAULT_EXPECTATIONS.toString()))
            .andExpect(jsonPath("$.specialization").value(DEFAULT_SPECIALIZATION.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING.doubleValue()))
            .andExpect(jsonPath("$.videoLink").value(DEFAULT_VIDEO_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCourse() throws Exception {
        // Get the course
        restCourseMockMvc.perform(get("/api/courses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourse() throws Exception {
        // Initialize the database
        courseService.save(course);

        int databaseSizeBeforeUpdate = courseRepository.findAll().size();

        // Update the course
        Course updatedCourse = courseRepository.findOne(course.getId());
        updatedCourse
                .duration(UPDATED_DURATION)
                .watchCount(UPDATED_WATCH_COUNT)
                .publishedDate(UPDATED_PUBLISHED_DATE)
                .lastUpdatedDate(UPDATED_LAST_UPDATED_DATE)
                .about(UPDATED_ABOUT)
                .prerequisite(UPDATED_PREREQUISITE)
                .systemRequirement(UPDATED_SYSTEM_REQUIREMENT)
                .repository(UPDATED_REPOSITORY)
                .curriculum(UPDATED_CURRICULUM)
                .expectations(UPDATED_EXPECTATIONS)
                .specialization(UPDATED_SPECIALIZATION)
                .rating(UPDATED_RATING)
                .videoLink(UPDATED_VIDEO_LINK);

        restCourseMockMvc.perform(put("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCourse)))
            .andExpect(status().isOk());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeUpdate);
        Course testCourse = courseList.get(courseList.size() - 1);
        assertThat(testCourse.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testCourse.getWatchCount()).isEqualTo(UPDATED_WATCH_COUNT);
        assertThat(testCourse.getPublishedDate()).isEqualTo(UPDATED_PUBLISHED_DATE);
        assertThat(testCourse.getLastUpdatedDate()).isEqualTo(UPDATED_LAST_UPDATED_DATE);
        assertThat(testCourse.getAbout()).isEqualTo(UPDATED_ABOUT);
        assertThat(testCourse.getPrerequisite()).isEqualTo(UPDATED_PREREQUISITE);
        assertThat(testCourse.getSystemRequirement()).isEqualTo(UPDATED_SYSTEM_REQUIREMENT);
        assertThat(testCourse.getRepository()).isEqualTo(UPDATED_REPOSITORY);
        assertThat(testCourse.getCurriculum()).isEqualTo(UPDATED_CURRICULUM);
        assertThat(testCourse.getExpectations()).isEqualTo(UPDATED_EXPECTATIONS);
        assertThat(testCourse.getSpecialization()).isEqualTo(UPDATED_SPECIALIZATION);
        assertThat(testCourse.getRating()).isEqualTo(UPDATED_RATING);
        assertThat(testCourse.getVideoLink()).isEqualTo(UPDATED_VIDEO_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingCourse() throws Exception {
        int databaseSizeBeforeUpdate = courseRepository.findAll().size();

        // Create the Course

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCourseMockMvc.perform(put("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isCreated());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCourse() throws Exception {
        // Initialize the database
        courseService.save(course);

        int databaseSizeBeforeDelete = courseRepository.findAll().size();

        // Get the course
        restCourseMockMvc.perform(delete("/api/courses/{id}", course.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
