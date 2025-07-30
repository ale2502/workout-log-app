const sets = [];

const weightInput = document.getElementById('js-weight-input');
const repsInput = document.getElementById('js-reps-input');
const rirInput = document.getElementById('js-rir-input');
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', () => {
  const set = {
    weight: parseFloat(weightInput.value),
    reps: parseInt(repsInput.value),
    rir: parseInt(rirInput.value)
  }
  sets.push(set);
  console.log(sets);
});