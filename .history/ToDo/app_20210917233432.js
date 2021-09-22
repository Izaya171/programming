// Todo Class: Represents a todo
class Todo {
    constructor(task, startDate, dueDate) {
        this.task = task;
        this.startDate = startDate;
        this.dueDate = dueDate;
    }
}

// UI Class: Handle UI Tasks
class UI { //making methods static so we dont have to instantiate it
    static displayToDos() {

        const todos = Store.getTodos();

        todos.forEach((todo) => UI.addTodoToList(todo));
    }

    static addTodoToList(todo) {
        const list = document.querySelector("#todo-list");

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${todo.task}</td>
            <td>${todo.startDate}</td>
            <td>${todo.dueDate}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteTodo(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#todo-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(),
            3000);
    }

    static clearFields() {
        document.querySelector('#task').value = ''
        document.querySelector('#startDate').value = ''
        document.querySelector('#dueDate').value = ''
    }
}

// Store Class: Handles Storage
class Store {
    static getTodos() {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        return todos;
    }

    static addTodo(todo) {
        const todos = Store.getTodos();

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static removeTodo(dueDate) {
        const todos = Store.getTodos();

        todos.forEach((todo, index) => {
            if (todo.dueDate === dueDate) {
                todos.splice(index, 1);
            }
        });

        localStorage.setItem('todos', JSON.stringify(todos));
    }
}


// Event: Display todos
document.addEventListener('DOMContentLoaded', UI.displayToDos)

// Event: Add A todo
document.querySelector('#todo-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const task = document.querySelector('#task').value;
    const startDate = document.querySelector('#startDate').value;
    const dueDate = document.querySelector('#dueDate').value;

    // Validate
    if (task === '' || startDate === '' || dueDate === '') {
        UI.showAlert("Please fill in all fields", 'danger')
    } else {
        // Instatiate todos
        const todo = new Todo(task, startDate, dueDate);

        // Add Todo to UI
        UI.addTodoToList(todo);

        // Add Todo to Store
        Store.addTodo(todo);

        // Show Success message
        UI.showAlert('Todo Added', 'success');

        // Clear UI fields
        UI.clearFields()
    }
});




// Event: Remove a todo
document.querySelector('#todo-list').addEventListener('click', (e) => {
    // Remove todo from UI
    UI.deleteTodo(e.target);

    // Remove todo from the store
    Store.removeTodo(e.target.parentElement.previousElementSibling.textContent); //should give us dueDate

    // Show delete message
    UI.showAlert('Todo Removed', 'info')
})