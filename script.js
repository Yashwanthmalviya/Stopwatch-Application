let startTime;
let updatedTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");     //for displaying the time
const startStopBtn = document.getElementById("startStopBtn");   //
const lapsContainer = document.getElementById("laps");

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - elapsedTime;  //checks if there is any 
    timerInterval = setInterval(updateDisplay, 10); // Update every 10 milliseconds
    startStopBtn.textContent = "Stop"; //changes the buttom text to stop after start is pressed
    running = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime = new Date().getTime() - startTime;
    startStopBtn.textContent = "Start";
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  display.textContent = "00:00:00.000";
  startStopBtn.textContent = "Start";
  running = false;
  elapsedTime = 0;
  lapsContainer.innerHTML = "";
}

function updateDisplay() {
  updatedTime = new Date().getTime();  //gets year, date and time   
  let difference = updatedTime - startTime;

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = difference % 1000;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
  if (running) {
    const lapTime = display.textContent;   //the time at which the lap is clicked is assigned to laptime
    const lapElement = document.createElement("div");   //div is created to record the time
    lapElement.className = "lap";
    lapElement.textContent = lapTime;
    lapsContainer.appendChild(lapElement);
  }
}
