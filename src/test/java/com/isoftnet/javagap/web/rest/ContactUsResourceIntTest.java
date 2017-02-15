package com.isoftnet.javagap.web.rest;

import com.isoftnet.javagap.JavagapApp;

import com.isoftnet.javagap.domain.ContactUs;
import com.isoftnet.javagap.repository.ContactUsRepository;
import com.isoftnet.javagap.service.ContactUsService;
import com.isoftnet.javagap.service.dto.ContactUsDTO;
import com.isoftnet.javagap.service.mapper.ContactUsMapper;

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
 * Test class for the ContactUsResource REST controller.
 *
 * @see ContactUsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JavagapApp.class)
public class ContactUsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_ON = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_ON = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Inject
    private ContactUsRepository contactUsRepository;

    @Inject
    private ContactUsMapper contactUsMapper;

    @Inject
    private ContactUsService contactUsService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restContactUsMockMvc;

    private ContactUs contactUs;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ContactUsResource contactUsResource = new ContactUsResource();
        ReflectionTestUtils.setField(contactUsResource, "contactUsService", contactUsService);
        this.restContactUsMockMvc = MockMvcBuilders.standaloneSetup(contactUsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContactUs createEntity(EntityManager em) {
        ContactUs contactUs = new ContactUs()
                .name(DEFAULT_NAME)
                .email(DEFAULT_EMAIL)
                .phoneNumber(DEFAULT_PHONE_NUMBER)
                .message(DEFAULT_MESSAGE)
                .createdOn(DEFAULT_CREATED_ON);
        return contactUs;
    }

    @Before
    public void initTest() {
        contactUs = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactUs() throws Exception {
        int databaseSizeBeforeCreate = contactUsRepository.findAll().size();

        // Create the ContactUs
        ContactUsDTO contactUsDTO = contactUsMapper.contactUsToContactUsDTO(contactUs);

        restContactUsMockMvc.perform(post("/api/contactus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactUsDTO)))
            .andExpect(status().isCreated());

        // Validate the ContactUs in the database
        List<ContactUs> contactUsList = contactUsRepository.findAll();
        assertThat(contactUsList).hasSize(databaseSizeBeforeCreate + 1);
        ContactUs testContactUs = contactUsList.get(contactUsList.size() - 1);
        assertThat(testContactUs.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testContactUs.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testContactUs.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testContactUs.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testContactUs.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
    }

    @Test
    @Transactional
    public void createContactUsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactUsRepository.findAll().size();

        // Create the ContactUs with an existing ID
        ContactUs existingContactUs = new ContactUs();
        existingContactUs.setId(1L);
        ContactUsDTO existingContactUsDTO = contactUsMapper.contactUsToContactUsDTO(existingContactUs);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactUsMockMvc.perform(post("/api/contactus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingContactUsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<ContactUs> contactUsList = contactUsRepository.findAll();
        assertThat(contactUsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactUsRepository.findAll().size();
        // set the field null
        contactUs.setName(null);

        // Create the ContactUs, which fails.
        ContactUsDTO contactUsDTO = contactUsMapper.contactUsToContactUsDTO(contactUs);

        restContactUsMockMvc.perform(post("/api/contactus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactUsDTO)))
            .andExpect(status().isBadRequest());

        List<ContactUs> contactUsList = contactUsRepository.findAll();
        assertThat(contactUsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactUsRepository.findAll().size();
        // set the field null
        contactUs.setEmail(null);

        // Create the ContactUs, which fails.
        ContactUsDTO contactUsDTO = contactUsMapper.contactUsToContactUsDTO(contactUs);

        restContactUsMockMvc.perform(post("/api/contactus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactUsDTO)))
            .andExpect(status().isBadRequest());

        List<ContactUs> contactUsList = contactUsRepository.findAll();
        assertThat(contactUsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMessageIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactUsRepository.findAll().size();
        // set the field null
        contactUs.setMessage(null);

        // Create the ContactUs, which fails.
        ContactUsDTO contactUsDTO = contactUsMapper.contactUsToContactUsDTO(contactUs);

        restContactUsMockMvc.perform(post("/api/contactus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactUsDTO)))
            .andExpect(status().isBadRequest());

        List<ContactUs> contactUsList = contactUsRepository.findAll();
        assertThat(contactUsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllcontactus() throws Exception {
        // Initialize the database
        contactUsRepository.saveAndFlush(contactUs);

        // Get all the contactUsList
        restContactUsMockMvc.perform(get("/api/contactus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactUs.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(sameInstant(DEFAULT_CREATED_ON))));
    }

    @Test
    @Transactional
    public void getContactUs() throws Exception {
        // Initialize the database
        contactUsRepository.saveAndFlush(contactUs);

        // Get the contactUs
        restContactUsMockMvc.perform(get("/api/contactus/{id}", contactUs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contactUs.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()))
            .andExpect(jsonPath("$.createdOn").value(sameInstant(DEFAULT_CREATED_ON)));
    }

    @Test
    @Transactional
    public void getNonExistingContactUs() throws Exception {
        // Get the contactUs
        restContactUsMockMvc.perform(get("/api/contactus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactUs() throws Exception {
        // Initialize the database
        contactUsRepository.saveAndFlush(contactUs);
        int databaseSizeBeforeUpdate = contactUsRepository.findAll().size();

        // Update the contactUs
        ContactUs updatedContactUs = contactUsRepository.findOne(contactUs.getId());
        updatedContactUs
                .name(UPDATED_NAME)
                .email(UPDATED_EMAIL)
                .phoneNumber(UPDATED_PHONE_NUMBER)
                .message(UPDATED_MESSAGE)
                .createdOn(UPDATED_CREATED_ON);
        ContactUsDTO contactUsDTO = contactUsMapper.contactUsToContactUsDTO(updatedContactUs);

        restContactUsMockMvc.perform(put("/api/contactus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactUsDTO)))
            .andExpect(status().isOk());

        // Validate the ContactUs in the database
        List<ContactUs> contactUsList = contactUsRepository.findAll();
        assertThat(contactUsList).hasSize(databaseSizeBeforeUpdate);
        ContactUs testContactUs = contactUsList.get(contactUsList.size() - 1);
        assertThat(testContactUs.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testContactUs.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testContactUs.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testContactUs.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testContactUs.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
    }

    @Test
    @Transactional
    public void updateNonExistingContactUs() throws Exception {
        int databaseSizeBeforeUpdate = contactUsRepository.findAll().size();

        // Create the ContactUs
        ContactUsDTO contactUsDTO = contactUsMapper.contactUsToContactUsDTO(contactUs);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restContactUsMockMvc.perform(put("/api/contactus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactUsDTO)))
            .andExpect(status().isCreated());

        // Validate the ContactUs in the database
        List<ContactUs> contactUsList = contactUsRepository.findAll();
        assertThat(contactUsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteContactUs() throws Exception {
        // Initialize the database
        contactUsRepository.saveAndFlush(contactUs);
        int databaseSizeBeforeDelete = contactUsRepository.findAll().size();

        // Get the contactUs
        restContactUsMockMvc.perform(delete("/api/contactus/{id}", contactUs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContactUs> contactUsList = contactUsRepository.findAll();
        assertThat(contactUsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
