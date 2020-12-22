// Clock // Clock // Clock // Clock
function showTime() {
  const date = new Date();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  let session = 'AM';

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = 'PM';
  }

  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  let time = h + ':' + m + ':' + s + ' ' + session;
  document.getElementById('mainClock').innerText = time;
  document.getElementById('mainClock').textContent = time;

  setTimeout(showTime, 1000);
}
showTime();

// ----------------------------------------------------------------------------------------

// On Air time // On Air time // On Air time
let pickedTime;
const timePicker = document.querySelector('#timePick');
const countdownText = document.querySelector('#MyClockDisplayStart');
let timerID;
timePicker.addEventListener('change', (e) => {
  pickedTime = e.target.value;

  if (timerID) return;
  timerID = setInterval(() => {
    if (pickedTime === undefined) return;
    const remainingTime = getRemainingTime(pickedTime);

    if (remainingTime == 0) {
      countdownText.innerText = 'On Air';
      clearInterval(timerID);
      timerID = undefined;
    } else {
      countdownText.innerText = remainingTime;
    }
  }, 1000);
});

function getRemainingTime(timeString) {
  if (timeString === undefined) return;

  const timeStringParts = timeString.split(':');

  // making sure that we got atleast hours and minutes
  if (timeStringParts.length < 2) {
    return;
  }

  let countDownTime = new Date();
  countDownTime.setHours(parseInt(timeStringParts[0], 10));
  countDownTime.setMinutes(parseInt(timeStringParts[1], 10));
  // set the seconds if they were specified, otherwise set them to 0
  if (timeStringParts[2]) {
    countDownTime.setSeconds(parseInt(timeStringParts[2], 10));
  } else {
    countDownTime.setSeconds(0);
  }

  const currentTime = new Date();

  if (countDownTime.getDate() <= currentTime.getDate()) {
    countDownTime.setDate(countDownTime.getDate() + 1);
  }

  const difference = countDownTime.getTime() - currentTime.getTime();

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Adds zero infront of seconds
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  if (hours > 0) return hours + ':' + minutes + ':' + seconds;
  if (minutes > 0) return minutes + ':' + seconds;
  if (seconds >= 0) return seconds;
}

// ----------------------------------------------------------------------------------------

// Break Time // Break Time // Break Time // Break Time
let inputTime = document.getElementById('breakTimeInput');

document.querySelector('#cta-paus').addEventListener('click', function () {
  if (inputTime.value === '') {
    swal('Break Time', 'You forgot to set break time!', 'warning');
    return;
  }

  let breakTime = inputTime.value * 60;
  let intervalId = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    let minutes = Math.floor(breakTime / 60);
    let seconds = breakTime % 60;

    // Adds zero infront of seconds
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Out puts the time
    document.querySelector(
      '#MyClockDisplayDown'
    ).innerText = `${minutes}:${seconds}`;
    breakTime--;

    // Removes zero when minutes are done
    if (minutes == 0) {
      document.querySelector('#MyClockDisplayDown').innerText = `${seconds}`;
    }

    // If the count down is finished, write some text
    if (breakTime < 0) {
      document.querySelector('#MyClockDisplayDown').innerText = 'On Air';
      inputTime.value = '';

      clearInterval(intervalId);

      setTimeout(() => {
        document.querySelector('#MyClockDisplayDown').innerText = '';
      }, 4000);
    }
  }
});

// ----------------------------------------------------------------------------------------

// Timers add // Timers add // Timers add // Timers add
// const timerList = document.getElementById('timersList');

// const timerDiv = document.querySelector('.timerdiv');
// const addTimer = document.getElementById('cta-add');
// const delTimer = document.querySelector('div');
// const clearTimer = document.getElementById('cta-clear');

// let timersHTML = '';
// addTimer.addEventListener('click', function () {
//   timersHTML += `<li>`;
//   timersHTML += `<div class="timerdiv">`;
//   timersHTML += `<div class="left">`;
//   timersHTML += `<button id="cta-Start" >Start <i class="fas fa-play-circle"></i></button>`;
//   timersHTML += `<input type="time" class="timePickList" name="time" step="2" />`;
//   timersHTML += `<input type="text" class="listTitle" placeholder="Title..." />`;
//   timersHTML += `</div>`;
//   timersHTML += `<div class="right">`;
//   timersHTML += `<div  class="listTimer">11:02:22`;
//   timersHTML += `</div>`;
//   timersHTML += `<button id="cta-Del" ><i class="fas fa-trash-alt"></i></button>`;
//   timersHTML += `</div>`;
//   timersHTML += `</div>`;
//   timersHTML += `</li> `;

//   timerList.innerHTML = timersHTML;
// });

// delTimer.addEventListener('click', deleteTimer);

// function deleteTimer() {}

// clearTimer.addEventListener('click', function () {
//   timerList.innerHTML = '';
// });
