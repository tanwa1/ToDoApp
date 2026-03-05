import { render } from "./ui.js";
import { projectIcon, deleteIcon } from "./assets/index.js";
import { ToDo, Project } from "./models.js";
import { saveProjects, loadProjects } from "./storage.js";
import { format, parseISO } from 'date-fns';


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


const loadedData = loadProjects();
const projects = reviveProjects(loadedData);

if (projects.length === 0) {

    const exampleId = crypto.randomUUID();
    
    const exampleProject = new Project('Inbox', exampleId);
    
    projects.push(exampleProject)
    saveProjects(projects);
    
}

renderProjectsList()

let getProjectId = null;

if (projects.length > 0) {
    getProjectId = projects[0].id;
    renderTodoForProject(getProjectId);
}

export function getId() {
    create.addEventListener('click', () => {
        let getProjectInput = document.getElementById("projectInput").value;

        if (!getProjectInput) {
            alert("Please name your project");
            return;
        }

        const newProject = {
            id: crypto.randomUUID(),
            label: getProjectInput,
            icon1: projectIcon,
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
        saveProjects(projects);
        renderProjectsList();
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
        
        const getheaderProject = document.getElementById('headerProject');
        getheaderProject.textContent = event.target.textContent;

    }


    if (event.target.classList.contains('deleteImage')) {
        const deleteRow = event.target.closest(".projectDivContainer")
        const idRow = deleteRow.dataset.id;
        deleteRow.remove();
        const bookIndex = projects.findIndex(projectItem => projectItem.id === idRow);
        projects.splice(bookIndex, 1);
        saveProjects(projects);
        const getContentsClass = document.querySelector('.mainContent');
        getContentsClass.innerHTML = '';
        renderProjectsList();
    }

});


todocreate.addEventListener('click', (event) => {
    event.preventDefault();
    const toDoInput = document.getElementById("todoInput").value;
    const dueDateInput = document.getElementById("dueDate").value;
    const priorityInput = document.getElementById("priority").value;
    const description = document.getElementById("description").innerText;

    if(!validateForm()){
        return;
    }

    if (todocreate.classList.contains("create-mode")) {
        const todoId = crypto.randomUUID();
        const todos = new ToDo(toDoInput, description, dueDateInput, priorityInput, false, todoId);
        const matchedProject = projects.find(project => project.id === getProjectId);

        if (matchedProject) {
            matchedProject.addToDo(todos);
            console.log(matchedProject);
        }
        todocreate.classList.remove("create-mode");
        saveProjects(projects);
    } else if (todocreate.classList.contains("edit-mode")) {
        const editId = todocreate.dataset.editId;
        const matchedProject = projects.find(project => project.id === getProjectId);
        const todo = matchedProject.getTodoById(editId);

        if (todo) {
            todo.update({
                title: toDoInput,
                description: description,
                dueDate: dueDateInput,
                priority: priorityInput
            })
        }
        todocreate.classList.remove("edit-mode");
        delete todocreate.dataset.editId;
        saveProjects(projects);
    }
    renderTodoForProject(getProjectId);
    todoDialog.close();
});

function validateForm() {
    const inputValidate = Array.from(document.querySelectorAll('input, select, textarea'));

    for (const input of inputValidate) {
        if (!input.value) {
            alert("Fill out require inputs")
            return false;
        }
    }

    const description = document.getElementById('description');

    if (!description.innerText.trim()) {
        alert("Fill out require inputs")
        return false;
    }

    return true;
}


function renderTodoForProject(projectID) {
    const getContentsClass = document.querySelector('.mainContent');
    getContentsClass.innerHTML = '';

    const selectedProject = projects.find(project => project.id === projectID);

    if (!selectedProject) {
        alert("Please enter a project first!");
        return;
    }

    for (const todo of selectedProject.todos) {
        const { toDoContainer, middleRow } = createTodoElement(todo);
        toDoContainer.classList.add(`priority-${todo.priority.toLowerCase()}`);
        getContentsClass.appendChild(toDoContainer);
        getContentsClass.appendChild(middleRow);
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

    let formattedDate = todo.dueDate ? format(parseISO(todo.dueDate), 'MMM d, yyyy') : '';
    const dueDatePara = document.createElement("p");
    dueDatePara.textContent = 'Due Date: ' + formattedDate;

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
    checkBoxDone.onchange = function (e) {
        if (e.target.checked) {

        }
    }

    const label = document.createElement('label');
    label.setAttribute('for', 'radioDone')

    checkbox.appendChild(checkBoxDone);
    checkbox.appendChild(label);

    toDoContainer.appendChild(checkbox);
    toDoContainer.appendChild(buttonCollapsible);
    toDoContainer.appendChild(deleteTodo);

    const getContentsClass = document.querySelector('.mainContent');

    getContentsClass.appendChild(toDoContainer);
    getContentsClass.appendChild(middleRow);


    //CHECKBOXES
    checkBoxDone.onchange = function (e) {
        todo.completed = checkBoxDone.checked;
        if (e.target.checked) {
            middleRow.classList.add("complete");
            toDoContainer.classList.add("completed")
            setTimeout(() => {
                toDoContainer.remove();
                middleRow.remove()
            }, 1000)
        } else {
            middleRow.classList.remove("complete");
            toDoContainer.classList.remove("completed")
        }
        saveProjects(projects);
        console.log(todo);
    }

    buttonCollapsible.addEventListener("click", function () {
        this.classList.toggle("active");
        if (middleRow.style.maxHeight) {
            middleRow.style.maxHeight = null;
        } else {
            middleRow.style.maxHeight = middleRow.scrollHeight + "px";
        }
    });

    middleRow.style.maxHeight = null;


    return { toDoContainer, middleRow };
}

function reviveProjects(data) {
    return data.map(projectObj => {
        const todos = projectObj.todos.map(todoObj =>
            new ToDo(
                todoObj.title,
                todoObj.description,
                todoObj.dueDate,
                todoObj.priority,
                todoObj.completed,
                todoObj.id
            )
        );
        return new Project(projectObj.name, projectObj.id, todos);
    });
}

function renderProjectsList() {
    projectLists.innerHTML = '';
    for (const project of projects) {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("projectDivContainer", "projectLinks");

        const projectImage = document.createElement('img');
        projectImage.src = project.icon1 || projectIcon;

        const projectButton = document.createElement("button");
        projectButton.setAttribute('data-id', project.id);
        projectButton.className = 'projectButton';
        projectButton.textContent = project.name || project.label;

        const clickDeleteImg = document.createElement('button');
        clickDeleteImg.classList.add('clickDeleteImg');
        const deleteImage = document.createElement('img');
        deleteImage.classList.add("deleteImage");
        deleteImage.src = project.deleteIcon || deleteIcon;
        clickDeleteImg.appendChild(deleteImage);

        projectContainer.appendChild(projectImage);
        projectContainer.appendChild(projectButton);
        projectContainer.appendChild(clickDeleteImg);
        projectLists.appendChild(projectContainer);
    }
}


document.querySelector('.mainContent').addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteTodoImg')) {
        const todoDeleteDiv = event.target.closest('.toDoContainer');
        const middleRow = todoDeleteDiv.nextElementSibling;
        console.log(middleRow);
        const buttonId = todoDeleteDiv.dataset.id;

        const matchedProject = projects.find(project => project.id === getProjectId);
        console.log(matchedProject)
        if (matchedProject) {
            matchedProject.removeToDo({ id: buttonId });
            saveProjects(projects);
            if (middleRow && middleRow.classList.contains('middleRow')) {
                middleRow.remove();
            }
            todoDeleteDiv.remove();
        }
    }
});

