// Get DOM elements
const minuteLabel = document.getElementById('time-minutes');
const secondLabel = document.getElementById('time-seconds');
const millisecondLabel = document.getElementById('time-milliseconds');
const startButton = document.querySelector('#btn-start');
const pauseButton = document.querySelector('#btn-pause');
const resetButton = document.querySelector('#btn-reset');
const lapButton = document.querySelector('#btn-lap');
const deleteButton = document.querySelector('#btn-delete');
const lapList = document.querySelector('.lap-list');

// Stopwatch variables
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

// Disable all buttons except the Start button initially
toggleButtonState(true);

// Event listeners for the buttons

// Start button click event
startButton.addEventListener('click', () => {
    interval = setInterval(updateTimer, 10);
    startButton.disabled = true;
    pauseButton.disabled = false;
    lapButton.disabled = false;
    toggleButtonState(false);
});

// Pause button click event
pauseButton.addEventListener('click', () => {
    clearInterval(interval);
    pauseButton.disabled = true;
    startButton.disabled = false;
    lapButton.disabled = true;
});

// Reset button click event
resetButton.addEventListener('click', () => {
    clearInterval(interval);
    resetTimeData();
    displayTimer();
    pauseButton.disabled = true;
    startButton.disabled = false;
    lapButton.disabled = true;
});

// Lap button click event
lapButton.addEventListener('click', () => {
    addToList();
    deleteButton.disabled = false;
});

// Delete button click event
deleteButton.addEventListener('click', () => {
    // Reset lap list to initial state
    lapList.innerHTML = '';
    deleteButton.disabled = true;
});

// Lap list click event to handle lap deletion
lapList.addEventListener('click', function (event) {
    // Check if the clicked element is a delete button
    if (event.target.tagName === 'I' && event.target.classList.contains('fa-trash')) {
        // Remove the corresponding lap when the delete button is clicked
        const lapItem = event.target.closest('.lap');
        if (lapItem) {
            lapItem.parentNode.removeChild(lapItem);

            // Disable the delete button if there are no laps remaining
            deleteButton.disabled = lapList.childElementCount === 0;
        }
    }
});

// Functions to handle the events

// Function to toggle button states
function toggleButtonState(state) {
    pauseButton.disabled = state;
    resetButton.disabled = state;
    lapButton.disabled = state;
    deleteButton.disabled = state;
}

// Function to update the timer
function updateTimer() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        alert("my code cannot parse more than 1 hour of data");
        resetTimeData();
    }
    displayTimer();
}

// Function to display the timer
function displayTimer() {
    millisecondLabel.innerHTML = padTime(milliseconds);
    secondLabel.innerHTML = padTime(seconds);
    minuteLabel.innerHTML = padTime(minutes);
}

// Function to pad time with leading zeros
function padTime(time) {
    return time.toString().padStart(2, '0');
}

// Function to reset time data
function resetTimeData() {
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
}

// Function to add a lap to the lap list
function addToList() {
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<li class="lap">
            <p>
                <strong>Lap ${lapList.childElementCount}: </strong>
                <span>${lapTime}</span>
            </p>

            <button title="delete lap">
                <i class="fa-solid fa-trash"></i>
            </button>
        </li>`;
    lapList.appendChild(listItem);
    listItem.scrollIntoView({behavior: 'smooth'});
}
