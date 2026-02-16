import { addTask, complete, noteApp, pending, upcoming, urgent } from "./assets/index.js";

export function render() {
    const appDiv = document.getElementById("app");
    const nav = renderNav();
    const content = renderContent();

    appDiv.appendChild(nav);
    appDiv.appendChild(content);
}

function renderNav() {
    const navDiv = document.createElement("div");

    navDiv.classList.add("navContainer");

    const header = document.createElement("div");
    header.classList.add("headerTextContainer");

    const headerRow = document.createElement("div");
    headerRow.classList.add("headerRow");

    const headerText = document.createElement("h2");
    headerText.textContent = "To Do App";

    const imageContainer = document.createElement("div");
    const noteAppImage = document.createElement('img');
    noteAppImage.src = noteApp;
    noteAppImage.alt = "Note App Image";

    const headerSubtitle = document.createElement("p");
    headerSubtitle.classList.add("headerSubtitle");
    headerSubtitle.textContent = "Stay organized";

    imageContainer.appendChild(noteAppImage);
    headerRow.appendChild(imageContainer);
    headerRow.appendChild(headerText);
    header.appendChild(headerRow);
    header.appendChild(headerSubtitle);
    navDiv.appendChild(header);


    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projectsContainer");

    const projectsDiv = document.createElement("div");
    projectsDiv.classList.add("projectsDiv");

    const projectsTitle = document.createElement("div");
    projectsTitle.classList.add("projectTitle");
    projectsTitle.textContent = "PROJECTS";

    projectsDiv.appendChild(projectsTitle);

    const projects = [
        {
            label: "Upcoming",
            icon: upcoming,
        },
        {
            label: "Pending",
            icon: pending,
        },

        {
            label: "Urgent",
            icon: urgent,
        },
        {
            label: "Complete",
            icon: complete
        }

    ];

    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("projectDivContainer")
        const projectImage = document.createElement('img');
        const projectButton = document.createElement("button");
        projectButton.classList.add("projectLinks");
        projectImage.src = project.icon;
        projectButton.textContent = project.label;
        projectDiv.appendChild(projectImage);
        projectDiv.appendChild(projectButton);
        projectsDiv.appendChild(projectDiv);
    });

    projectsContainer.appendChild(projectsDiv);
    navDiv.appendChild(projectsContainer);

    const addedProjectsContainer = document.createElement("div");
    addedProjectsContainer.classList.add("addedProjectsContainer");
    addedProjectsContainer.setAttribute('id', 'addedProjectsContainer');

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");

    const addButton = document.createElement("button");
    addButton.classList.add("addButton");
    addButton.setAttribute('id', 'addButton');
    addButton.textContent = " + Add Project";


    projectsContainer.appendChild(addedProjectsContainer);
    buttonContainer.appendChild(addButton);
    projectsContainer.appendChild(buttonContainer);

    return navDiv;
}

function renderContent() {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("headerDiv");
    const header = document.createElement("h1");
    header.textContent = "Template Projects"

    headerDiv.appendChild(header);
    contentDiv.appendChild(headerDiv);



    const Footer = document.createElement("div");
    Footer.classList.add("Footer");
    
    const todoListsDiv = document.createElement("div");
    todoListsDiv.className = 'todoListsDiv';
    
    
    contentDiv.appendChild(todoListsDiv);
    
    const githubAcc = 'https://github.com/tanwa1';
    
    const githubLink = document.createElement('a');
    githubLink.href = `${githubAcc}`;
    githubLink.textContent = 'Tanwa';
    
    const createdbyDiv = document.createElement('div');
    createdbyDiv.className = "createdAuthor";
    createdbyDiv.textContent = 
    "Created by: ";
    

    const addToDoButton = document.createElement("button");
    addToDoButton.setAttribute('id', 'addToDoButton');
    addToDoButton.textContent = "Add To Do";
    
    createdbyDiv.appendChild(githubLink);
    Footer.appendChild(addToDoButton);
    Footer.appendChild(createdbyDiv);
    contentDiv.appendChild(Footer);



    return contentDiv

}