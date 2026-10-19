#!/usr/bin/env node
const { TaskManager } = require('./taskManager');
const storage = require('./storage');

const HELP = `Task Manager Sederhana

Perintah:
  add "<judul>" [--priority high|medium|low] [--due YYYY-MM-DD]
  list [--status all|pending|done] [--sort priority]
  done <id>
  remove <id>
  help
`;

function parseFlags(args) {
  const flags = {};
  const rest = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      flags[args[i].slice(2)] = args[i + 1];
      i++;
    } else {
      rest.push(args[i]);
    }
  }
  return { flags, rest };
}

function format(task) {
  const mark = task.done ? '[x]' : '[ ]';
  const due = task.dueDate ? ` (tenggat ${task.dueDate})` : '';
  return `${mark} #${task.id} ${task.title} - ${task.priority}${due}`;
}

function run(argv) {
  const [command, ...args] = argv;
  const { flags, rest } = parseFlags(args);
  const manager = new TaskManager(storage.load());

  switch (command) {
    case 'add': {
      const task = manager.add({
        title: rest[0],
        priority: flags.priority,
        dueDate: flags.due ?? null,
      });
      storage.save(manager.tasks);
      console.log(`Ditambahkan: ${format(task)}`);
      break;
    }
    case 'list': {
      const tasks = manager.list({ status: flags.status, sortBy: flags.sort });
      console.log(tasks.length ? tasks.map(format).join('\n') : 'Belum ada tugas.');
      break;
    }
    case 'done': {
      const task = manager.complete(Number(rest[0]));
      storage.save(manager.tasks);
      console.log(`Selesai: ${format(task)}`);
      break;
    }
    case 'remove': {
      manager.remove(Number(rest[0]));
      storage.save(manager.tasks);
      console.log(`Tugas #${rest[0]} dihapus.`);
      break;
    }
    default:
      console.log(HELP);
  }
}

try {
  run(process.argv.slice(2));
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
