import { addTask, complete, noteApp, upcoming, lowPrio, medPrio, highPrio } from "./assets/index.js";

export function render() {
    const appDiv = document.getElementById("wrapper");
    const { navDiv, headerTextContainer, projectsContainer, addedProjectsContainer, buttonContainer } = renderNav();
    const { header, mainContent, footer } = renderContent();

    appDiv.appendChild(navDiv);
    appDiv.appendChild(headerTextContainer);
    appDiv.appendChild(projectsContainer);
    appDiv.appendChild(addedProjectsContainer);
    appDiv.appendChild(buttonContainer);
    appDiv.appendChild(header);
    appDiv.appendChild(mainContent);
    appDiv.appendChild(footer);
}

function renderNav() {
    const navDiv = document.createElement("div");

    navDiv.setAttribute('id', 'navContainer');

    const headerTextContainer = document.createElement("div");
    headerTextContainer.className = 'headerTextContainer';

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
    headerTextContainer.appendChild(headerRow);
    headerTextContainer.appendChild(headerSubtitle);


    const projectsContainer = document.createElement("div");
    projectsContainer.className = 'projectsContainer';

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
            label: "Low",
            icon: lowPrio,
        },
        {
            label: "Medium",
            icon: medPrio,
        },

        {
            label: "High",
            icon: highPrio,
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
        projectButton.setAttribute('data-label', project.label);
        projectButton.classList.add("projectLinks");
        projectImage.src = project.icon;
        projectButton.textContent = project.label;
        projectDiv.appendChild(projectImage);
        projectDiv.appendChild(projectButton);
        projectsDiv.appendChild(projectDiv);
    });

    projectsContainer.appendChild(projectsDiv);


    const addedProjectsContainer = document.createElement("div");
    addedProjectsContainer.classList.add("addedProjectsContainer");
    addedProjectsContainer.setAttribute('id', 'addedProjectsContainer');

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");

    const addButton = document.createElement("button");
    addButton.classList.add("addButton");
    addButton.setAttribute('id', 'addButton');
    addButton.textContent = " + Add Project";

    buttonContainer.appendChild(addButton);

return { navDiv, headerTextContainer, projectsContainer, addedProjectsContainer, buttonContainer };

}

function renderContent() {
    const header = document.createElement("div");
    header.setAttribute('id', 'header');

    const headerTitle = document.createElement("h1");
    headerTitle.setAttribute('id', 'headerProject');
    headerTitle.textContent = "Template Projects";

    header.appendChild(headerTitle);

    const mainContent = document.createElement("div");
    mainContent.className = 'mainContent';


    const footer = document.createElement("div");
    footer.setAttribute('id', 'footer');

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
    footer.appendChild(addToDoButton);
    footer.appendChild(createdbyDiv);

    return { header, mainContent, footer };
}
