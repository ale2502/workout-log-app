import { muscleGroups } from "../data/muscle-list.js";

function renderMuscleGroups() {
  let muscleGroupsHTML = '';

  muscleGroups.forEach((group) => {
    muscleGroupsHTML += 
    `
      <div class="div-muscle-group-button">
        <button class="muscle-group-button"
          data-muscle="${group}">
          ${group}
        </button>
      </div>
    `;
  });

  const muscleGroupsList = document.getElementById('muscle-list');
  muscleGroupsList.innerHTML = muscleGroupsHTML;

  const allButtons = document.querySelectorAll('.muscle-group-button');
  allButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedGroup = button.getAttribute('data-muscle');
      localStorage.setItem('selectedMuscleGroup', selectedGroup);
      window.location.href = '../exercise-list-page.html';  
    });
  });
}

renderMuscleGroups();

function addNewMuscleGroup() {
  const addNewMuscleGroupButton = document.getElementById('js-add-new-muscle-group');
  addNewMuscleGroupButton.addEventListener('click', () => {
    
  });
}