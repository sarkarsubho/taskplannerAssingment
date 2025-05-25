const STORAGE_KEY = 'taskPlanner.tasks';

export function loadTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
