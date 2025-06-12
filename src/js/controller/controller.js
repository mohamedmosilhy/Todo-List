import { saveData, loadData } from "../storage/storage";
import { Project } from "../models/Project";
import { Todo } from "../models/Todo";

export class Controller {
  constructor() {
    this.projects = loadData() || [];
    this.activeProject = this.projects[0];
  }

  createTodo(title, description, dueDate, priority, projectName) {
    const project = this.projects.find((p) => p.name === projectName);
    const todo = new Todo(title, description, dueDate, priority);
    console.log(project);
    project.addTodo(todo);
    saveData(this.projects);
  }

  deleteTodo(todoId) {
    const todoindex = this.activeProject.todos.findIndex(
      (todo) => todo.id === todoId
    );
    this.activeProject.removeTodo(todoindex);
    saveData(this.projects);
  }

  updateTodo(todoId, updates) {
    const todo = this.activeProject.todos.find((todo) => todo.id === todoId);
    Object.keys(updates).forEach((key) => {
      todo[key] = updates[key];
    });
    saveData(this.projects);
  }

  setTodoComplete(todoId) {
    const todo = this.activeProject.todos.find((todo) => todo.id === todoId);
    todo.completed = true;
    saveData(this.projects);
  }

  setActiveProject(projectName) {
    const project = this.projects.find((p) => p.name === projectName);
    this.activeProject = project;
    saveData(this.projects);
  }

  createProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    saveData(this.projects);
  }

  deleteProject(projectName) {
    this.projects = this.projects.filter((p) => p.name !== projectName);
    saveData(this.projects);
  }
}
