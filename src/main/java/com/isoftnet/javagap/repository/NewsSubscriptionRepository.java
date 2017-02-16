package com.isoftnet.javagap.repository;

import com.isoftnet.javagap.domain.NewsSubscription;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the NewsSubscription entity.
 */
@SuppressWarnings("unused")
public interface NewsSubscriptionRepository extends JpaRepository<NewsSubscription,Long> {

}
