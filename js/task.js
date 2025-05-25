export function createTask(text) {
  return {
    id: Date.now().toString(),
    text,
    completed: false
  };
}
  