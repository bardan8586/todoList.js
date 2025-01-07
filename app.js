// Task Data
let tasks = [];

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const openTaskFormBtn = document.getElementById('open-task-form-btn');
const closeTaskFormBtn = document.getElementById('close-task-form-btn');
const taskForm = document.getElementById('task-form');
const addOrUpdateTaskBtn = document.getElementById('add-or-update-task-btn');
const tasksContainer = document.getElementById('tasks-container');
const searchInput = document.getElementById('search-input');

// Dark Mode Toggle
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Open and Close Task Form
openTaskFormBtn.addEventListener('click', () => {
  taskForm.classList.remove('hidden');
});

closeTaskFormBtn.addEventListener('click', () => {
  taskForm.classList.add('hidden');
});

// Add or Update Task
addOrUpdateTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const title = document.getElementById('title-input').value.trim();
  const date = document.getElementById('date-input').value;
  const priority = document.getElementById('priority-input').value;
  const description = document.getElementById('description-input').value.trim();

  if (!title) {
    alert('Task title is required.');
    return;
  }

  const task = {
    id: Date.now(),
    title,
    date,
    priority,
    description,
    completed: false,
  };

  tasks.push(task);
  renderTasks();
  taskForm.reset();
  taskForm.classList.add('hidden');
});

// Render Tasks
function renderTasks(searchTerm = '') {
  tasksContainer.innerHTML = '';

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredTasks.forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) taskElement.classList.add('completed');

    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p><strong>Due:</strong> ${task.date || 'No date'}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <div class="task-actions">
        <button class="btn small-btn complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="btn small-btn delete-btn">Delete</button>
      </div>
    `;

    // Complete Task Button
    taskElement.querySelector('.complete-btn').addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks(searchInput.value);
    });

    // Delete Task Button
    taskElement.querySelector('.delete-btn').addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTasks(searchInput.value);
    });

    tasksContainer.appendChild(taskElement);
  });
}

// Search Tasks
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  renderTasks(searchTerm);
});

// Initial Render
renderTasks();
