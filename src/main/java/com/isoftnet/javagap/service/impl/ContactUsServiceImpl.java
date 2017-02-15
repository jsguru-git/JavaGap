package com.isoftnet.javagap.service.impl;

import com.isoftnet.javagap.service.ContactUsService;
import com.isoftnet.javagap.domain.ContactUs;
import com.isoftnet.javagap.repository.ContactUsRepository;
import com.isoftnet.javagap.service.dto.ContactUsDTO;
import com.isoftnet.javagap.service.mapper.ContactUsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ContactUs.
 */
@Service
@Transactional
public class ContactUsServiceImpl implements ContactUsService{

    private final Logger log = LoggerFactory.getLogger(ContactUsServiceImpl.class);
    
    @Inject
    private ContactUsRepository contactUsRepository;

    @Inject
    private ContactUsMapper contactUsMapper;

    /**
     * Save a contactUs.
     *
     * @param contactUsDTO the entity to save
     * @return the persisted entity
     */
    public ContactUsDTO save(ContactUsDTO contactUsDTO) {
        log.debug("Request to save ContactUs : {}", contactUsDTO);
        ContactUs contactUs = contactUsMapper.contactUsDTOToContactUs(contactUsDTO);
        contactUs = contactUsRepository.save(contactUs);
        ContactUsDTO result = contactUsMapper.contactUsToContactUsDTO(contactUs);
        return result;
    }

    /**
     *  Get all the contactus.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<ContactUsDTO> findAll() {
        log.debug("Request to get all contactus");
        List<ContactUsDTO> result = contactUsRepository.findAll().stream()
            .map(contactUsMapper::contactUsToContactUsDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one contactUs by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public ContactUsDTO findOne(Long id) {
        log.debug("Request to get ContactUs : {}", id);
        ContactUs contactUs = contactUsRepository.findOne(id);
        ContactUsDTO contactUsDTO = contactUsMapper.contactUsToContactUsDTO(contactUs);
        return contactUsDTO;
    }

    /**
     *  Delete the  contactUs by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ContactUs : {}", id);
        contactUsRepository.delete(id);
    }
}
