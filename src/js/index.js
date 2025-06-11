import { Controller } from "./controller/controller.js";
import { Project } from "./models/Project.js";
import { Todo } from "./models/Todo.js";
import "../css/styles.css";

// Clear any existing data
localStorage.clear();

// Load empty state
const controller = new Controller([]);
