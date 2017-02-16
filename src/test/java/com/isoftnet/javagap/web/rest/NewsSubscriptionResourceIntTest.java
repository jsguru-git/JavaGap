package com.isoftnet.javagap.web.rest;

import com.isoftnet.javagap.JavagapApp;

import com.isoftnet.javagap.domain.NewsSubscription;
import com.isoftnet.javagap.repository.NewsSubscriptionRepository;
import com.isoftnet.javagap.service.NewsSubscriptionService;
import com.isoftnet.javagap.service.dto.NewsSubscriptionDTO;
import com.isoftnet.javagap.service.mapper.NewsSubscriptionMapper;

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
 * Test class for the NewsSubscriptionResource REST controller.
 *
 * @see NewsSubscriptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JavagapApp.class)
public class NewsSubscriptionResourceIntTest {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_ON = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_ON = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Inject
    private NewsSubscriptionRepository newsSubscriptionRepository;

    @Inject
    private NewsSubscriptionMapper newsSubscriptionMapper;

    @Inject
    private NewsSubscriptionService newsSubscriptionService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restNewsSubscriptionMockMvc;

    private NewsSubscription newsSubscription;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        NewsSubscriptionResource newsSubscriptionResource = new NewsSubscriptionResource();
        ReflectionTestUtils.setField(newsSubscriptionResource, "newsSubscriptionService", newsSubscriptionService);
        this.restNewsSubscriptionMockMvc = MockMvcBuilders.standaloneSetup(newsSubscriptionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NewsSubscription createEntity(EntityManager em) {
        NewsSubscription newsSubscription = new NewsSubscription()
                .email(DEFAULT_EMAIL)
                .name(DEFAULT_NAME)
                .createdOn(DEFAULT_CREATED_ON);
        return newsSubscription;
    }

    @Before
    public void initTest() {
        newsSubscription = createEntity(em);
    }

    @Test
    @Transactional
    public void createNewsSubscription() throws Exception {
        int databaseSizeBeforeCreate = newsSubscriptionRepository.findAll().size();

        // Create the NewsSubscription
        NewsSubscriptionDTO newsSubscriptionDTO = newsSubscriptionMapper.newsSubscriptionToNewsSubscriptionDTO(newsSubscription);

        restNewsSubscriptionMockMvc.perform(post("/api/news-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsSubscriptionDTO)))
            .andExpect(status().isCreated());

        // Validate the NewsSubscription in the database
        List<NewsSubscription> newsSubscriptionList = newsSubscriptionRepository.findAll();
        assertThat(newsSubscriptionList).hasSize(databaseSizeBeforeCreate + 1);
        NewsSubscription testNewsSubscription = newsSubscriptionList.get(newsSubscriptionList.size() - 1);
        assertThat(testNewsSubscription.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testNewsSubscription.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNewsSubscription.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
    }

    @Test
    @Transactional
    public void createNewsSubscriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = newsSubscriptionRepository.findAll().size();

        // Create the NewsSubscription with an existing ID
        NewsSubscription existingNewsSubscription = new NewsSubscription();
        existingNewsSubscription.setId(1L);
        NewsSubscriptionDTO existingNewsSubscriptionDTO = newsSubscriptionMapper.newsSubscriptionToNewsSubscriptionDTO(existingNewsSubscription);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNewsSubscriptionMockMvc.perform(post("/api/news-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingNewsSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<NewsSubscription> newsSubscriptionList = newsSubscriptionRepository.findAll();
        assertThat(newsSubscriptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsSubscriptionRepository.findAll().size();
        // set the field null
        newsSubscription.setEmail(null);

        // Create the NewsSubscription, which fails.
        NewsSubscriptionDTO newsSubscriptionDTO = newsSubscriptionMapper.newsSubscriptionToNewsSubscriptionDTO(newsSubscription);

        restNewsSubscriptionMockMvc.perform(post("/api/news-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        List<NewsSubscription> newsSubscriptionList = newsSubscriptionRepository.findAll();
        assertThat(newsSubscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsSubscriptionRepository.findAll().size();
        // set the field null
        newsSubscription.setName(null);

        // Create the NewsSubscription, which fails.
        NewsSubscriptionDTO newsSubscriptionDTO = newsSubscriptionMapper.newsSubscriptionToNewsSubscriptionDTO(newsSubscription);

        restNewsSubscriptionMockMvc.perform(post("/api/news-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        List<NewsSubscription> newsSubscriptionList = newsSubscriptionRepository.findAll();
        assertThat(newsSubscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNewsSubscriptions() throws Exception {
        // Initialize the database
        newsSubscriptionRepository.saveAndFlush(newsSubscription);

        // Get all the newsSubscriptionList
        restNewsSubscriptionMockMvc.perform(get("/api/news-subscriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(newsSubscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(sameInstant(DEFAULT_CREATED_ON))));
    }

    @Test
    @Transactional
    public void getNewsSubscription() throws Exception {
        // Initialize the database
        newsSubscriptionRepository.saveAndFlush(newsSubscription);

        // Get the newsSubscription
        restNewsSubscriptionMockMvc.perform(get("/api/news-subscriptions/{id}", newsSubscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(newsSubscription.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.createdOn").value(sameInstant(DEFAULT_CREATED_ON)));
    }

    @Test
    @Transactional
    public void getNonExistingNewsSubscription() throws Exception {
        // Get the newsSubscription
        restNewsSubscriptionMockMvc.perform(get("/api/news-subscriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNewsSubscription() throws Exception {
        // Initialize the database
        newsSubscriptionRepository.saveAndFlush(newsSubscription);
        int databaseSizeBeforeUpdate = newsSubscriptionRepository.findAll().size();

        // Update the newsSubscription
        NewsSubscription updatedNewsSubscription = newsSubscriptionRepository.findOne(newsSubscription.getId());
        updatedNewsSubscription
                .email(UPDATED_EMAIL)
                .name(UPDATED_NAME)
                .createdOn(UPDATED_CREATED_ON);
        NewsSubscriptionDTO newsSubscriptionDTO = newsSubscriptionMapper.newsSubscriptionToNewsSubscriptionDTO(updatedNewsSubscription);

        restNewsSubscriptionMockMvc.perform(put("/api/news-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsSubscriptionDTO)))
            .andExpect(status().isOk());

        // Validate the NewsSubscription in the database
        List<NewsSubscription> newsSubscriptionList = newsSubscriptionRepository.findAll();
        assertThat(newsSubscriptionList).hasSize(databaseSizeBeforeUpdate);
        NewsSubscription testNewsSubscription = newsSubscriptionList.get(newsSubscriptionList.size() - 1);
        assertThat(testNewsSubscription.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testNewsSubscription.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNewsSubscription.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
    }

    @Test
    @Transactional
    public void updateNonExistingNewsSubscription() throws Exception {
        int databaseSizeBeforeUpdate = newsSubscriptionRepository.findAll().size();

        // Create the NewsSubscription
        NewsSubscriptionDTO newsSubscriptionDTO = newsSubscriptionMapper.newsSubscriptionToNewsSubscriptionDTO(newsSubscription);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNewsSubscriptionMockMvc.perform(put("/api/news-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsSubscriptionDTO)))
            .andExpect(status().isCreated());

        // Validate the NewsSubscription in the database
        List<NewsSubscription> newsSubscriptionList = newsSubscriptionRepository.findAll();
        assertThat(newsSubscriptionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNewsSubscription() throws Exception {
        // Initialize the database
        newsSubscriptionRepository.saveAndFlush(newsSubscription);
        int databaseSizeBeforeDelete = newsSubscriptionRepository.findAll().size();

        // Get the newsSubscription
        restNewsSubscriptionMockMvc.perform(delete("/api/news-subscriptions/{id}", newsSubscription.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NewsSubscription> newsSubscriptionList = newsSubscriptionRepository.findAll();
        assertThat(newsSubscriptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
