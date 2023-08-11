let mode = document.querySelector(".mode");
let body = {
  el: document.querySelector("body"),
  dark: false,
};

mode.addEventListener("click", function () {
  if (body.dark === false) {
    body.dark = true;
    body.el.className = "dark";
    mode.textContent = "light";
  } else {
    body.dark = false;
    body.el.className = "light";
    mode.textContent = "dark";
  }
});

/*  stopwatch functioning  */

const startPauseButton = document.getElementById("start-pause");
const timerDisplay = document.getElementById("timer");
const resetBtn = document.getElementById("reset");

const lapButton = document.getElementById("lap");
const lapListUl = document.getElementById("lap-list-ul");
const lapListNoLaps = document.getElementById("lap-list-no-laps");

const animation_i = document.getElementById("animation-i");

let running = false;
let startTime;
let interval;
let currentTime = (lapCount = 0);

function formatTime(ms) {
  const date = new Date(ms);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  //const milliseconds = String(ms).slice(-3).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}`;
}

const startStopAnimation = (event) => {
  animation_i.style.animation =
    event === "start" ? "animate 1s linear infinite" : "";
};

// update timer
function updateTime() {
  currentTime = Date.now() - startTime;
  timerDisplay.textContent = formatTime(currentTime);
}

// start timer
function start() {
  running = true;
  startTime = Date.now() - (currentTime ? currentTime : 0);
  interval = setInterval(updateTime, 10);
  startStopAnimation("start");
}

//pause timer
function pause() {
  running = false;
  clearInterval(interval);
  startStopAnimation("stop");
}

// reset timer
function reset() {
  const removeLapLi = () => {
    try {
      document.querySelectorAll("#lap-li").forEach((li) => {
        li.remove();
      });
    } catch (e) {}
  };

  pause();
  startPauseButton.textContent = "Start";
  running = false;
  // show lap list
  lapListNoLaps.style.display = "block";
  removeLapLi();
  currentTime = lapCount = 0;
  //updateCircle(currentTime);
  timerDisplay.textContent = formatTime(currentTime);
}

// lap functions
function recordLap() {
  // hide no laps
  lapListNoLaps.style.display = "none";
  // add lap time
  const lapTime = formatTime(currentTime);
  const lapItem = document.createElement("li");
  lapItem.id = "lap-li";
  const lapItemSpan = document.createElement("span");
  const lapItemP = document.createElement("p");

  lapItemSpan.textContent = `#${++lapCount}`;
  lapItemP.textContent = lapTime;

  lapItem.appendChild(lapItemSpan);
  lapItem.appendChild(lapItemP);
  lapListUl.appendChild(lapItem);
}

// show hide button
function showHideButton(btn, event) {
  if (event === "show") btn.classList.add(event);
  else btn.classList.remove(event);
}

/*

Event Listener

*/

lapButton.addEventListener("click", () => {
  if (running) {
    recordLap();
  }
});

startPauseButton.addEventListener("click", () => {
  showHideButton(resetBtn, "show");
  showHideButton(lapButton, "show");
  if (!running) {
    startPauseButton.textContent = "Pause";
    start();
  } else {
    startPauseButton.textContent = "Start";
    pause();
  }
});

resetBtn.addEventListener("click", () => {
  reset();
});
