import { displayCurrentDate } from "./date-utils.js";

const currentDateContainer = document.getElementById('js-current-date-container');
currentDateContainer.textContent = displayCurrentDate();