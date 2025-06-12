// Import assets and utility functions
import projectImg from "../../../assets/project.svg";
import removeImg from "../../../assets/remove.svg";
import editImg from "../../../assets/edit.svg";
import { parseISO, isToday, isThisWeek } from "date-fns";

export class View {
  constructor(controller) {
    this.controller = controller;
  }

  // === Utility ===
  setActive(element) {
    document
      .querySelectorAll(".project, .today, .this-week")
      .forEach((el) => el.classList.remove("active"));
    element.classList.add("active");
  }

  clearTodos() {
    document.querySelector(".todos").innerHTML = "";
  }

  // === Initialization ===
  renderMainSection() {
    this._setupTodoDialogEvents();
    this.renderTodos();
  }

  renderProjectsAndMainMenu() {
    this._setupProjectDialogEvents();
    this._setupMainMenuEvents();
    this.renderProjects();
  }

  // === Todo Dialog Logic ===
  _setupTodoDialogEvents() {
    const dialog = document.querySelector("#todoDialog");
    const form = document.querySelector("#todoForm");
    const addBtn = document.querySelector(".dialog-add-todo");
    const cancelBtn = document.querySelector(".dialog-cancel-todo");

    document.querySelector(".add-todo").onclick = () => {
      form.reset();
      form.dataset.mode = "add";
      delete form.dataset.todoId;
      dialog.showModal();
    };

    addBtn.onclick = (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const title = data.get("title").trim();
      const description = data.get("description").trim();
      const dueDate = data.get("dueDate");
      const priority = data.get("priority");

      if (!title || !dueDate || !priority) return;

      if (form.dataset.mode === "edit") {
        this.controller.updateTodo(form.dataset.todoId, {
          title,
          description,
          dueDate,
          priority,
        });
      } else {
        this.controller.createTodo(
          title,
          description,
          dueDate,
          priority,
          this.controller.activeProject.name
        );
      }

      form.reset();
      dialog.close();
      this.renderTodos();
    };

    cancelBtn.onclick = (e) => {
      e.preventDefault();
      form.reset();
      dialog.close();
    };
  }

  // === Project Dialog Logic ===
  _setupProjectDialogEvents() {
    const dialog = document.querySelector("#projectDialog");
    const input = document.querySelector("#projectName");

    document.querySelector(".add-project").onclick = () => dialog.showModal();

    document.querySelector(".dialog-add-project").onclick = (e) => {
      e.preventDefault();
      const name = input.value.trim();
      if (!name) return;

      this.controller.createProject(name);
      input.value = "";
      dialog.close();
      this.renderProjects();
    };

    document.querySelector(".dialog-cancel-project").onclick = (e) => {
      e.preventDefault();
      input.value = "";
      dialog.close();
    };
  }

  // === Main Menu Filtering ===
  _setupMainMenuEvents() {
    const todayBtn = document.querySelector(".today");
    const thisWeekBtn = document.querySelector(".this-week");
    const todosType = document.querySelector(".todos-type");

    todayBtn.onclick = () => {
      this.setActive(todayBtn);
      todosType.textContent = "Today";
      const todos = this._getFilteredTodos(isToday);
      document.querySelector(".add-todo").style.display = "none";
      this.clearTodos();
      this.renderSpecificTodos(todos);
    };

    thisWeekBtn.onclick = () => {
      this.setActive(thisWeekBtn);
      todosType.textContent = "This Week";
      const todos = this._getFilteredTodos((date) =>
        isThisWeek(date, { weekStartsOn: 1 })
      );
      document.querySelector(".add-todo").style.display = "none";
      this.clearTodos();
      this.renderSpecificTodos(todos);
    };
  }

  _getFilteredTodos(filterFn) {
    return this.controller.projects.flatMap((project) =>
      project.todos
        .filter((todo) => filterFn(parseISO(todo.dueDate)))
        .map((todo) => ({ ...todo, projectName: project.name }))
    );
  }

  // === Todo Rendering ===
  renderTodos() {
    this.clearTodos();
    this._renderTodoList(this.controller.activeProject.todos);
  }

  renderSpecificTodos(todos) {
    this.clearTodos();
    this._renderTodoList(todos);
  }

  _renderTodoList(todos) {
    const container = document.querySelector(".todos");
    todos.forEach((todo, index) =>
      container.appendChild(
        this._createTodoElement(
          todo,
          index,
          todo.projectName || this.controller.activeProject.name
        )
      )
    );
  }

