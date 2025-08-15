function renderWorkout() {
  let workoutLogHTML = '';
  
  const workoutLog = JSON.parse(localStorage.getItem('currentWorkout'));
  
  workoutLog.forEach((exercise) => {
    workoutLogHTML += `
      <div>${exercise.exerciseName}</div>
      <div>${exercise.sets}</div>
    `;
  });
  document.getElementById('exercises-and-sets').innerHTML = workoutLogHTML;
}
renderWorkout();