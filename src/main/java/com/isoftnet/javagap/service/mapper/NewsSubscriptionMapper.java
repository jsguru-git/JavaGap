package com.isoftnet.javagap.service.mapper;

import com.isoftnet.javagap.domain.*;
import com.isoftnet.javagap.service.dto.NewsSubscriptionDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity NewsSubscription and its DTO NewsSubscriptionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface NewsSubscriptionMapper {

    NewsSubscriptionDTO newsSubscriptionToNewsSubscriptionDTO(NewsSubscription newsSubscription);

    List<NewsSubscriptionDTO> newsSubscriptionsToNewsSubscriptionDTOs(List<NewsSubscription> newsSubscriptions);

    NewsSubscription newsSubscriptionDTOToNewsSubscription(NewsSubscriptionDTO newsSubscriptionDTO);

    List<NewsSubscription> newsSubscriptionDTOsToNewsSubscriptions(List<NewsSubscriptionDTO> newsSubscriptionDTOs);
}
