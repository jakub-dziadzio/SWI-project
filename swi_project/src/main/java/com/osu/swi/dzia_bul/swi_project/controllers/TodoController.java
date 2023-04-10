package com.osu.swi.dzia_bul.swi_project.controllers;

import com.osu.swi.dzia_bul.swi_project.repositories.TodoRepository;
import com.osu.swi.dzia_bul.swi_project.model.*;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/")
    public List<TodoItem> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping("/")
    public TodoItem createTodo(@RequestBody TodoItem todo) {
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoItem> updateTodo(@PathVariable(value = "id") Long todoId,
                                           @RequestBody TodoItem todoDetails) {
                                            TodoItem todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("TodoItem not found with id: " + todoId));

        todo.setTask(todoDetails.getTask());
        todo.setDueDate(todoDetails.getDueDate());
        todo.setCompleted(todoDetails.isCompleted());

        final TodoItem updatedTodo = todoRepository.save(todo);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteTodo(@PathVariable(value = "id") Long todoId) {
        TodoItem todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("TodoItem not found with id: " + todoId));

        todoRepository.delete(todo);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}

