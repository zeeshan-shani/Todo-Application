// Get references to the HTML elements
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render saved tasks
savedTasks.forEach(taskText => {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
});

// Event listener for adding a new task
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        savedTasks.push(taskText);
        updateLocalStorage();
        taskInput.value = '';
    }
});

// Function to create a new task item
function createTaskItem(taskText) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('flex', 'items-center', 'justify-between', 'bg-white', 'p-2', 'mb-2', 'rounded', 'shadow-sm');

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;
    taskTextElement.classList.add('flex-1', 'mr-2');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('text-red-600', 'hover:text-red-700', 'cursor-pointer');

    // Event listener for deleting a task
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        savedTasks.splice(savedTasks.indexOf(taskText), 1);
        updateLocalStorage();
    });

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(deleteButton);

    return taskItem;
}

// Update local storage with the current tasks
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}
