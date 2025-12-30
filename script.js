const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

/* Events */
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') addTask();
});

/* Add task */
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();

    taskInput.value = '';
    taskInput.focus();
}

/* Render tasks */
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <label class="task-label">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.text}</span>
            </label>
            <div>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        /* Complete */
        li.querySelector('input').addEventListener('change', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        /* Edit */
        li.querySelector('.edit').addEventListener('click', () => {
            const newText = prompt('Edit your task:', task.text);
            if (newText && newText.trim()) {
                tasks[index].text = newText.trim();
                saveTasks();
                renderTasks();
            }
        });

        /* Delete with animation */
        li.querySelector('.delete').addEventListener('click', () => {
            li.classList.add('removing');

            setTimeout(() => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            }, 300); // matches CSS transition
        });

        taskList.appendChild(li);
    });
}

/* Save */
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
