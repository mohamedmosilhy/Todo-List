import projectImg from "../../../assets/project.svg";
import removeImg from "../../../assets/remove.svg";
import editImg from "../../../assets/edit.svg";

export class View {
  constructor(controller) {
    this.controller = controller;
  }

  renderTodos() {
    const todoContainer = document.querySelector(".todos");

    this.controller.activeProject.todos.forEach((todo) => {
      // Create main todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      // Create label + checkbox
      const label = document.createElement("label");
      label.classList.add("checkbox-label");
      label.setAttribute("for", "completed");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "completed";
      checkbox.id = "completed";

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(todo.title));

      // Create left content container
      const leftContent = document.createElement("div");
      leftContent.classList.add("left-todo-content");

      const priorityLabel = document.createElement("p");
      priorityLabel.classList.add("priority-label");
      priorityLabel.dataset.priority = todo.priority;
      priorityLabel.textContent = todo.priority;

      const dateText = document.createElement("p");
      dateText.classList.add("date");
      dateText.textContent = todo.dueDate;

      const editBtn = document.createElement("button");
      editBtn.classList.add("edit-todo");

      const editIcon = document.createElement("img");
      editIcon.src = editImg;
      editIcon.alt = "edit";
      editBtn.appendChild(editIcon);

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-todo");

      const removeIcon = document.createElement("img");
      removeIcon.src = removeImg;
      removeIcon.alt = "remove";
      removeBtn.appendChild(removeIcon);

      // Assemble left content
      leftContent.appendChild(priorityLabel);
      leftContent.appendChild(dateText);
      leftContent.appendChild(editBtn);
      leftContent.appendChild(removeBtn);

      // Combine and append to DOM
      todoDiv.appendChild(label);
      todoDiv.appendChild(leftContent);
      todoContainer.appendChild(todoDiv);
    });
  }

  renderProjectsAndMainMenu() {
    const projectsContainer = document.querySelector(".content");
    const today = document.querySelector(".today");
    const thisWeek = document.querySelector(".this-week");

    today.addEventListener("click", (e) => {
      // render the todos at this day from all projects
    });
    thisWeek.addEventListener("click", (e) => {
      // render the todos at this week only from all projects
    });

    this.controller.projects.forEach((project) => {
      // Create main project div
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project");

      // Create project info section
      const projectInfo = document.createElement("div");
      projectInfo.classList.add("project-info");

      const icon = document.createElement("img");
      icon.src = projectImg;
      icon.alt = "icon";

      const projectTitle = document.createElement("p");
      projectTitle.classList.add("project-title");
      projectTitle.textContent = project.name;

      projectInfo.appendChild(icon);
      projectInfo.appendChild(projectTitle);

      // Create remove button
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-project");

      const removeIcon = document.createElement("img");
      removeIcon.src = removeImg;
      removeIcon.alt = "remove";

      removeButton.appendChild(removeIcon);

      // Append all to main project div
      projectDiv.appendChild(projectInfo);
      projectDiv.appendChild(removeButton);

      // Add to the DOM
      projectsContainer.appendChild(projectDiv);
    });
  }
}
