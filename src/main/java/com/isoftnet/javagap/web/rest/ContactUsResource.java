package com.isoftnet.javagap.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isoftnet.javagap.domain.enumeration.ContactType;
import com.isoftnet.javagap.service.ContactUsService;
import com.isoftnet.javagap.web.rest.util.HeaderUtil;
import com.isoftnet.javagap.service.dto.ContactUsDTO;

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
 * REST controller for managing ContactUs.
 */
@RestController
@RequestMapping("/api")
public class ContactUsResource {

    private final Logger log = LoggerFactory.getLogger(ContactUsResource.class);
        
    @Inject
    private ContactUsService contactUsService;

    /**
     * POST  /contactuses : Create a new contactUs.
     *
     * @param contactUsDTO the contactUsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactUsDTO, or with status 400 (Bad Request) if the contactUs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contactuses")
    @Timed
    public ResponseEntity<ContactUsDTO> createContactUs(@Valid @RequestBody ContactUsDTO contactUsDTO) throws URISyntaxException {
        log.debug("REST request to save ContactUs : {}", contactUsDTO);
        if (contactUsDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("contactUs", "idexists", "A new contactUs cannot already have an ID")).body(null);
        }
        if(contactUsDTO.getType() == null) contactUsDTO.setType(ContactType.INFORMATION);
        ContactUsDTO result = contactUsService.save(contactUsDTO);
        return ResponseEntity.created(new URI("/api/contactuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("contactUs", result.getId().toString()))
            .body(result);
    }
    
    @PostMapping("/reportIssue")
    @Timed
    public ResponseEntity<ContactUsDTO> reportIssue(@Valid @RequestBody ContactUsDTO contactUsDTO) throws URISyntaxException {
        log.debug("REST request to save reportIssue : {}", contactUsDTO);
        contactUsDTO.setType(ContactType.SUPPORT);
        return createContactUs(contactUsDTO);
    }
    
    @PostMapping("/requestCourse")
    @Timed
    public ResponseEntity<ContactUsDTO> requestCourse(@Valid @RequestBody ContactUsDTO contactUsDTO) throws URISyntaxException {
        log.debug("REST request to save requestCourse : {}", contactUsDTO);
        contactUsDTO.setType(ContactType.REQUEST);
        return createContactUs(contactUsDTO);
    }

    /**
     * PUT  /contactuses : Updates an existing contactUs.
     *
     * @param contactUsDTO the contactUsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactUsDTO,
     * or with status 400 (Bad Request) if the contactUsDTO is not valid,
     * or with status 500 (Internal Server Error) if the contactUsDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contactuses")
    @Timed
    public ResponseEntity<ContactUsDTO> updateContactUs(@Valid @RequestBody ContactUsDTO contactUsDTO) throws URISyntaxException {
        log.debug("REST request to update ContactUs : {}", contactUsDTO);
        if (contactUsDTO.getId() == null) {
            return createContactUs(contactUsDTO);
        }
        ContactUsDTO result = contactUsService.save(contactUsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("contactUs", contactUsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contactuses : get all the contactuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contactuses in body
     */
    @GetMapping("/contactuses")
    @Timed
    public List<ContactUsDTO> getAllContactuses() {
        log.debug("REST request to get all Contactuses");
        return contactUsService.findAll();
    }

    /**
     * GET  /contactuses/:id : get the "id" contactUs.
     *
     * @param id the id of the contactUsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactUsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/contactuses/{id}")
    @Timed
    public ResponseEntity<ContactUsDTO> getContactUs(@PathVariable Long id) {
        log.debug("REST request to get ContactUs : {}", id);
        ContactUsDTO contactUsDTO = contactUsService.findOne(id);
        return Optional.ofNullable(contactUsDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /contactuses/:id : delete the "id" contactUs.
     *
     * @param id the id of the contactUsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contactuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteContactUs(@PathVariable Long id) {
        log.debug("REST request to delete ContactUs : {}", id);
        contactUsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("contactUs", id.toString())).build();
    }

}
