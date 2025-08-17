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
          <button>Delete</button>
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
}
renderWorkout();