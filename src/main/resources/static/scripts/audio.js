//The scripts were written by a friend of mine, sorry for the shitty code

const play = document.querySelectorAll(".audio-play-btn");

let interval;

function sToStr(s) {
  let m = Math.trunc(s / 60) + "";
  s = (s % 60) + "";
  return m.padStart(2, 0) + ":" + s.padStart(2, 0);
}

const playClickHandler = (e) => {
  const audio = e.target.previousElementSibling;
  const line = e.target.nextElementSibling;
  const fill = line.lastElementChild;
  const timeBlock = e.target.nextElementSibling.nextElementSibling;

  let time = audio.currentTime;

  if (audio.paused) {
    e.target.classList.add("active");
    audio.play();

    time++;
    timeBlock.innerHTML = sToStr(parseInt(time));

    interval = setInterval(() => {
      time++;
      timeBlock.innerHTML = sToStr(parseInt(time));
      fill.style.width = `${
        line.offsetWidth * (audio.currentTime / audio.duration)
      }px`;
    }, 1000);
  } else {
    audio.pause();
    e.target.classList.remove("active");
    clearInterval(interval);
  }
};

play.forEach((button) => button.addEventListener("click", playClickHandler));
