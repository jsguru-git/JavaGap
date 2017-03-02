package com.isoftnet.javagap.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Help.
 */
@Entity
@Table(name = "help")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Help implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "question", length = 255, nullable = false)
    private String question;

    @NotNull
    @Size(max = 1000)
    @Column(name = "answer", length = 1000, nullable = false)
    private String answer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public Help question(String question) {
        this.question = question;
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public Help answer(String answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Help help = (Help) o;
        if (help.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, help.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Help{" +
            "id=" + id +
            ", question='" + question + "'" +
            ", answer='" + answer + "'" +
            '}';
    }
}
