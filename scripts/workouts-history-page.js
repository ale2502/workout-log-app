import { displayCurrentDate, getTodayKey } from "./date-utils.js";

const currentDateContainer = document.getElementById('js-current-date-container');
currentDateContainer.textContent = displayCurrentDate();

// Render past workouts (any dateKey !== today)
const historyContainer = document.getElementById('js-workouts-history');