document.querySelector('.projectsDiv').addEventListener('click', (event) => {
    const projectContainer = event.target.closest('.projectLinks')
    if (!projectContainer) {
        return;
    }

    console.log(projectContainer)
    const getContentsClass = document.querySelector('.mainContent');
    getContentsClass.innerHTML = '';
    const getButtonDataId = projectContainer.getAttribute('data-label');
    const getheaderProject = document.getElementById('headerProject');
    const dateToday = new Date();
    const upcomingLimit = new Date()
    upcomingLimit.setDate(dateToday.getDate() + 20);
    
    getheaderProject.textContent = getButtonDataId;
    
    if (projectContainer) {
        if (getButtonDataId === 'Upcoming') {
            for (const project of projects) {
                for (const todo of project.todos) {
                    if (!todo.dueDate) continue;
                    const todoDueDate = new Date(todo.dueDate);
                    if (todoDueDate >= dateToday && todoDueDate <= upcomingLimit && todo.completed === false) {
                        const { toDoContainer, middleRow } = createTodoElement(todo);
                        getContentsClass.appendChild(toDoContainer);
                        getContentsClass.appendChild(middleRow);
                    }
                }
            }
        }

        else if (getButtonDataId === 'Complete') {
            for (const project of projects) {
                for (const todo of project.todos) {
                    if (todo.completed === true) {
                        console.log(todo.completed)
                        const { toDoContainer, middleRow } = createTodoElement(todo);
                        getContentsClass.appendChild(toDoContainer);
                        getContentsClass.appendChild(middleRow);
                    }
                }
            }
        }

        else if (getButtonDataId) {
            for (const project of projects) {
                for (const todo of project.todos) {
                    console.log(todo.priority)
                    if (todo.priority === getButtonDataId && todo.completed === false) {
                        console.log(getButtonDataId)
                        const { toDoContainer, middleRow } = createTodoElement(todo);
                        getContentsClass.appendChild(toDoContainer);
                        getContentsClass.appendChild(middleRow);
                    }
                }
            }
        }

        return;
    }
    else {

    }

});

document.querySelector('.mainContent').addEventListener('click', (event) => {
    const doNewInput = document.getElementById("todoInput");
    const doNewDueDate = document.getElementById("dueDate");
    const doNewPriority = document.getElementById("priority");
    const doNewDescription = document.getElementById("description");

    if (event.target.classList.contains('editButton')) {
        const middleRow = event.target.closest('.middleRow');

        const getTodoContainer = middleRow.previousElementSibling;

        const getDataID = getTodoContainer.getAttribute('data-id');
        todocreate.dataset.editId = getDataID;

        const matchedProject = projects.find(project => project.id === getProjectId);
        const todo = matchedProject.todos.find(todo => todo.id === getDataID);

        doNewInput.value = todo.title;
        doNewDueDate.value = todo.dueDate;
        doNewPriority.value = todo.priority;
        doNewDescription.innerText = todo.description;
        todocreate.classList.remove("create-mode");
        todocreate.classList.add("edit-mode");
        todoDialog.showModal();
    }
});



addToDoButton.addEventListener('click', () => {
    todocreate.classList.remove("edit-mode");
    todocreate.classList.add("create-mode");
    todoDialog.showModal();

});

todocancel.addEventListener('click', () => {
    todoDialog.close();
});
