// This file is intentionally left blank to satisfy Webpack's default entry search.
import "./style.css";
import {ToDo, Project } from "./models.js";
import { render } from "./ui.js";

const todo = new ToDo("Task 1", "Description for  Task 1", "2024-06-30", "High", false, 1);
const project = new Project();

project.addToDo(todo);
render(project);