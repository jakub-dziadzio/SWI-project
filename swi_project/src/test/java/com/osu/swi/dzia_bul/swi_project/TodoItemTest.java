package com.osu.swi.dzia_bul.swi_project;
import com.osu.swi.dzia_bul.swi_project.model.TodoItem;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Date;

public class TodoItemTest {

    @Test
    public void testGetTask() {
        TodoItem item = new TodoItem("Buy groceries", new Date(), false);
        assertEquals("Buy groceries", item.getTask());
    }

    @Test
    public void testSetTask() {
        TodoItem item = new TodoItem("Buy groceries", new Date(), false);
        item.setTask("Do laundry");
        assertEquals("Do laundry", item.getTask());
    }

    @Test
    public void testGetDueDate() {
        TodoItem item = new TodoItem("Buy groceries", new Date(), false);
        assertNotNull(item.getDueDate());
    }

    @Test
    public void testSetDueDate() {
        TodoItem item = new TodoItem("Buy groceries", new Date(), false);
        Date newDate = new Date();
        item.setDueDate(newDate);
        assertEquals(newDate, item.getDueDate());
    }

    @Test
    public void testIsCompleted() {
        TodoItem item = new TodoItem("Buy groceries", new Date(), false);
        assertFalse(item.isCompleted());
    }

    @Test
    public void testSetCompleted() {
        TodoItem item = new TodoItem("Buy groceries", new Date(), false);
        item.setCompleted(true);
        assertTrue(item.isCompleted());
    }
}


