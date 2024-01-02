const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

let intervalId = null;
btnStop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onBtnStartClick() {
    btnStart.disabled = true;
    btnStop.disabled = false;
    
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

function onBtnStopClick() {
    btnStop.disabled = true;
    btnStart.disabled = false;

    clearInterval(intervalId);
}








