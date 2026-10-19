const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_FILE = path.join(__dirname, '..', 'tasks.json');

function load(file = DEFAULT_FILE) {
  if (!fs.existsSync(file)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    // File rusak: jangan crash, mulai dari daftar kosong.
    return [];
  }
}

function save(tasks, file = DEFAULT_FILE) {
  fs.writeFileSync(file, JSON.stringify(tasks, null, 2), 'utf8');
}

module.exports = { load, save, DEFAULT_FILE };
