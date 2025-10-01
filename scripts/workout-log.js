import { months, daysOfTheWeek } from "./lists.js";

function renderWorkout() {
  let workoutLogHTMLWrap = '';
  
  const workoutLog = JSON.parse(localStorage.getItem('currentWorkout')) || [];
  
  workoutLog.forEach((exercise) => {
    let workoutLogHTML = '';
    workoutLogHTML += `
      <div class="sets-reps">
        ${exercise.exerciseName}
        <span>
          <button class="edit-exercise" 
          data-exercise-id="${exercise.exerciseId}" data-muscle-group="${exercise.muscleGroup}">
            Edit
          </button>
          <button class="delete-exercise" data-exercise-id="${exercise.exerciseId}">
            Delete
          </button>
        </span>
      </div>
    `;
    exercise.sets.forEach((set, index) => {
      workoutLogHTML += `
        <div>Set ${index + 1}: ${set.weight}kg x ${set.reps} reps (RIR: ${set.rir})</div>
      `;
    });
    workoutLogHTMLWrap += `<div class="each-exercise-and-sets">${workoutLogHTML}</div>`;
  });
  console.log(workoutLogHTMLWrap);
  document.getElementById('exercises-and-sets').innerHTML = workoutLogHTMLWrap;

  document.querySelectorAll('.delete-exercise').forEach((button) => {
    button.addEventListener('click', (e) => {
      const exerciseId = e.target.getAttribute('data-exercise-id');
      
      let currentWorkout = JSON.parse(localStorage.getItem('currentWorkout')) || [];

      currentWorkout = currentWorkout.filter(ex => ex.exerciseId !== exerciseId);

      localStorage.setItem('currentWorkout', JSON.stringify(currentWorkout));

      renderWorkout();
    });
  });

  document.querySelectorAll('.edit-exercise').forEach((button) => {
    button.addEventListener('click', (e) => {
      const exerciseId = e.target.getAttribute('data-exercise-id');
      const muscleGroup = e.target.getAttribute('data-muscle-group');
      localStorage.setItem('selectedExerciseId', exerciseId);
      localStorage.setItem('selectedMuscleGroup', muscleGroup);

      window.location.href = '../exercise.html';
    });
  });
}
renderWorkout();

const addNewExistingExerciseButton = document.getElementById('js-add-new-exercise');
addNewExistingExerciseButton.addEventListener('click', () => {
  window.location.href = '../muscle-list-page.html';
});

function displayCurrentDate() {
  const now = new Date();
  const day = String(now.getDate());
  let ordinalIndicator = '';

  if (day === '1') {
    ordinalIndicator = 'st'; 
  } else if (day === '2') {
    ordinalIndicator = 'nd';
  } else if (day === '3') {
    ordinalIndicator = 'rd';
  } else {
    ordinalIndicator = 'th';
  }

  const weekDay = daysOfTheWeek[now.getDay()];
  const month = months[now.getMonth()];
  const year = String(now.getFullYear());
  
  const dateString = `${weekDay}, ${month} ${day}${ordinalIndicator}, ${year}`;
  
  const currentDateContainer = document.getElementById('js-current-date');
  currentDateContainer.textContent = dateString;
}

displayCurrentDate();