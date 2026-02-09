class ToDo {
    constructor(title, description, dueDate, priority, completed, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.id = id;
    }
}

class Project {
    constructor(name, todos = []) {
        this.name = name;
        this.todos = todos;
    }

    addToDo(todo) {
        this.todos.push(todo);
    }

    removeToDo(todo) {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
    }
}
export { ToDo, Project };