import { Task } from "./task.js";

class Todos {
  #apiUrl;
  #tasks;

  constructor(apiUrl) {
    this.#apiUrl = apiUrl;
    this.#tasks = [];
  }

  getTasks = async () => {
    try {
      const response = await fetch(this.#apiUrl);
      const data = await response.json();
      return this.#readJson(data);
    } catch (error) {
      throw error;
    }
  };

  removeTask = async (id) => {
    try {
      await fetch(this.#apiUrl + "/delete/" + id, {
        method: "DELETE",
      });
      this.#tasks = this.#tasks.filter((task) => task.id !== id);
      return id;
    } catch (error) {
      throw error;
    }
  };

  #readJson(data) {
    return data.map((item) => new Task(item.id, item.description));
  }

  addTask = async (description) => {
    try {
      const response = await fetch(`${this.#apiUrl}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      const task = new Task(data.id, data.description);
      this.#tasks.push(task);
      return task;
    } catch (error) {
      throw error;
    }
  };
}

export { Todos };
