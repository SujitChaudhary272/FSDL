const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let startTime = 0;
let elapsedTime = 0;
let timer = null;

const pad = (n) => String(n).padStart(2, "0");

const formatTime = (ms) => {
  const cs = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000) % 60;
  const hours = Math.floor(ms / 3600000);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(cs)}`;
};

function updateDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  timeDisplay.textContent = formatTime(currentTime);
}

function startStopwatch() {
  if (timer !== null) return;
  startTime = Date.now();
  timer = setInterval(updateDisplay, 10);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopStopwatch() {
  if (timer === null) return;
  clearInterval(timer);
  timer = null;
  elapsedTime += Date.now() - startTime;
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function resetStopwatch() {
  clearInterval(timer);
  timer = null;
  startTime = 0;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

startBtn.addEventListener("click", startStopwatch);
stopBtn.addEventListener("click", stopStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
