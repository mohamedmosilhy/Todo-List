import "../css/styles.css";
import { initPage } from "./initial_page";
import { menuPage } from "./menu_page";
import { contactPage } from "./contact_page";

let homeBtn = document.querySelector(".home");
let menuBtn = document.querySelector(".menu");
let contactBtn = document.querySelector(".contact");
let contentDiv = document.querySelector("#content");
let body = document.querySelector("body");
initPage();

homeBtn.addEventListener("click", (e) => {
  contentDiv.remove();
  contentDiv = document.createElement("div");
  contentDiv.id = "content";
  body.appendChild(contentDiv);
  initPage();
});

menuBtn.addEventListener("click", (e) => {
  contentDiv.remove();
  contentDiv = document.createElement("div");
  contentDiv.id = "content";
  body.appendChild(contentDiv);
  menuPage();
});

contactBtn.addEventListener("click", (e) => {
  contentDiv.remove();
  contentDiv = document.createElement("div");
  contentDiv.id = "content";
  body.appendChild(contentDiv);
  contactPage();
});
