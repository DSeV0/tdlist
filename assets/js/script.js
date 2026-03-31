document.addEventListener('DOMContentLoaded', () => {
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');
const clearAll = document.getElementById('clear-all');
const darkModeToggle = document.getElementById('dark-mode-toggle');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

// Initialize dark mode
if (darkMode) {
    document.documentElement.classList.add('dark');
}

// Dark mode toggle handler
darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    if (darkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-600 p-3 bg-slate-50 dark:bg-slate-700 transition-colors';

        const label = document.createElement('label');
        label.className = 'flex items-center gap-2 cursor-pointer';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.done;
        checkbox.className = 'h-4 w-4 text-blue-600 accent-blue-600';
        checkbox.addEventListener('change', () => {
            todos[index].done = checkbox.checked;
            saveTodos();
            render();
        });

        const text = document.createElement('span');
        text.textContent = todo.text;
        text.className = todo.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-white';

        label.appendChild(checkbox);
        label.appendChild(text);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors';
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            render();
        });

        li.appendChild(label);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    const total = todos.length;
    const done = todos.filter(t => t.done).length;
    totalCount.textContent = `${total} tarea${total === 1 ? '' : 's'}`;
    completedCount.textContent = `${done} completada${done === 1 ? '' : 's'}`;
}

todoForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;
    todos.push({ text, done: false });
    todoInput.value = '';
    saveTodos();
    render();
});

clearAll.addEventListener('click', () => {
    if (!todos.length) return;
    if (confirm('¿Borrar todas las tareas?')) {
        todos = [];
        saveTodos();
        render();
    }
});

render();
});
