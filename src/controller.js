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
    }


    if (event.target.classList.contains('deleteImage')) {
        const deleteRow = event.target.closest(".projectDivContainer")
        const idRow = deleteRow.dataset.id;
        deleteRow.remove();
        const bookIndex = projects.findIndex(projectItem => projectItem.id === idRow);
        projects.splice(bookIndex, 1);
    }

});


todocreate.addEventListener('click', (event) => {
    event.preventDefault();

    const todoListsDiv = document.querySelector('.todoListsDiv');

    const toDoInput = document.getElementById("todoInput").value;
    const dueDateInput = document.getElementById("dueDate").value;
    const priorityInput = document.getElementById("priority").value;
    const description = document.getElementById("description").innerText;

    const todoId = crypto.randomUUID();

    const toDoContainer = document.createElement("div");
    toDoContainer.className = 'toDoContainer';
    toDoContainer.setAttribute('data-id', todoId)

    const buttonColContainer = document.createElement("div");
    buttonColContainer.className = 'buttonColContainer';

    const buttonCollapsible = document.createElement("button");
    buttonCollapsible.className = 'buttonCollapsible';
    buttonCollapsible.textContent = toDoInput;


    const todoName = document.createElement('div');
    todoName.setAttribute('id', 'todoName');
    todoName.textContent = toDoInput;


    const middleRow = document.createElement("div");
    middleRow.className = 'middleRow';

    const descriptionPara = document.createElement("p");
    descriptionPara.textContent = 'Description: ' + description;

    const dueDatePara = document.createElement("p");
    dueDatePara.textContent = 'Due Date: ' + dueDateInput;

    const priorityPara = document.createElement("p");
    priorityPara.textContent = 'Priority: ' + priorityInput;

    const editButton = document.createElement('button');
    editButton.className = 'editButton';
    editButton.textContent = 'Edit Details';

    buttonColContainer.appendChild(buttonCollapsible);
    buttonColContainer.appendChild(middleRow);

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
    checkBoxDone.setAttribute('name', 'checkBoxDone');


    const todos = new ToDo(toDoInput, description, dueDateInput, priorityInput, checkBoxDone.checked, todoId);

    const matchedProject = projects.find(project => project.id === getProjectId);

    if (matchedProject) {
        matchedProject.todos.push(todos);
    }

    console.log(todos);


    checkBoxDone.addEventListener('change', () => {
        todos.completed = checkBoxDone.checked;
        console.log(todos);
    });

    const label = document.createElement('label');
    label.setAttribute('for', 'radioDone')

    checkbox.appendChild(checkBoxDone);
    checkbox.appendChild(label);

    toDoContainer.appendChild(buttonColContainer);
    toDoContainer.appendChild(checkbox);
    toDoContainer.appendChild(deleteTodo);


    todoListsDiv.appendChild(toDoContainer);
    todoListsDiv.appendChild(middleRow);

    buttonCollapsible.addEventListener("click", function () {
        this.classList.toggle("active");
        if (middleRow.style.maxHeight) {
            middleRow.style.maxHeight = null;
        } else {
            middleRow.style.maxHeight = middleRow.scrollHeight + "px";
        }
    });

    middleRow.style.maxHeight = null;

    todoDialog.close();

    return todoListsDiv;

});


addToDoButton.addEventListener('click', () => {
    todoDialog.showModal();
});

todocancel.addEventListener('click', () => {
    todoDialog.close();
});
