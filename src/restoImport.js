// index.js
import "./restoTemplate.css";
import img from './assets/restaurant.jpeg';
import { loadHome } from "./home";
import { loadMenu } from "./menu";
import { loadAbout } from "./about";
import { loadContact } from "./contact";



const homeTab = document.getElementById('Home')
const menuTab = document.getElementById('Menu')
const aboutTab = document.getElementById('About')
const contactTab = document.getElementById('Contact')

homeTab.addEventListener('click', loadHome);
menuTab.addEventListener('click', loadMenu);
aboutTab.addEventListener('click', loadAbout);
contactTab.addEventListener('click', loadContact);


