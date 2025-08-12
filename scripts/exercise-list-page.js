import { exercises } from "../data/exercise-list.js";

function renderExercisesList() {
  const selectedGroup = localStorage.getItem('selectedMuscleGroup');
  
  let filteredExercises = exercises;
  if (selectedGroup) {
    filteredExercises = exercises.filter(ex => ex.muscleGroup === selectedGroup);
  }

  let exercisesListHTML = '';

  filteredExercises.forEach((exercise) => {
    exercisesListHTML += `
      <div class="div-exercise-button">
        <button class="exercise-button"
          data-exercise="${exercise.id}"
          data-exercise-name="${exercise.name}">
          ${exercise.name}
        </button>
      </div>
    `;
  });

  const exerciseList = document.getElementById('exercise-list');
  exerciseList.innerHTML = exercisesListHTML;

  const allExercisesButtons = document.querySelectorAll('.exercise-button');
  allExercisesButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedExerciseId = button.getAttribute('data-exercise');
      const selectedExerciseName = button.getAttribute('data-exercise-name');
      localStorage.setItem('selectedExerciseId', selectedExerciseId); 
      window.location.href = '../exercise.html';
    });
  });
}

renderExercisesList();
