package com.isoftnet.javagap.service;

import com.isoftnet.javagap.service.dto.ContactUsDTO;
import java.util.List;

/**
 * Service Interface for managing ContactUs.
 */
public interface ContactUsService {

    /**
     * Save a contactUs.
     *
     * @param contactUsDTO the entity to save
     * @return the persisted entity
     */
    ContactUsDTO save(ContactUsDTO contactUsDTO);

    /**
     *  Get all the contactuses.
     *  
     *  @return the list of entities
     */
    List<ContactUsDTO> findAll();

    /**
     *  Get the "id" contactUs.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ContactUsDTO findOne(Long id);

    /**
     *  Delete the "id" contactUs.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
