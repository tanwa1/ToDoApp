import { render } from "./ui.js";
import { project, deleteIcon } from "./assets/index.js";
import { ToDo, Project } from "./models.js";

render();

const projectDialog = document.getElementById("projectUpForm");
const create = document.getElementById("createProject");
const cancel = document.getElementById("cancelProject");

const todoDialog = document.getElementById("todoUpForm");

const todocreate = document.getElementById("createTodo");
const todocancel = document.getElementById("cancelTodo");


const addButton = document.getElementById("addButton");
const addToDoButton = document.getElementById("addToDoButton");

const projectLists = document.getElementById("addedProjectsContainer");


const projects = [];

let getProjectId = null;

export function getId() {
    create.addEventListener('click', () => {
        let getProjectInput = document.getElementById("projectInput").value;

        const newProject = {
            id: crypto.randomUUID(),
            label: getProjectInput,
            icon1: project,
            deleteIcon: deleteIcon,
        };

        const projectModel = new Project(newProject.label, newProject.id);

        const projectContainer = document.createElement("div");
        projectContainer.classList.add("projectDivContainer");

        const projectImage = document.createElement('img');

        const clickDeleteImg = document.createElement('button');

        clickDeleteImg.classList.add('clickDeleteImg');

        const deleteImage = document.createElement('img');
        deleteImage.classList.add("deleteImage");

        const projectButton = document.createElement("button");
        projectButton.setAttribute('data-id', newProject.id);
        projectButton.className = 'projectButton';

        getProjectId = newProject.id;

        projectImage.src = newProject.icon1;

        projectButton.textContent = getProjectInput;

        deleteImage.src = newProject.deleteIcon;

        clickDeleteImg.appendChild(deleteImage);
        projectContainer.appendChild(projectImage);
        projectContainer.appendChild(projectButton);
        projectContainer.appendChild(clickDeleteImg);
        projectLists.appendChild(projectContainer);

        projects.push(projectModel);
        console.log(projects);

        projectDialog.close();
    });

}


addButton.addEventListener('click', () => {
    projectDialog.showModal();
});

cancel.addEventListener('click', () => {
    projectDialog.close();
});


projectLists.addEventListener('click', (event) => {

    if (event.target.classList.contains('projectButton')) {
        getProjectId = event.target.getAttribute('data-id');
        renderTodoForProject(getProjectId);
    }


    if (event.target.classList.contains('deleteImage')) {
        const deleteRow = event.target.closest(".projectDivContainer")
        const idRow = deleteRow.dataset.id;
        deleteRow.remove();
        const bookIndex = projects.findIndex(projectItem => projectItem.id === idRow);
        projects.splice(bookIndex, 1);
        const getContentsClass = document.querySelector('.todoListsDiv');
        getContentsClass.innerHTML = '';
    }

});


todocreate.addEventListener('click', (event) => {
    event.preventDefault();

    const toDoInput = document.getElementById("todoInput").value;
    const dueDateInput = document.getElementById("dueDate").value;
    const priorityInput = document.getElementById("priority").value;

    console.log(priorityInput);
    const description = document.getElementById("description").innerText;

    const todoId = crypto.randomUUID();

    const todos = new ToDo(toDoInput, description, dueDateInput, priorityInput, false, todoId);
    const matchedProject = projects.find(project => project.id === getProjectId);

    if (matchedProject) {
        matchedProject.todos.push(todos);
        console.log(matchedProject);
    }

    renderTodoForProject(getProjectId);
    todoDialog.close();
});


function renderTodoForProject(projectID) {
    const getContentsClass = document.querySelector('.todoListsDiv');
    getContentsClass.innerHTML = '';

    const selectedProject = projects.find(project => project.id === projectID);

    for (const todo of selectedProject.todos) {
        getContentsClass.appendChild(createTodoElement(todo))
    }
}

