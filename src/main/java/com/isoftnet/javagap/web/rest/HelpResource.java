package com.isoftnet.javagap.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isoftnet.javagap.domain.Help;

import com.isoftnet.javagap.repository.HelpRepository;
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
 * REST controller for managing Help.
 */
@RestController
@RequestMapping("/api")
public class HelpResource {

    private final Logger log = LoggerFactory.getLogger(HelpResource.class);
        
    @Inject
    private HelpRepository helpRepository;

    /**
     * POST  /helps : Create a new help.
     *
     * @param help the help to create
     * @return the ResponseEntity with status 201 (Created) and with body the new help, or with status 400 (Bad Request) if the help has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/helps")
    @Timed
    public ResponseEntity<Help> createHelp(@Valid @RequestBody Help help) throws URISyntaxException {
        log.debug("REST request to save Help : {}", help);
        if (help.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("help", "idexists", "A new help cannot already have an ID")).body(null);
        }
        Help result = helpRepository.save(help);
        return ResponseEntity.created(new URI("/api/helps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("help", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /helps : Updates an existing help.
     *
     * @param help the help to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated help,
     * or with status 400 (Bad Request) if the help is not valid,
     * or with status 500 (Internal Server Error) if the help couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/helps")
    @Timed
    public ResponseEntity<Help> updateHelp(@Valid @RequestBody Help help) throws URISyntaxException {
        log.debug("REST request to update Help : {}", help);
        if (help.getId() == null) {
            return createHelp(help);
        }
        Help result = helpRepository.save(help);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("help", help.getId().toString()))
            .body(result);
    }

    /**
     * GET  /helps : get all the helps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of helps in body
     */
    @GetMapping("/helps")
    @Timed
    public List<Help> getAllHelps() {
        log.debug("REST request to get all Helps");
        List<Help> helps = helpRepository.findAll();
        return helps;
    }

    /**
     * GET  /helps/:id : get the "id" help.
     *
     * @param id the id of the help to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the help, or with status 404 (Not Found)
     */
    @GetMapping("/helps/{id}")
    @Timed
    public ResponseEntity<Help> getHelp(@PathVariable Long id) {
        log.debug("REST request to get Help : {}", id);
        Help help = helpRepository.findOne(id);
        return Optional.ofNullable(help)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /helps/:id : delete the "id" help.
     *
     * @param id the id of the help to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/helps/{id}")
    @Timed
    public ResponseEntity<Void> deleteHelp(@PathVariable Long id) {
        log.debug("REST request to delete Help : {}", id);
        helpRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("help", id.toString())).build();
    }

}
