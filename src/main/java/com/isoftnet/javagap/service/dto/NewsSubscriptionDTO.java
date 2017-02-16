package com.isoftnet.javagap.service.dto;

import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;


/**
 * A DTO for the NewsSubscription entity.
 */
public class NewsSubscriptionDTO implements Serializable {

    private Long id;

    @NotNull
    private String email;

    @NotNull
    @Size(max = 100)
    private String name;

    private ZonedDateTime createdOn;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public ZonedDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(ZonedDateTime createdOn) {
        this.createdOn = createdOn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NewsSubscriptionDTO newsSubscriptionDTO = (NewsSubscriptionDTO) o;

        if ( ! Objects.equals(id, newsSubscriptionDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "NewsSubscriptionDTO{" +
            "id=" + id +
            ", email='" + email + "'" +
            ", name='" + name + "'" +
            ", createdOn='" + createdOn + "'" +
            '}';
    }
}
