import { exercises } from "../data/exercise-list.js";

function buttonBackSpecificMuscleGroup() {
  const topButtonContainer = document.getElementById('js-specific-muscle-button-container');
  const selectedGroup = localStorage.getItem('selectedMuscleGroup');
  
  topButtonContainer.innerHTML = 
  `
    <button id="back-to-specific-muscle-button">Back to ${selectedGroup} exercises</button>
  `;
  
  const backToSpecificMuscleButton = document.getElementById('back-to-specific-muscle-button');
  backToSpecificMuscleButton.addEventListener('click', () => {
    localStorage.setItem('selectedMuscleGroup', selectedGroup);
    window.location.href = '../exercise-list-page.html';
  });

}

buttonBackSpecificMuscleGroup();

const allMuscleButton = document.getElementById('back-to-all-muscle-button');
allMuscleButton.addEventListener('click', () => {
  window.location.href = '../muscle-list-page.html';
});

function getChosenExercise() {
  const chosenExerciseId = Number(localStorage.getItem('selectedExerciseId'));
  let chosenExercise = '';

  exercises.forEach((exercise) => {
    if (chosenExerciseId === exercise.id) {
      chosenExercise = exercise.name;
    }
  });
  document.getElementById('exercise-title').innerHTML = chosenExercise;
}

getChosenExercise();

const sets = [];

function loadExistingExercise() {
  const selectedExerciseId = localStorage.getItem('selectedExerciseId');
  
  const currentWorkout = JSON.parse(localStorage.getItem('currentWorkout')) || [];
  const existingExercise = currentWorkout.find(ex => ex.exerciseId === selectedExerciseId);

  if (existingExercise) {
    sets.splice(0, sets.length, ...existingExercise.sets);
    renderSets();
  }
}

loadExistingExercise();

const weightInput = document.getElementById('js-weight-input');
const repsInput = document.getElementById('js-reps-input');

let rir = 0;

const rirDisplay = document.getElementById('rir-display');
const increaseRirButton = document.getElementById('js-increase-rir');
const decreaseRirButton = document.getElementById('js-decrease-rir');

increaseRirButton.addEventListener('click', () => {
  if (rir < 10) {
    rir += 0.5;
    rirDisplay.textContent = rir.toFixed(1);
  }
});

decreaseRirButton.addEventListener('click', () => {
  if (rir >= 0.5) {
    rir -= 0.5;
    rirDisplay.textContent = rir.toFixed(1);
  }
});

const saveButton = document.getElementById('save-button');
const clearButton = document.getElementById('clear-button');
const currentWorkoutButton = document.getElementById('current-workout-button');

let editIndex = null;

saveButton.addEventListener('click', () => {
  const repsValue = repsInput.value;
  const isValidReps = Number.isInteger(Number(repsValue));

  if(!isValidReps) {
    alert('Reps must be whole numbers only.');
    return;
  }

  let set = {
    weight: parseFloat(weightInput.value).toFixed(1),
    reps: parseInt(repsInput.value),
    rir: rir.toFixed(1)
  }

  if (editIndex !== null) {
    sets[editIndex] = set;
    editIndex = null;
  } else {
    sets.push(set);
  }
  
  saveExerciseToCurrentWorkout();
  renderSets();
  //console.log(sets);
});

clearButton.addEventListener('click', () => {
  resetInputs();
});

currentWorkoutButton.addEventListener('click', () => {
  window.location.href = '../workout-log.html';
});

function resetInputs() {
  weightInput.value = '';
  repsInput.value = '';
  rir = 0;
  rirDisplay.textContent = rir.toFixed(1);
}

function saveExerciseToCurrentWorkout() {
  const selectedExerciseName = localStorage.getItem('selectedExerciseName');
  const selectedExerciseId = localStorage.getItem('selectedExerciseId');

  let currentWorkout = JSON.parse(localStorage.getItem('currentWorkout')) || [];

  let existingExercise = currentWorkout.find((ex) => ex.exerciseId === selectedExerciseId);

  if (existingExercise) {
    existingExercise.sets = sets;
  } else {
    currentWorkout.push({
      exerciseId: selectedExerciseId,
      exerciseName: selectedExerciseName,
      sets: sets
    });
  }
  localStorage.setItem('currentWorkout', JSON.stringify(currentWorkout));
  console.log(currentWorkout);
}

repsInput.addEventListener('keydown', (e) => {
  if (e.key === '.' || e.key === ',' || e.key === '-') {
    e.preventDefault();
  }
});

weightInput.addEventListener('keydown', (e) => {
  if (e.key === '-' || e.key === ',') {
    e.preventDefault();
  }
});

function renderSets() {
  let setsTableHTML = '';

  sets.forEach((set, index) => {
    setsTableHTML += `
      <div class="sets-and-remove">
        <div class="sets-table">
          <div>${index + 1}</div>
          <div>${set.weight}</div>
          <div>${set.reps}</div>
          <div>${set.rir}</div>
        </div>
        <div>
          <button class="remove-set-button" data-index="${index}">Remove</button>
          <button class="edit-set-button" data-index="${index}">Edit</button>
        </div>
      </div>
    `;
  });

  const setsTable = document.getElementById('sets-table');
  setsTable.innerHTML = setsTableHTML;

  document.querySelectorAll('.remove-set-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      sets.splice(index, 1);
      saveExerciseToCurrentWorkout();
      renderSets();
    });
  });

  
  document.querySelectorAll('.edit-set-button').forEach(button => {
    button.addEventListener('click', (e) => {
      editIndex = e.target.getAttribute('data-index');
      
      weightInput.value = sets[editIndex].weight;
      repsInput.value = sets[editIndex].reps;
      // Before, it was rirDisplay.textContent = sets[index].rir; meaning that only DOM was being editing, but no RIR
      rir = parseFloat(sets[editIndex].rir)
      rirDisplay.textContent = rir.toFixed(1);
    });
  });
}