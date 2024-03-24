const list = document.querySelector('ul');
const input = document.querySelector('input');
const apiUrl = 'http://localhost:3001';

const renderTask = (task) => {
    const newItem = document.createElement('li');
    newItem.textContent = task.description;
    newItem.classList.add('list-group-item');
    list.appendChild(newItem);
};

const getTasks = () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(task => renderTask(task));
            input.disabled = false;
        })
        .catch(error => console.error(error));
};

const saveTask = (task) => {
    return fetch(`${apiUrl}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: task })
    });
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const task = input.value.trim();
        if (task) {
            saveTask(task)
                .then(response => response.json())
                .then(data => {
                    renderTask(data);
                    input.value = '';
                })
                .catch(error => console.error(error));
        }
    }
});

getTasks();