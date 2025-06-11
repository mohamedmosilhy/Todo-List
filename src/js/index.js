import { Controller } from "./controller/controller.js";
import { View } from "./view/view.js";
import "../css/styles.css";

// Clear any existing data
localStorage.clear();

// Load empty state
const controller = new Controller([]);

// --- Test Project Creation ---

controller.createProject("Work");
controller.createProject("Personal");
controller.createProject("Shopping");

// --- Test Set Active Project ---
controller.setActiveProject("Personal");

// --- Test Todo Creation ---

controller.createTodo(
  "Buy Milk",
  "Buy 2L milk",
  "2025-06-10",
  "high",
  "Personal"
);
controller.createTodo(
  "Call Bob",
  "Call about meeting",
  "2025-06-11",
  "medium",
  "Personal"
);

// --- Test Todo Completion ---
const todoId = controller.activeProject.todos[0].id;
controller.setTodoComplete(todoId);

// --- Test Todo Update ---
controller.updateTodo(todoId, { title: "Buy Milk & Bread", priority: "low" });
const updatedTodo = controller.activeProject.todos[0];

// --- Test Todo Deletion ---
const secondTodoId = controller.activeProject.todos[1].id;
controller.deleteTodo(secondTodoId);

// --- Test Project Deletion ---
controller.deleteProject("Shopping");

const view = new View(controller);

view.renderProjectsAndMainMenu();

view.renderTodos();
