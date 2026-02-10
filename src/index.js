// This file is intentionally left blank to satisfy Webpack's default entry search.
import "./style.css";
import {ToDo, Project } from "./models.js";
import "./controller.js";

const todo = new ToDo();
const project = new Project();

project.addToDo(todo);