
import { Task } from './task.js';

class Todos {
    #apiUrl;
    #tasks;

    constructor(apiUrl) {
        this.#apiUrl = apiUrl;
        this.#tasks = [];
    }

    getTasks() {
        return new Promise((resolve, reject) => {
            fetch(this.#apiUrl)
                .then(response => response.json())
                .then(data => {
                    const tasks = this.#readJson(data);
                    resolve(tasks);
                })
                .catch(error => reject(error));
        });
    }

    #readJson(data) {
        const tasks = [];
        data.forEach(item => {
            const task = new Task(item.id, item.description);
            tasks.push(task);
        });
        return tasks;
    }

    #addTaskToArray(task) {
        this.#tasks.push(task);
        return task;
    }

    addTask(description) {
        return new Promise((resolve, reject) => {
            fetch(`${this.#apiUrl}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description })
            })
                .then(response => response.json())
                .then(data => {
                    const task = new Task(data.id, data.description);
                    const addedTask = this.#addTaskToArray(task);
                    resolve(addedTask);
                })
                .catch(error => reject(error));
        });
    }
}

export { Todos };