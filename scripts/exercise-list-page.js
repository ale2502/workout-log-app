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
      <div>${exercise.name}</div>
    `;
  });

  const exerciseList = document.getElementById('exercise-list');
  exerciseList.innerHTML = exercisesListHTML;
}

renderExercisesList();
