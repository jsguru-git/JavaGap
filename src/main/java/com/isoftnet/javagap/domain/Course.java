package com.isoftnet.javagap.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "duration")
    private Double duration;

    @Column(name = "watch_count")
    private Integer watchCount;

    @Column(name = "published_date")
    private ZonedDateTime publishedDate;

    @Column(name = "last_updated_date")
    private ZonedDateTime lastUpdatedDate;

    @NotNull
    @Size(max = 1000)
    @Column(name = "about", length = 1000, nullable = false)
    private String about;

    @NotNull
    @Size(max = 1000)
    @Column(name = "prerequisite", length = 1000, nullable = false)
    private String prerequisite;

    @NotNull
    @Size(max = 1000)
    @Column(name = "system_requirement", length = 1000, nullable = false)
    private String systemRequirement;

    @NotNull
    @Size(max = 500)
    @Column(name = "repository", length = 500, nullable = false)
    private String repository;

    @NotNull
    @Size(max = 1000)
    @Column(name = "curriculum", length = 1000, nullable = false)
    private String curriculum;

    @Column(name = "expectations")
    private String expectations;

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "video_link")
    private String videoLink;

    @NotNull
    @Size(max = 50)
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @NotNull
    @Size(max = 1000)
    @Column(name = "description", length = 1000, nullable = false)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getDuration() {
        return duration;
    }

    public Course duration(Double duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public Integer getWatchCount() {
        return watchCount;
    }

    public Course watchCount(Integer watchCount) {
        this.watchCount = watchCount;
        return this;
    }

    public void setWatchCount(Integer watchCount) {
        this.watchCount = watchCount;
    }

    public ZonedDateTime getPublishedDate() {
        return publishedDate;
    }

    public Course publishedDate(ZonedDateTime publishedDate) {
        this.publishedDate = publishedDate;
        return this;
    }

    public void setPublishedDate(ZonedDateTime publishedDate) {
        this.publishedDate = publishedDate;
    }

    public ZonedDateTime getLastUpdatedDate() {
        return lastUpdatedDate;
    }

    public Course lastUpdatedDate(ZonedDateTime lastUpdatedDate) {
        this.lastUpdatedDate = lastUpdatedDate;
        return this;
    }

    public void setLastUpdatedDate(ZonedDateTime lastUpdatedDate) {
        this.lastUpdatedDate = lastUpdatedDate;
    }

    public String getAbout() {
        return about;
    }

    public Course about(String about) {
        this.about = about;
        return this;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getPrerequisite() {
        return prerequisite;
    }

    public Course prerequisite(String prerequisite) {
        this.prerequisite = prerequisite;
        return this;
    }

    public void setPrerequisite(String prerequisite) {
        this.prerequisite = prerequisite;
    }

    public String getSystemRequirement() {
        return systemRequirement;
    }

    public Course systemRequirement(String systemRequirement) {
        this.systemRequirement = systemRequirement;
        return this;
    }

    public void setSystemRequirement(String systemRequirement) {
        this.systemRequirement = systemRequirement;
    }

    public String getRepository() {
        return repository;
    }

    public Course repository(String repository) {
        this.repository = repository;
        return this;
    }

    public void setRepository(String repository) {
        this.repository = repository;
    }

    public String getCurriculum() {
        return curriculum;
    }

    public Course curriculum(String curriculum) {
        this.curriculum = curriculum;
        return this;
    }

    public void setCurriculum(String curriculum) {
        this.curriculum = curriculum;
    }

    public String getExpectations() {
        return expectations;
    }

    public Course expectations(String expectations) {
        this.expectations = expectations;
        return this;
    }

    public void setExpectations(String expectations) {
        this.expectations = expectations;
    }

    public String getSpecialization() {
        return specialization;
    }

    public Course specialization(String specialization) {
        this.specialization = specialization;
        return this;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public Double getRating() {
        return rating;
    }

    public Course rating(Double rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public Course videoLink(String videoLink) {
        this.videoLink = videoLink;
        return this;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    public String getName() {
        return name;
    }

    public Course name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Course description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Course course = (Course) o;
        if (course.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, course.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + id +
            ", duration='" + duration + "'" +
            ", watchCount='" + watchCount + "'" +
            ", publishedDate='" + publishedDate + "'" +
            ", lastUpdatedDate='" + lastUpdatedDate + "'" +
            ", about='" + about + "'" +
            ", prerequisite='" + prerequisite + "'" +
            ", systemRequirement='" + systemRequirement + "'" +
            ", repository='" + repository + "'" +
            ", curriculum='" + curriculum + "'" +
            ", expectations='" + expectations + "'" +
            ", specialization='" + specialization + "'" +
            ", rating='" + rating + "'" +
            ", videoLink='" + videoLink + "'" +
            ", name='" + name + "'" +
            ", description='" + description + "'" +
            '}';
    }
}
