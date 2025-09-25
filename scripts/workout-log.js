function renderWorkout() {
  let workoutLogHTMLWrap = '';
  
  const workoutLog = JSON.parse(localStorage.getItem('currentWorkout')) || [];
  
  workoutLog.forEach((exercise) => {
    let workoutLogHTML = '';
    workoutLogHTML += `
      <div class="sets-reps">
        ${exercise.exerciseName}
        <span>
          <button class="edit-exercise" 
          data-exercise-id="${exercise.exerciseId}" data-muscle-group="${exercise.muscleGroup}">
            Edit
          </button>
          <button class="delete-exercise" data-exercise-id="${exercise.exerciseId}">
            Delete
          </button>
        </span>
      </div>
    `;
    exercise.sets.forEach((set, index) => {
      workoutLogHTML += `
        <div>Set ${index + 1}: ${set.weight}kg x ${set.reps} reps (RIR: ${set.rir})</div>
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

  document.querySelectorAll('.edit-exercise').forEach((button) => {
    button.addEventListener('click', (e) => {
      const exerciseId = e.target.getAttribute('data-exercise-id');
      const muscleGroup = e.target.getAttribute('data-muscle-group');
      localStorage.setItem('selectedExerciseId', exerciseId);
      localStorage.setItem('selectedMuscleGroup', muscleGroup);

      window.location.href = '../exercise.html';
    });
  });
}
renderWorkout();

const addNewExistingExerciseButton = document.getElementById('js-add-new-exercise');
addNewExistingExerciseButton.addEventListener('click', () => {
  window.location.href = '../muscle-list-page.html';
});

async function saveWorkoutToDB() {
  try {
    const localWorkout = JSON.parse(localStorage.getItem('currentWorkout')) || [];

    // Get all exercises from API to map names => _id
    const res = await fetch('http://localhost:3000/api/exercises');
    const allExercises = await res.json();
    const nameToId = new Map(allExercises.map(e => [e.name, e._id]));

    // It's similar to a forEach or a for loop, but forEach doesn't accept async await functions and for loop would make it more difficult to read
    for (const exercise of localWorkout) {
      if(!nameToId.get(exercise.exerciseName)) {
        // Create the missing exercise
        const newExercise = await fetch('http://localhost:3000/api/exercises', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: exercise.exerciseName,
            muscleGroup: exercise.muscleGroup,
            type: 'weighted'
          })
        });
        const created = await newExercise.json();
        nameToId.set(exercise.exerciseName, created._id);
      }
    }
    
    // Build API payload using Mongo _id
    const payload = {
      exercises: localWorkout.map(ex => ({
        exerciseId: nameToId.get(ex.exerciseName),
        sets: ex.sets.map(s => ({
          weight: s.weight,
          reps: s.reps,
          rir: s.rir
        }))
      }))
    };

    const missing = payload.exercises.filter(e => !e.exerciseId);
    if (missing.length) {
      alert('Some exercises still missing IDs'); 
      return;
    }

    console.log(payload);

    // POST workout to API
    const postRes = await fetch('http://localhost:3000/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!postRes.ok) {
      const err = await postRes.json().catch(() => ({}));
      console.error('Save failed:', err);
      alert('Failed to save workout.');
      return;
    }

    const saved = await postRes.json();
    console.log('Saved workout:', saved);
    alert('Workout saved!');

  } catch (e) {
    console.error(e);
    alert('Unexpected error saving workout.');
  }
}

const saveWorkoutBtn = document.getElementById('js-save-workout');
if (saveWorkoutBtn) {
  saveWorkoutBtn.addEventListener('click', saveWorkoutToDB);
}

async function loadSavedWorkoutsByDate(dateStr) {
  try {
    const url = dateStr 
      ? `http://localhost:3000/api/workouts?date=${encodeURIComponent(dateStr)}`
      : 'http://localhost:3000/api/workouts';
  
    const res = await fetch(url);
    const workouts = await res.json();

    const container = document.getElementById('js-history-results');
    let html = '';

    workouts.forEach((w) => {
      const dateLabel = new Date(w.date).toLocaleDateString(undefined, { timeZone: 'UTC' });
      let block = `<div class="each-exercise-and-sets"><div><strong>${dateLabel}</strong></div>`;

      w.exercises.forEach((e) => {
        const name = e.exerciseId?.name || '(unknown exercise)';
        block += `<div class="sets-reps">${name}</div>`;
        e.sets.forEach((s, i) => {
          block += `<div>Set ${i + 1}: ${s.weight}kg x ${s.reps} (RIR: ${s.rir})</div>`;
        });
      });

      block += `</div>`;
      html += block;
    });

    container.innerHTML = html || '<div>No workouts for this date.</div>';
  } catch (err) {
    console.error(err);
    alert('Failed to load history');
  }
}

// Wire button
const historyBtn = document.getElementById('js-load-history');
if (historyBtn) {
  historyBtn.addEventListener('click', () => {
    const input = document.getElementById('js-history-date');
    const dateStr = input && input.value ? input.value : undefined;
    loadSavedWorkoutsByDate(dateStr);
  });
}