package com.isoftnet.javagap.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Testimonial.
 */
@Entity
@Table(name = "testimonial")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Testimonial implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(max = 25)
    @Column(name = "title", length = 25, nullable = false)
    private String title;

    @NotNull
    @Size(max = 500)
    @Column(name = "text", length = 500, nullable = false)
    private String text;

    @Column(name = "created_on")
    private ZonedDateTime createdOn;

    @NotNull
    @Size(max = 25)
    @Column(name = "created_by", length = 25, nullable = false)
    private String createdBy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Testimonial title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public Testimonial text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ZonedDateTime getCreatedOn() {
        return createdOn;
    }

    public Testimonial createdOn(ZonedDateTime createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(ZonedDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Testimonial createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Testimonial testimonial = (Testimonial) o;
        if (testimonial.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, testimonial.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Testimonial{" +
            "id=" + id +
            ", title='" + title + "'" +
            ", text='" + text + "'" +
            ", createdOn='" + createdOn + "'" +
            ", createdBy='" + createdBy + "'" +
            '}';
    }
}
