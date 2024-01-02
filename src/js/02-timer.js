import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const timerСountingDownTime = document.querySelector('.timer');
const inputText = document.getElementById('datetime-picker');
const btnStart = document.querySelector('[data-start]');

btnStart.disabled = true;

let finalDate = null;
let isActive = false;
 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkingSelectedDate(selectedDates[0]);
    
      finalDate = selectedDates[0];
  },
};

flatpickr(inputText, options);

function checkingSelectedDate(date) {
  
    const currentTime = new Date();
    const timeDifference = date.getTime() - currentTime.getTime();
       if (timeDifference < 0) {
         Notiflix.Notify.info('Please choose a date in the future');
        return;
    } 
      
  btnStart.disabled = false;

}

function start() {
  let deltaTime = 0;
  
  if (isActive) {
    return;
  }

  isActive = true;
  const timeInterval = setInterval(() => {
    
    const currentTime = Date.now();
    deltaTime = finalDate.getTime() - currentTime;
    const countdown = convertMs(deltaTime);
    
    if (deltaTime <= 0) {
      clearInterval(timeInterval);
      return;
    }

    apdateClockFace(countdown);
  
  }, 1000);

}
   

btnStart.addEventListener('click', start);
    
function apdateClockFace({days, hours, minutes, seconds} ){
    timerСountingDownTime.textContent = `${days} : ${hours} : ${minutes} : ${seconds} `;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2 , '0');
 }