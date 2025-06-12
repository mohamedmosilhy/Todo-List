import { Controller } from "./controller/controller.js";
import { View } from "./view/view.js";
import "../css/styles.css";
import { saveData, loadData } from "./storage/storage.js";

const data = loadData();

const controller = new Controller(data);

const view = new View(controller);

view.renderProjectsAndMainMenu();

view.renderMainSection();