  _createTodoElement(todo, index, projectName) {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";

    // === Checkbox ===
    const label = document.createElement("label");
    label.className = "checkbox-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "completed";
    checkbox.checked = !!todo.completed;

    const id = `todo-${index}-${Math.random().toString(36).substr(2, 5)}`;
    checkbox.id = id;
    label.setAttribute("for", id);
    label.appendChild(checkbox);
    label.append(todo.title);

    checkbox.onchange = () => {
      this.controller.setActiveProject(projectName);
      this.controller.updateTodo(todo.id, { completed: !todo.completed });
    };

    label.onclick = (e) => e.stopPropagation();
    todoDiv.onclick = (e) => {
      this.showTodoDetails(todo);
      e.stopPropagation();
    };

    // === Meta Info ===
    const left = document.createElement("div");
    left.className = "left-todo-content";

    const priority = document.createElement("p");
    priority.className = "priority-label";
    priority.dataset.priority = todo.priority;
    priority.textContent = todo.priority;

    const date = document.createElement("p");
    date.className = "date";
    date.textContent = todo.dueDate;

    const editBtn = document.createElement("button");
    editBtn.className = "edit-todo";
    const editIcon = document.createElement("img");
    editIcon.src = editImg;
    editIcon.alt = "edit";
    editBtn.appendChild(editIcon);

    editBtn.onclick = (e) => {
      e.stopPropagation();
      const dialog = document.querySelector("#todoDialog");
      const form = document.querySelector("#todoForm");

      this.controller.setActiveProject(projectName);
      form.elements["title"].value = todo.title;
      form.elements["description"].value = todo.description || "";
      form.elements["dueDate"].value = todo.dueDate;
      form.elements["priority"].value = todo.priority;

      form.dataset.mode = "edit";
      form.dataset.todoId = todo.id;

      dialog.showModal();
    };

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-todo";
    const removeIcon = document.createElement("img");
    removeIcon.src = removeImg;
    removeIcon.alt = "remove";
    removeBtn.appendChild(removeIcon);

    removeBtn.onclick = (e) => {
      e.stopPropagation();
      this.controller.setActiveProject(projectName);
      this.controller.deleteTodo(todo.id);
      this.renderProjects();
      this.clearTodos();
      this.renderTodos();
    };

    [priority, date, editBtn, removeBtn].forEach((el) => left.appendChild(el));
    todoDiv.append(label, left);
    return todoDiv;
  }

  // === Project Rendering ===
  renderProjects() {
    const container = document.querySelector(".content");
    container.innerHTML = "";

    this.controller.projects.forEach((project) => {
      const div = document.createElement("div");
      div.className = "project";

      const info = document.createElement("div");
      info.className = "project-info";

      const icon = document.createElement("img");
      icon.src = projectImg;
      icon.alt = "icon";

      const title = document.createElement("p");
      title.className = "project-title";
      title.textContent = project.name;

      div.onclick = () => {
        this.setActive(div);
        this.controller.setActiveProject(project.name);
        document.querySelector(".todos-type").textContent = project.name;
        document.querySelector(".add-todo").style.display = "flex";
        this.renderTodos();
      };

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-project";
      const removeIcon = document.createElement("img");
      removeIcon.src = removeImg;
      removeIcon.alt = "remove";
      removeBtn.appendChild(removeIcon);

      removeBtn.onclick = (e) => {
        e.stopPropagation();
        const wasActive = this.controller.activeProject?.name === project.name;
        this.controller.deleteProject(project.name);

        if (wasActive && this.controller.projects.length > 0) {
          this.controller.setActiveProject(this.controller.projects[0].name);
        }

        this.renderProjects();
        this.clearTodos();
        this.renderTodos();
      };

      info.append(icon, title);
      div.append(info, removeBtn);
      container.appendChild(div);
    });
  }

  // === Todo Details Modal ===
  showTodoDetails(todo) {
    const dialog = document.getElementById("todoDetailsDialog");
    document.getElementById("detailTitle").textContent = todo.title;
    document.getElementById("detailDescription").textContent =
      todo.description || "No description";
    document.getElementById("detailDueDate").textContent = todo.dueDate;
    document.getElementById("detailPriority").textContent = todo.priority;
    document.getElementById("detailProject").textContent =
      todo.projectName || this.controller.activeProject.name;

    dialog.showModal();
    document.getElementById("closeTodoDetails").onclick = () => dialog.close();
  }
}
