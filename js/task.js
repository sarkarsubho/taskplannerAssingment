export function createTask(text, category) {
  return {
    id: Date.now().toString(),
    text,
    category,
    completed: false,
  };
}
