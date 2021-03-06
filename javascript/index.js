const chronometer = new Chronometer();

// get the buttons:
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");

// get the DOM elements that will serve us to display the time:
let minDec = document.getElementById("minDec");
let minUni = document.getElementById("minUni");
let secDec = document.getElementById("secDec");
let secUni = document.getElementById("secUni");
let milDec = document.getElementById("milDec");
let milUni = document.getElementById("milUni");
let splits = document.getElementById("splits");

function printTime() {
  printMilliseconds();
  printSeconds();
  printMinutes();

  //calling printTime() as a callback to requestAnimationFrame() as it will repeatedly show(print) time on clock.
  window.requestAnimationFrame(printTime);
}

function printMinutes() {
  var mins = chronometer.twoDigitsNumber(chronometer.getMinutes());
  minDec.innerText = mins[0];
  minUni.innerText = mins[1];
}

function printSeconds() {
  var seconds = chronometer.twoDigitsNumber(chronometer.getSeconds());
  secDec.innerText = seconds[0];
  secUni.innerText = seconds[1];
}

function printMilliseconds() {
  var ms = chronometer.twoDigitsNumber(chronometer.getMilliSeconds());
  milDec.innerText = ms[0];
  milUni.innerText = ms[1];
}

function printSplit(splitTime) {
  var olElement = document.getElementById("splits");
  var liElement = document.createElement("li");
  liElement.innerText = splitTime;
  olElement.appendChild(liElement);
}

function clearSplits() {
  var olElement = document.getElementById("splits");
  olElement.innerHTML = "";
  chronometer.resetClick();
}

function setStopBtn() {
  btnLeft.innerText = "STOP";
  btnLeft.setAttribute("class", "btn stop");
}

function setSplitBtn() {
  btnRight.innerText = "SPLIT";
  btnRight.setAttribute("class", "btn split");
}

function setStartBtn() {
  btnLeft.innerText = "START";
  btnLeft.setAttribute("class", "btn start");
}

function setResetBtn() {
  btnRight.innerText = "RESET";
  btnRight.setAttribute("class", "btn reset");
}

// Start/Stop Button
btnLeft.addEventListener("click", () => {
  if (btnLeft.innerText === "START") {
    chronometer.startClick();
    chronometer.startClickMilliSeconds();
    setStopBtn();
    setSplitBtn();
  } else {
    chronometer.stopClick();
    setStartBtn();
    setResetBtn();
  }
});

// Reset/Split Button
btnRight.addEventListener("click", () => {
  if (btnRight.innerText === "SPLIT") {
    setSplitBtn();
    var splitTime = chronometer.splitClick();
    printSplit(splitTime);
  } else {
    clearSplits();
    setResetBtn();
  }
});

printTime();
