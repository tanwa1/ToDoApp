import { render } from "./ui.js";
import { project, deleteIcon } from "./assets/index.js";
import { ToDo, Project } from "./models.js";

render();
const dialog = document.querySelector("dialog");
const create = document.getElementById("create");
const cancel = document.getElementById("cancel");

const addButton = document.getElementById("addButton");

const projectLists = document.getElementById("addedProjectsContainer");


const projects = [];


create.addEventListener('click', () => {
    let getProjectInput = document.getElementById("projectInput").value;

    const newProject = {
        id: crypto.randomUUID(),
        label: getProjectInput,
        icon1: project,
        deleteIcon: deleteIcon,
    };

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

    projects.push(newProject);
    console.log(projects);
});


addButton.addEventListener('click', () => {
    dialog.showModal();
});

create.addEventListener('click', () => {
    dialog.close();
});

cancel.addEventListener('click', () => {
    dialog.close();
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
