package com.isoftnet.javagap.web.rest;

import com.isoftnet.javagap.JavagapApp;

import com.isoftnet.javagap.domain.Help;
import com.isoftnet.javagap.repository.HelpRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HelpResource REST controller.
 *
 * @see HelpResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JavagapApp.class)
public class HelpResourceIntTest {

    private static final String DEFAULT_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION = "BBBBBBBBBB";

    private static final String DEFAULT_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER = "BBBBBBBBBB";

    @Inject
    private HelpRepository helpRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restHelpMockMvc;

    private Help help;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        HelpResource helpResource = new HelpResource();
        ReflectionTestUtils.setField(helpResource, "helpRepository", helpRepository);
        this.restHelpMockMvc = MockMvcBuilders.standaloneSetup(helpResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Help createEntity(EntityManager em) {
        Help help = new Help()
                .question(DEFAULT_QUESTION)
                .answer(DEFAULT_ANSWER);
        return help;
    }

    @Before
    public void initTest() {
        help = createEntity(em);
    }

    @Test
    @Transactional
    public void createHelp() throws Exception {
        int databaseSizeBeforeCreate = helpRepository.findAll().size();

        // Create the Help

        restHelpMockMvc.perform(post("/api/helps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(help)))
            .andExpect(status().isCreated());

        // Validate the Help in the database
        List<Help> helpList = helpRepository.findAll();
        assertThat(helpList).hasSize(databaseSizeBeforeCreate + 1);
        Help testHelp = helpList.get(helpList.size() - 1);
        assertThat(testHelp.getQuestion()).isEqualTo(DEFAULT_QUESTION);
        assertThat(testHelp.getAnswer()).isEqualTo(DEFAULT_ANSWER);
    }

    @Test
    @Transactional
    public void createHelpWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = helpRepository.findAll().size();

        // Create the Help with an existing ID
        Help existingHelp = new Help();
        existingHelp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHelpMockMvc.perform(post("/api/helps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingHelp)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Help> helpList = helpRepository.findAll();
        assertThat(helpList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkQuestionIsRequired() throws Exception {
        int databaseSizeBeforeTest = helpRepository.findAll().size();
        // set the field null
        help.setQuestion(null);

        // Create the Help, which fails.

        restHelpMockMvc.perform(post("/api/helps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(help)))
            .andExpect(status().isBadRequest());

        List<Help> helpList = helpRepository.findAll();
        assertThat(helpList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAnswerIsRequired() throws Exception {
        int databaseSizeBeforeTest = helpRepository.findAll().size();
        // set the field null
        help.setAnswer(null);

        // Create the Help, which fails.

        restHelpMockMvc.perform(post("/api/helps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(help)))
            .andExpect(status().isBadRequest());

        List<Help> helpList = helpRepository.findAll();
        assertThat(helpList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHelps() throws Exception {
        // Initialize the database
        helpRepository.saveAndFlush(help);

        // Get all the helpList
        restHelpMockMvc.perform(get("/api/helps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(help.getId().intValue())))
            .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION.toString())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER.toString())));
    }

    @Test
    @Transactional
    public void getHelp() throws Exception {
        // Initialize the database
        helpRepository.saveAndFlush(help);

        // Get the help
        restHelpMockMvc.perform(get("/api/helps/{id}", help.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(help.getId().intValue()))
            .andExpect(jsonPath("$.question").value(DEFAULT_QUESTION.toString()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHelp() throws Exception {
        // Get the help
        restHelpMockMvc.perform(get("/api/helps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHelp() throws Exception {
        // Initialize the database
        helpRepository.saveAndFlush(help);
        int databaseSizeBeforeUpdate = helpRepository.findAll().size();

        // Update the help
        Help updatedHelp = helpRepository.findOne(help.getId());
        updatedHelp
                .question(UPDATED_QUESTION)
                .answer(UPDATED_ANSWER);

        restHelpMockMvc.perform(put("/api/helps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHelp)))
            .andExpect(status().isOk());

        // Validate the Help in the database
        List<Help> helpList = helpRepository.findAll();
        assertThat(helpList).hasSize(databaseSizeBeforeUpdate);
        Help testHelp = helpList.get(helpList.size() - 1);
        assertThat(testHelp.getQuestion()).isEqualTo(UPDATED_QUESTION);
        assertThat(testHelp.getAnswer()).isEqualTo(UPDATED_ANSWER);
    }

    @Test
    @Transactional
    public void updateNonExistingHelp() throws Exception {
        int databaseSizeBeforeUpdate = helpRepository.findAll().size();

        // Create the Help

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHelpMockMvc.perform(put("/api/helps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(help)))
            .andExpect(status().isCreated());

        // Validate the Help in the database
        List<Help> helpList = helpRepository.findAll();
        assertThat(helpList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHelp() throws Exception {
        // Initialize the database
        helpRepository.saveAndFlush(help);
        int databaseSizeBeforeDelete = helpRepository.findAll().size();

        // Get the help
        restHelpMockMvc.perform(delete("/api/helps/{id}", help.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Help> helpList = helpRepository.findAll();
        assertThat(helpList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
