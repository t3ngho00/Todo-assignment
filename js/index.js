const BACKEND_ROOT_URL = "http://localhost:3001";
import { Todos } from "./class/todo.js";

const list = document.querySelector("ul");
const input = document.querySelector("input");

const renderTask = (task) => {
  const li = document.createElement("li");
  li.setAttribute("class", "list-group-item");
  li.setAttribute("data-key", task.getId().toString());
  renderSpan(li, task.getText());
  renderLink(li, task.getId());

  list.append(li);
};

const renderSpan = (li, text) => {
  const span = li.appendChild(document.createElement("span"));
  span.innerHTML = text;
};

const renderLink = (li, id) => {
  const a = li.appendChild(document.createElement("a"));

  a.innerHTML = '<i class="bi bi-trash"></i>';
  a.setAttribute("style", "float: right");

  a.addEventListener("click", (event) => {
    todosManager
      .removeTask(id)
      .then((removed_id) => {
        const li_to_remove = document.querySelector(
          `[data-key='${removed_id}']`
        );

        if (li_to_remove) {
          list.removeChild(li_to_remove);
        }
      })
      .catch((error) => {});
  });
};

const todosManager = new Todos(BACKEND_ROOT_URL); // Initialize Todos instance

const getTasks = async () => {
  try {
    const tasks = await todosManager.getTasks();
    tasks.forEach(renderTask);
    input.disabled = false;
  } catch (error) {
    console.error(error);
  }
};

const saveTask = async (description) => {
  try {
    const task = await todosManager.addTask(description);
    renderTask(task);
    input.value = "";
  } catch (error) {
    console.error(error);
  }
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const task = input.value.trim();
    if (task) {
      saveTask(task);
    }
  }
});

getTasks();