import { createTask } from './task.js';
import { loadTasks, saveTasks } from './storage.js';
import { renderTasks } from './ui.js';
import { debounce, throttle } from './utils.js';

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const backToTopBtn = document.getElementById('back-to-top');

let tasks = loadTasks();
renderTasks(tasks, taskList);

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push(createTask(text));
    saveTasks(tasks);
    renderTasks(tasks, taskList);
    taskInput.value = '';
  }
});

searchInput.addEventListener('input', debounce(e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = tasks.filter(t => t.text.toLowerCase().includes(keyword));
  renderTasks(filtered, taskList);
}, 300));

window.addEventListener('scroll', throttle(() => {
  if (window.scrollY > 100) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
}, 200));

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
