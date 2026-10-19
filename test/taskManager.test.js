const test = require('node:test');
const assert = require('node:assert');
const { TaskManager } = require('../src/taskManager');

test('add: menambah tugas dengan nilai default', () => {
  const tm = new TaskManager();
  const t = tm.add({ title: 'Belajar JavaScript' });
  assert.strictEqual(t.title, 'Belajar JavaScript');
  assert.strictEqual(t.priority, 'medium');
  assert.strictEqual(t.done, false);
});

test('add: judul kosong ditolak', () => {
  const tm = new TaskManager();
  assert.throws(() => tm.add({ title: '   ' }), /judul/i);
});

test('add: prioritas tidak valid ditolak', () => {
  const tm = new TaskManager();
  assert.throws(() => tm.add({ title: 'A', priority: 'urgent' }), /prioritas/i);
});

test('add: tanggal tenggat tidak valid ditolak', () => {
  const tm = new TaskManager();
  assert.throws(() => tm.add({ title: 'A', dueDate: '2026-13-45' }), /tanggal/i);
});

test('id tetap unik setelah ada tugas yang dihapus', () => {
  const tm = new TaskManager();
  const a = tm.add({ title: 'A' });
  tm.add({ title: 'B' });
  tm.remove(a.id);
  const c = tm.add({ title: 'C' });
  const ids = tm.list().map((t) => t.id);
  assert.strictEqual(new Set(ids).size, ids.length);
  assert.notStrictEqual(c.id, 2);
});

test('complete: id tidak ditemukan melempar error yang jelas', () => {
  const tm = new TaskManager();
  assert.throws(() => tm.complete(99), /tidak ditemukan/i);
});

test('list: filter status done dan pending', () => {
  const tm = new TaskManager();
  const a = tm.add({ title: 'A' });
  tm.add({ title: 'B' });
  tm.complete(a.id);
  assert.strictEqual(tm.list({ status: 'done' }).length, 1);
  assert.strictEqual(tm.list({ status: 'pending' }).length, 1);
});

test('list: urut prioritas high -> medium -> low', () => {
  const tm = new TaskManager();
  tm.add({ title: 'rendah', priority: 'low' });
  tm.add({ title: 'tinggi', priority: 'high' });
  tm.add({ title: 'sedang', priority: 'medium' });
  const order = tm.list({ sortBy: 'priority' }).map((t) => t.priority);
  assert.deepStrictEqual(order, ['high', 'medium', 'low']);
});
