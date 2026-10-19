// taskManager.js - VERSI 1 (hasil awal dari AI, belum diperbaiki)
class TaskManager {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  add({ title, priority = 'medium', dueDate = null }) {
    const task = {
      id: this.tasks.length + 1,
      title,
      priority,
      dueDate,
      done: false,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  complete(id) {
    const task = this.tasks.find((t) => t.id === id);
    task.done = true;
    return task;
  }

  remove(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  list({ status = 'all', sortBy = null } = {}) {
    let result = [...this.tasks];
    if (status === 'done') result = result.filter((t) => t.done);
    if (status === 'pending') result = result.filter((t) => !t.done);
    if (sortBy === 'priority') {
      result.sort((a, b) => a.priority.localeCompare(b.priority));
    }
    return result;
  }
}

module.exports = { TaskManager };
