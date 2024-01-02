import Notiflix from 'notiflix';
const form = document.querySelector('.form');

form.addEventListener('submit',onFormSubmit);

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
    
     if (shouldResolve) {
       resolve({ position, delay});
  }  else {
      reject({ position, delay});
  } 
    }, delay);
  });
}


function onFormSubmit(evt) {
  const firstDelay = document.querySelector('input[name="delay"]');
  const amount = document.querySelector('input[name="amount"]');
  const delayStep = document.querySelector('input[name="step"]');
  
  evt.preventDefault();
  let counter = 0;
  let numberDel = parseInt(firstDelay.value);

  const timerId = setInterval(() => {
    counter += 1;
    numberDel += parseInt(delayStep.value);   

    createPromise(counter, numberDel).then(({ position, delay }) => {
    Notiflix.Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.info(`❌ Rejected promise ${position} in ${delay}ms`);
  });

    if (counter === parseInt(amount.value)){
      clearInterval(timerId);
    }
  }, firstDelay.value);  
  
}



