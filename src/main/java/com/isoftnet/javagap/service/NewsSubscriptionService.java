package com.isoftnet.javagap.service;

import com.isoftnet.javagap.service.dto.NewsSubscriptionDTO;
import java.util.List;

/**
 * Service Interface for managing NewsSubscription.
 */
public interface NewsSubscriptionService {

    /**
     * Save a newsSubscription.
     *
     * @param newsSubscriptionDTO the entity to save
     * @return the persisted entity
     */
    NewsSubscriptionDTO save(NewsSubscriptionDTO newsSubscriptionDTO);

    /**
     *  Get all the newsSubscriptions.
     *  
     *  @return the list of entities
     */
    List<NewsSubscriptionDTO> findAll();

    /**
     *  Get the "id" newsSubscription.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    NewsSubscriptionDTO findOne(Long id);

    /**
     *  Delete the "id" newsSubscription.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
