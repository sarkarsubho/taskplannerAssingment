import { createTask } from "./task.js";
import { loadTasks, saveTasks } from "./storage.js";
import { renderTasks } from "./ui.js";
import { debounce, throttle } from "./utils.js";

const taskInput = document.getElementById("task-input");
const categorySelect = document.getElementById("category-select");
const addBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const backToTopBtn = document.getElementById("back-to-top");
const clearAllBtn = document.getElementById("clear-all-btn");

let tasks = loadTasks();
renderTasks(tasks, taskList);

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const category = categorySelect.value;
  if (text) {
    tasks.push(createTask(text, category));
    saveTasks(tasks);
    renderTasks(tasks, taskList);
    taskInput.value = "";
  }
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    saveTasks(tasks);
    renderTasks(tasks, taskList);
  }
});

searchInput.addEventListener(
  "input",
  debounce((e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = tasks.filter(
      (t) =>
        t.text.toLowerCase().includes(keyword) ||
        t.category.toLowerCase().includes(keyword)
    );
    renderTasks(filtered, taskList);
  }, 300)
);

window.addEventListener(
  "scroll",
  throttle(() => {
    backToTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
  }, 100)
);

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
