// taskManager.js - VERSI 2 (setelah evaluasi, debugging, dan perbaikan)
const PRIORITIES = ['high', 'medium', 'low'];
const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

class TaskManager {
  constructor(tasks = []) {
    this.tasks = tasks;
    // Id berikutnya selalu di atas id terbesar, bukan berdasarkan jumlah tugas.
    this.nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  }

  add({ title, priority = 'medium', dueDate = null } = {}) {
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('Judul tugas wajib diisi.');
    }
    if (!PRIORITIES.includes(priority)) {
      throw new Error(`Prioritas harus salah satu dari: ${PRIORITIES.join(', ')}.`);
    }
    if (dueDate !== null && !isValidDate(dueDate)) {
      throw new Error('Format tanggal harus YYYY-MM-DD dan tanggalnya harus valid.');
    }
    const task = {
      id: this.nextId++,
      title: title.trim(),
      priority,
      dueDate,
      done: false,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  find(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new Error(`Tugas dengan id ${id} tidak ditemukan.`);
    return task;
  }

  complete(id) {
    const task = this.find(id);
    task.done = true;
    return task;
  }

  remove(id) {
    this.find(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  list({ status = 'all', sortBy = null } = {}) {
    let result = [...this.tasks];
    if (status === 'done') result = result.filter((t) => t.done);
    if (status === 'pending') result = result.filter((t) => !t.done);
    if (sortBy === 'priority') {
      result.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
    }
    return result;
  }
}

module.exports = { TaskManager, PRIORITIES, isValidDate };
