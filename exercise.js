const sets = [];

const weightInput = document.getElementById('js-weight-input');
const repsInput = document.getElementById('js-reps-input');

let rir = 0;

const rirDisplay = document.getElementById('rir-display');
const increaseRirButton = document.getElementById('js-increase-rir');
const decreaseRirButton = document.getElementById('js-decrease-rir');

increaseRirButton.addEventListener('click', () => {
  rir += 0.5;
  rirDisplay.textContent = rir.toFixed(1);
});

decreaseRirButton.addEventListener('click', () => {
  if (rir >= 0.5) {
    rir -= 0.5;
    rirDisplay.textContent = rir.toFixed(1);
  }
});

const saveButton = document.getElementById('save-button');
const clearButton = document.getElementById('clear-button');

saveButton.addEventListener('click', () => {
  const repsValue = repsInput.value;
  const isValidReps = Number.isInteger(Number(repsValue));

  if(!isValidReps) {
    alert('Reps must be whole numbers only.');
    return;
  }

  let set = {
    weight: parseFloat(weightInput.value),
    reps: parseInt(repsInput.value),
    rir: rir
  }
  sets.push(set);
  console.log(sets);

  resetInputs();
});

clearButton.addEventListener('click', () => {
  resetInputs();
});

function resetInputs() {
  weightInput.value = '';
  repsInput.value = '';
  rir = 0;
  rirDisplay.textContent = rir.toFixed(1);
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