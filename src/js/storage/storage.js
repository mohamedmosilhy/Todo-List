import { Project } from "../models/Project";
import { Todo } from "../models/Todo";

export const saveData = (projects) => {
  const todoData = {
    projects: projects.map((project) => ({
      name: project.name,
      todos: project.todos.map((todo) => ({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority,
        completed: todo.completed,
        id: todo.id,
      })),
    })),
  };
  localStorage.clear();
  localStorage.setItem("todoData", JSON.stringify(todoData));
};

export const loadData = () => {
  const dataLoaded = localStorage.getItem("todoData");
  if (dataLoaded) {
    const parsedData = JSON.parse(dataLoaded);
    return parsedData.projects.map((p) => {
      const project = new Project(p.name);
      project.todos = p.todos.map((t) => {
        const todo = new Todo(t.title, t.description, t.dueDate, t.priority);
        todo.completed = t.completed;
        todo.id = t.id;
        return todo;
      });
      return project;
    });
  }
  return [];
};
