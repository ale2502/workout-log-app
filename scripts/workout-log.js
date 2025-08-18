function renderWorkout() {
  let workoutLogHTMLWrap = '';
  
  const workoutLog = JSON.parse(localStorage.getItem('currentWorkout')) || [];
  
  workoutLog.forEach((exercise) => {
    let workoutLogHTML = '';
    workoutLogHTML += `
      <div class="sets-reps">
        ${exercise.exerciseName}
        <span>
          <button>Edit</button>
          <button class="delete-exercise" data-exercise-id="${exercise.exerciseId}">Delete</button>
        </span>
      </div>
    `;
    exercise.sets.forEach((set) => {
      workoutLogHTML += `
        <div>Set ${set.set}: ${set.weight}kg x ${set.reps} reps (RIR: ${set.rir})</div>
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
}
renderWorkout();