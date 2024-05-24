const addBtn = document.getElementById('add-task');
const tableBody = document.getElementById('table-body');
const loader = document.getElementById('loader');

document.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let taskName = document.getElementById('task-name').value.trim();
    let dateValue = document.getElementById('task-date').value;
    let noTaskFound = document.querySelector('.no_task_found');

    if (taskName !== '') {
        if (noTaskFound) {
            noTaskFound.parentElement.remove();
        }

        const task = {
            name: taskName,
            date: dateValue ? dateValue : 'No Due Date',
            status: 'Pending'
        };

        addTaskToTable(task);
        saveTaskToLocalStorage(task);

        // Clear the input fields after adding the task
        document.getElementById('task-name').value = '';
        document.getElementById('task-date').value = '';
    }
});

function addTaskToTable(task) {
    const node = document.createElement("tr");
    node.innerHTML = `
        <td class="task_name"><p>${task.name}</p></td>
        <td class="task_due_date">${task.date}</td>
        <td class="task_status">${task.status}</td>
        <td class="task_actions">
            <button class="complete-task">complete</button>
            <button class="delete-task">delete</button>
        </td>
    `;

    tableBody.appendChild(node);

    // Automatically scroll to the latest task
    node.scrollIntoView({behavior: 'smooth', block: 'end'});

    // Add event listeners for the new task's actions
    node.querySelector('.complete-task').addEventListener('click', () => {
        task.status = 'Completed';
        node.querySelector('.task_status').innerText = 'Completed';
        updateTaskInLocalStorage(task);
    });

    node.querySelector('.delete-task').addEventListener('click', () => {
        node.remove();
        removeTaskFromLocalStorage(task);
        if (tableBody.children.length === 0) {
            tableBody.innerHTML = '<tr class="table-row"><td colspan="4" class="no_task_found">No task found</td></tr>';
        }
    });
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (tasks.length > 0) {
        document.querySelector('.no_task_found').parentElement.remove();
        tasks.forEach(task => {
            addTaskToTable(task);
        });
    }
}

function updateTaskInLocalStorage(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.name === updatedTask.name && task.date === updatedTask.date ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => !(task.name === taskToRemove.name && task.date === taskToRemove.date));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.addEventListener('load', () => {
    loader.style.display = 'none';
});
