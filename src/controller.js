import { render } from "./ui.js";
import { project, deleteIcon } from "./assets/index.js";
// import {ToDo, Project} from "./models.js";

const renderer = render();
// const project = new Project();
const dialog = document.querySelector("dialog");
const create = document.getElementById("create");
const cancel = document.getElementById("cancel");

const addButton = document.getElementById("addButton");

const projectLists = document.getElementById("addedProjectsContainer");

let getProjectInput = document.getElementById("projectInput").value;

const projects = [
    {
        label: getProjectInput,
        icon1: project,
        deleteIcon: deleteIcon,
    },
];

addButton.addEventListener('click', () => {
    dialog.showModal();
});

create.addEventListener('click', () => {
    dialog.close();
});

cancel.addEventListener('click', () => {
    dialog.close();
});
const deleteProject = document.getElementById("clickDeleteImg");

create.addEventListener('click', () => {
    projects.forEach(project => {
        const projectContainer = document.createElement("div");

        projectContainer.classList.add("projectDivContainer");

        const projectImage = document.createElement('img');

        const clickDeleteImg = document.createElement('button');

        clickDeleteImg.setAttribute('id', 'clickDeleteImg');

        const deleteImage = document.createElement('img');

        const projectButton = document.createElement("button");

        projectButton.setAttribute('id', 'projectButton');

        projectImage.src = project.icon1;

        deleteImage.src = project.deleteIcon;

        projectButton.textContent = getProjectInput;

        clickDeleteImg.appendChild(deleteImage);
        projectContainer.appendChild(projectImage);
        projectContainer.appendChild(projectButton);
        projectContainer.appendChild(clickDeleteImg);
        projectLists.appendChild(projectContainer);
    });
});

const getProjectContainer = document.getElementById("projectDivContainer");

deleteProject.addEventListener('click', () => {
    getProjectContainer.textContent = ''
}); 