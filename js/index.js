const BACKEND_ROOT_URL = "http://localhost:3001";
import { Todos } from "./class/todo.js";

const list = document.querySelector("ul");
const input = document.querySelector("input");

const renderTask = (task) => {
    const newItem = document.createElement('li');
    newItem.textContent = task.getText();
    newItem.classList.add('list-group-item');
    list.appendChild(newItem);
};

const todos = new Todos(BACKEND_ROOT_URL);

const getTasks = () => {
    todos.getTasks()
        .then(tasks => {
            tasks.forEach(task => renderTask(task));
            input.disabled = false;
        })
        .catch(error => console.error(error));
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const description = input.value.trim();
        if (description) {
            todos.addTask(description)
                .then(task => {
                    renderTask(task);
                    input.value = '';
                    input.focus();
                })
                .catch(error => console.error(error));
        }
    }
});

getTasks();