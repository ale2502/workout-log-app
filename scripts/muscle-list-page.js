import { muscleGroups } from "../data/muscle-list.js";

function renderMuscleGroups() {
  let muscleGroupsHTML = '';

  muscleGroups.forEach((group) => {
    muscleGroupsHTML += `
      <div>${group}</div>
    `;
  });

  const muscleGroupsList = document.getElementById('muscle-list');
  muscleGroupsList.innerHTML = muscleGroupsHTML;
}

renderMuscleGroups();