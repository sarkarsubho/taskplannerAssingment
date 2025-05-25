import { saveTasks } from "./storage.js";

export function renderTasks(tasks, container) {
  container.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <div>
      <input type="checkbox" ${task.completed ? "checked" : ""} />
      <span class=${task.completed ? "completed" : ""}>${task.text}</span>
      <small class=${task.completed ? "completed" : ""}>(${
      task.category
    })</small>
      </div>
      <button data-id="${task.id}" class="deleteBtn">Delete</button>
    `;

    li.querySelector("input").addEventListener("change", () => {
      task.completed = !task.completed;
      saveTasks(tasks);
      renderTasks(tasks, container);
    });

    li.querySelector("button").addEventListener("click", () => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks(tasks, container);
    });

    container.appendChild(li);
  });
}
