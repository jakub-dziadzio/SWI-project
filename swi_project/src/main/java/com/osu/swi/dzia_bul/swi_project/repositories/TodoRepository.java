package com.osu.swi.dzia_bul.swi_project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.osu.swi.dzia_bul.swi_project.model.*;

@Repository
public interface TodoRepository extends JpaRepository<TodoItem, Long> {

    // Method to get all TodoItems
    List<TodoItem> findAll();
    
    // Method to create a new TodoItem
    TodoItem save(TodoItem todoItem);
    
    // Method to update an existing TodoItem
    TodoItem saveAndFlush(TodoItem todoItem);
    
    // Method to delete a TodoItem by ID
    void deleteById(Long id);
}