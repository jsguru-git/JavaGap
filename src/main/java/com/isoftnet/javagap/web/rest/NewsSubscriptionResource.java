package com.isoftnet.javagap.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isoftnet.javagap.service.NewsSubscriptionService;
import com.isoftnet.javagap.web.rest.util.HeaderUtil;
import com.isoftnet.javagap.service.dto.NewsSubscriptionDTO;

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
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing NewsSubscription.
 */
@RestController
@RequestMapping("/api")
public class NewsSubscriptionResource {

    private final Logger log = LoggerFactory.getLogger(NewsSubscriptionResource.class);
        
    @Inject
    private NewsSubscriptionService newsSubscriptionService;

    /**
     * POST  /newssubscriptions : Create a new newsSubscription.
     *
     * @param newsSubscriptionDTO the newsSubscriptionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new newsSubscriptionDTO, or with status 400 (Bad Request) if the newsSubscription has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/newssubscriptions")
    @Timed
    public ResponseEntity<NewsSubscriptionDTO> createNewsSubscription(@Valid @RequestBody NewsSubscriptionDTO newsSubscriptionDTO) throws URISyntaxException {
        log.debug("REST request to save NewsSubscription : {}", newsSubscriptionDTO);
        if (newsSubscriptionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("newsSubscription", "idexists", "A new newsSubscription cannot already have an ID")).body(null);
        }
        NewsSubscriptionDTO result = newsSubscriptionService.save(newsSubscriptionDTO);
        return ResponseEntity.created(new URI("/api/newssubscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("newsSubscription", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /newssubscriptions : Updates an existing newsSubscription.
     *
     * @param newsSubscriptionDTO the newsSubscriptionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated newsSubscriptionDTO,
     * or with status 400 (Bad Request) if the newsSubscriptionDTO is not valid,
     * or with status 500 (Internal Server Error) if the newsSubscriptionDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/newssubscriptions")
    @Timed
    public ResponseEntity<NewsSubscriptionDTO> updateNewsSubscription(@Valid @RequestBody NewsSubscriptionDTO newsSubscriptionDTO) throws URISyntaxException {
        log.debug("REST request to update NewsSubscription : {}", newsSubscriptionDTO);
        if (newsSubscriptionDTO.getId() == null) {
            return createNewsSubscription(newsSubscriptionDTO);
        }
        NewsSubscriptionDTO result = newsSubscriptionService.save(newsSubscriptionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("newsSubscription", newsSubscriptionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /newssubscriptions : get all the newsSubscriptions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of newsSubscriptions in body
     */
    @GetMapping("/newssubscriptions")
    @Timed
    public List<NewsSubscriptionDTO> getAllNewsSubscriptions() {
        log.debug("REST request to get all NewsSubscriptions");
        return newsSubscriptionService.findAll();
    }

    /**
     * GET  /newssubscriptions/:id : get the "id" newsSubscription.
     *
     * @param id the id of the newsSubscriptionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the newsSubscriptionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/newssubscriptions/{id}")
    @Timed
    public ResponseEntity<NewsSubscriptionDTO> getNewsSubscription(@PathVariable Long id) {
        log.debug("REST request to get NewsSubscription : {}", id);
        NewsSubscriptionDTO newsSubscriptionDTO = newsSubscriptionService.findOne(id);
        return Optional.ofNullable(newsSubscriptionDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /newssubscriptions/:id : delete the "id" newsSubscription.
     *
     * @param id the id of the newsSubscriptionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/newssubscriptions/{id}")
    @Timed
    public ResponseEntity<Void> deleteNewsSubscription(@PathVariable Long id) {
        log.debug("REST request to delete NewsSubscription : {}", id);
        newsSubscriptionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("newsSubscription", id.toString())).build();
    }

}
