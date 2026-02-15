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
        projectContainer.setAttribute('data-id', newProject.id);
        projectContainer.classList.add("projectDivContainer");

        const projectImage = document.createElement('img');

        const clickDeleteImg = document.createElement('button');

        clickDeleteImg.classList.add('clickDeleteImg');

        const deleteImage = document.createElement('img');
        deleteImage.classList.add("deleteImage");

        const projectButton = document.createElement("button");
        projectButton.classList.add('projectButton');


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

    todoDialog.close();
});

addToDoButton.addEventListener('click', () => {
    todoDialog.showModal();
});

todocancel.addEventListener('click', () => {
    todoDialog.close();
});