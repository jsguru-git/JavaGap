package com.isoftnet.javagap.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A NewsSubscription.
 */
@Entity
@Table(name = "news_subscription")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NewsSubscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "created_on")
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

    public NewsSubscription email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public NewsSubscription name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getCreatedOn() {
        return createdOn;
    }

    public NewsSubscription createdOn(ZonedDateTime createdOn) {
        this.createdOn = createdOn;
        return this;
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
        NewsSubscription newsSubscription = (NewsSubscription) o;
        if (newsSubscription.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, newsSubscription.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "NewsSubscription{" +
            "id=" + id +
            ", email='" + email + "'" +
            ", name='" + name + "'" +
            ", createdOn='" + createdOn + "'" +
            '}';
    }
}
