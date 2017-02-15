package com.isoftnet.javagap.web.rest;

import com.codahale.metrics.annotation.Timed;
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
     * POST  /contactus : Create a new contactUs.
     *
     * @param contactUsDTO the contactUsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactUsDTO, or with status 400 (Bad Request) if the contactUs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contactus")
    @Timed
    public ResponseEntity<ContactUsDTO> createContactUs(@Valid @RequestBody ContactUsDTO contactUsDTO) throws URISyntaxException {
        log.debug("REST request to save ContactUs : {}", contactUsDTO);
        if (contactUsDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("contactUs", "idexists", "A new contactUs cannot already have an ID")).body(null);
        }
        ContactUsDTO result = contactUsService.save(contactUsDTO);
        return ResponseEntity.created(new URI("/api/contactus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("contactUs", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contactus : Updates an existing contactUs.
     *
     * @param contactUsDTO the contactUsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactUsDTO,
     * or with status 400 (Bad Request) if the contactUsDTO is not valid,
     * or with status 500 (Internal Server Error) if the contactUsDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contactus")
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
     * GET  /contactus : get all the contactus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contactus in body
     */
    @GetMapping("/contactus")
    @Timed
    public List<ContactUsDTO> getAllcontactus() {
        log.debug("REST request to get all contactus");
        return contactUsService.findAll();
    }

    /**
     * GET  /contactus/:id : get the "id" contactUs.
     *
     * @param id the id of the contactUsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactUsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/contactus/{id}")
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
     * DELETE  /contactus/:id : delete the "id" contactUs.
     *
     * @param id the id of the contactUsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contactus/{id}")
    @Timed
    public ResponseEntity<Void> deleteContactUs(@PathVariable Long id) {
        log.debug("REST request to delete ContactUs : {}", id);
        contactUsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("contactUs", id.toString())).build();
    }

}