function createTodoElement(todo) {

    const toDoContainer = document.createElement("div");
    toDoContainer.className = 'toDoContainer';
    toDoContainer.setAttribute('data-id', todo.id)

    const buttonCollapsible = document.createElement("button");
    buttonCollapsible.className = 'buttonCollapsible';
    buttonCollapsible.textContent = todo.title;

    const middleRow = document.createElement("div");
    middleRow.className = 'middleRow';

    const descriptionPara = document.createElement("p");
    descriptionPara.textContent = 'Description: ' + todo.description;

    const dueDatePara = document.createElement("p");
    dueDatePara.textContent = 'Due Date: ' + todo.dueDate;

    const priorityPara = document.createElement("p");
    priorityPara.textContent = 'Priority: ' + todo.priority;

    const editButton = document.createElement('button');
    editButton.className = 'editButton';
    editButton.textContent = 'Edit Details';

    middleRow.appendChild(descriptionPara);
    middleRow.appendChild(dueDatePara)
    middleRow.appendChild(priorityPara)
    middleRow.appendChild(editButton);

    const deleteTodo = document.createElement('button');
    deleteTodo.className = 'deleteTodo';
    const deleteTodoImg = document.createElement('img');
    deleteTodoImg.className = "deleteTodoImg";
    deleteTodoImg.src = deleteIcon;
    deleteTodo.appendChild(deleteTodoImg);

    const checkbox = document.createElement("div");
    checkbox.className = 'radioDiv';
    const checkBoxDone = document.createElement("input");
    checkBoxDone.setAttribute('id', 'radioDone');
    checkBoxDone.setAttribute('type', 'checkbox');
    checkBoxDone.checked = todo.completed || false;

    const label = document.createElement('label');
    label.setAttribute('for', 'radioDone')

    checkbox.appendChild(checkBoxDone);
    checkbox.appendChild(label);

    toDoContainer.appendChild(checkbox);
    toDoContainer.appendChild(buttonCollapsible);
    toDoContainer.appendChild(deleteTodo);

    const getContentsClass = document.querySelector('.todoListsDiv');


    getContentsClass.appendChild(toDoContainer);
    getContentsClass.appendChild(middleRow);


    checkBoxDone.addEventListener('change', () => {
        todo.completed = checkBoxDone.checked;
        console.log(todo);
    });

    buttonCollapsible.addEventListener("click", function () {
        this.classList.toggle("active");
        if (middleRow.style.maxHeight) {
            middleRow.style.maxHeight = null;
        } else {
            middleRow.style.maxHeight = middleRow.scrollHeight + "px";
        }
    });

    middleRow.style.maxHeight = null;


    return toDoContainer;
}

document.querySelector('.todoListsDiv').addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteTodoImg')) {
        const todoDeleteDiv = event.target.closest('.toDoContainer');
        const buttonId = todoDeleteDiv.dataset.id;

        const matchedProject = projects.find(project => project.id === getProjectId);
        console.log(matchedProject)
        if (matchedProject) {
            matchedProject.removeToDo({ id: buttonId });
            todoDeleteDiv.remove();
        }
    }
});

document.querySelector('.projectsDiv').addEventListener('click', (event) => {
    const projectContainer = event.target.closest('.projectLinks')
    console.log(projectContainer)
    const getContentsClass = document.querySelector('.todoListsDiv');
    getContentsClass.innerHTML = '';
    const getButtonDataId = projectContainer.getAttribute('data-label');

    if (projectContainer) {
        if (getButtonDataId) {
            for (const project of projects) {
                for (const todo of project.todos) {
                    console.log(todo.priority)
                    if (todo.priority.trim() === getButtonDataId.trim()) {
                        console.log(getButtonDataId)
                        getContentsClass.appendChild(createTodoElement(todo));
                    }
                }
            }
        }
    }
});


addToDoButton.addEventListener('click', () => {
    todoDialog.showModal();

});

todocancel.addEventListener('click', () => {
    todoDialog.close();
});
