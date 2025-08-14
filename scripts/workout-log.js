function renderWorkout() {
  let workoutLogHTML = '';
  
  const workoutLog = JSON.parse(localStorage.getItem('currentWorkout'));
  
  workoutLog.forEach((exercise) => {
    workoutLogHTML += `
      
    `;
  });
}
renderWorkout();