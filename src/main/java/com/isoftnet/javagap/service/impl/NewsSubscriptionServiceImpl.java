package com.isoftnet.javagap.service.impl;

import com.isoftnet.javagap.service.NewsSubscriptionService;
import com.isoftnet.javagap.domain.NewsSubscription;
import com.isoftnet.javagap.repository.NewsSubscriptionRepository;
import com.isoftnet.javagap.service.dto.NewsSubscriptionDTO;
import com.isoftnet.javagap.service.mapper.NewsSubscriptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing NewsSubscription.
 */
@Service
@Transactional
public class NewsSubscriptionServiceImpl implements NewsSubscriptionService{

    private final Logger log = LoggerFactory.getLogger(NewsSubscriptionServiceImpl.class);
    
    @Inject
    private NewsSubscriptionRepository newsSubscriptionRepository;

    @Inject
    private NewsSubscriptionMapper newsSubscriptionMapper;

    /**
     * Save a newsSubscription.
     *
     * @param newsSubscriptionDTO the entity to save
     * @return the persisted entity
     */
    public NewsSubscriptionDTO save(NewsSubscriptionDTO newsSubscriptionDTO) {
        log.debug("Request to save NewsSubscription : {}", newsSubscriptionDTO);
        NewsSubscription newsSubscription = newsSubscriptionMapper.newsSubscriptionDTOToNewsSubscription(newsSubscriptionDTO);
        newsSubscription = newsSubscriptionRepository.save(newsSubscription);
        NewsSubscriptionDTO result = newsSubscriptionMapper.newsSubscriptionToNewsSubscriptionDTO(newsSubscription);
        return result;
    }

    /**
     *  Get all the newsSubscriptions.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<NewsSubscriptionDTO> findAll() {
        log.debug("Request to get all NewsSubscriptions");
        List<NewsSubscriptionDTO> result = newsSubscriptionRepository.findAll().stream()
            .map(newsSubscriptionMapper::newsSubscriptionToNewsSubscriptionDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one newsSubscription by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public NewsSubscriptionDTO findOne(Long id) {
        log.debug("Request to get NewsSubscription : {}", id);
        NewsSubscription newsSubscription = newsSubscriptionRepository.findOne(id);
        NewsSubscriptionDTO newsSubscriptionDTO = newsSubscriptionMapper.newsSubscriptionToNewsSubscriptionDTO(newsSubscription);
        return newsSubscriptionDTO;
    }

    /**
     *  Delete the  newsSubscription by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete NewsSubscription : {}", id);
        newsSubscriptionRepository.delete(id);
    }
}
