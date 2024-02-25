function timer() {
  // ? Timer ------------------------------------------------------------

  const deadline = "2023-08-28";

  function getTimeRemaining(endtime) {
  let days, hours, minutes, seconds;

  const timer = Date.parse(endtime) - Date.parse(new Date());

  if (timer <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  } else {
    days = Math.floor(timer / (1000 * 60 * 60 * 24));
    hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((timer / 1000 / 60) % 60);
    seconds = Math.floor((timer / 1000) % 60);
  }

  return { timer, days, hours, minutes, seconds };
  }

  function setZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
  }

  function setClock(selector, endtime) {
  const timer = document.querySelector(selector),
    days = timer.querySelector("#days"),
    hours = timer.querySelector("#hours"),
    minutes = timer.querySelector("#minutes"),
    seconds = timer.querySelector("#seconds"),
    timeInterval = setInterval(updateClock, 1000);

  function updateClock() {
    const t = getTimeRemaining(endtime);

    days.textContent = setZero(t.days);
    hours.textContent = setZero(t.hours);
    minutes.textContent = setZero(t.minutes);
    seconds.textContent = setZero(t.seconds);

    if (t.timer <= 0) {
      clearInterval(timeInterval);
    }
  }
  }

  setClock(".timer", deadline);
}

export default timer