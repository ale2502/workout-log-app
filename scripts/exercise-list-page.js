import { exercises } from "../data/exercise-list.js";

function renderExercisesList() {
  let exercisesListHTML = '';

  exercises.forEach((exercise) => {
    exercisesListHTML += `
      <div>${exercise.name}</div>
    `;
  });

  const exerciseList = document.getElementById('exercise-list');
  exerciseList.innerHTML = exercisesListHTML;
}

renderExercisesList();
