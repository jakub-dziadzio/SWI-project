package com.osu.swi.dzia_bul.swi_project.model;

import jakarta.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@Entity
@Table(name = "todo")
public class TodoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    private String task;

    private Date dueDate;

    private boolean completed;

    public TodoItem() {
    }

    @Autowired
    public TodoItem(String task, Date dueDate, boolean completed) {
        this.task = task;
        this.dueDate = dueDate;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}

