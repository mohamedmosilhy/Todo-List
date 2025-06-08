import { Controller } from "./controller/controller.js";
import { Project } from "./models/Project.js";
import { Todo } from "./models/Todo.js";

// Clear any existing data
localStorage.clear();

// Load empty state
const controller = new Controller([]);

// --- Test Project Creation ---
console.log("Testing project creation...");
controller.createProject("Work");
controller.createProject("Personal");
controller.createProject("Shopping");
console.assert(controller.projects.length === 3, "Should have 3 projects");

// --- Test Set Active Project ---
controller.setActiveProject("Personal");
console.assert(
  controller.activeProject.name === "Personal",
  "Active project should be Personal"
);

// --- Test Todo Creation ---
console.log("Testing todo creation...");
controller.createTodo(
  "Buy Milk",
  "Buy 2L milk",
  "2025-06-10",
  "High",
  "Personal"
);
controller.createTodo(
  "Call Bob",
  "Call about meeting",
  "2025-06-11",
  "Medium",
  "Personal"
);
console.assert(
  controller.activeProject.todos.length === 2,
  "Should have 2 todos in Personal"
);

// --- Test Todo Completion ---
const todoId = controller.activeProject.todos[0].id;
controller.setTodoComplete(todoId);
console.assert(
  controller.activeProject.todos[0].completed === true,
  "Todo should be marked complete"
);

// --- Test Todo Update ---
controller.updateTodo(todoId, { title: "Buy Milk & Bread", priority: "Low" });
const updatedTodo = controller.activeProject.todos[0];
console.assert(
  updatedTodo.title === "Buy Milk & Bread",
  "Todo title should be updated"
);
console.assert(
  updatedTodo.priority === "Low",
  "Todo priority should be updated"
);

// --- Test Todo Deletion ---
const secondTodoId = controller.activeProject.todos[1].id;
controller.deleteTodo(secondTodoId);
console.assert(
  controller.activeProject.todos.length === 1,
  "Should have 1 todo after deletion"
);

// --- Test Project Deletion ---
controller.deleteProject("Shopping");
console.assert(
  controller.projects.length === 2,
  "Should have 2 projects after deletion"
);
console.assert(
  !controller.projects.find((p) => p.name === "Shopping"),
  "Shopping project should be deleted"
);

console.log("✅ All logic tests passed!");
