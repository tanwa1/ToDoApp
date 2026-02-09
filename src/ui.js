import noteApp from "./assets/noteApp.svg";

function render(project) {
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

    const projectList = document.createElement("ul");
    projectList.classList.add("projectList");
    const projectItem = document.createElement("button");
    projectItem.textContent = "Default Project";

    projectsDiv.appendChild(projectList);
    projectList.appendChild(projectItem);
    projectsDiv.appendChild(projectsTitle);
    projectsDiv.appendChild(projectList);
    projectsContainer.appendChild(projectsDiv);
    navDiv.appendChild(projectsContainer);
    
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    
    const addButton = document.createElement("button");
    addButton.classList.add("addButton");
    addButton.textContent = " + Add Project";
    

    buttonContainer.appendChild(addButton);
    projectsContainer.appendChild(buttonContainer);
    
    return navDiv;
}

function renderContent() {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    return contentDiv

}
export { render };