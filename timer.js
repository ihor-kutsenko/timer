
const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  resetBtn: document.querySelector('button[data-action-reset]'),
  clockface: document.querySelector('.js-clockface'),
};

refs.stopBtn.disabled = true;

class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.onTick = onTick;

    this.reset();
  }

  start() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    refs.resetBtn.disabled = true;
    const startTime = Date.now();

   this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = this.getTimeComponents(deltaTime);
     
    //  updateClockface(time);
     this.onTick(time);
      
    }, 1000);
  };

  stop() {

    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    refs.resetBtn.disabled = false;
    clearInterval(this.intervalId);
  };

  reset() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

   getTimeComponents(time) {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
  };
  
   pad(value) {
    return String(value).padStart(2, '0');
  }

}


const timer = new Timer({
  onTick: updateClockface,
});




refs.startBtn.addEventListener('click', () => {
  timer.start();
})

refs.stopBtn.addEventListener('click', () => {
  timer.stop();
})

refs.resetBtn.addEventListener('click', () => {
  timer.reset();
} )


function updateClockface({ hours, mins, secs }) {
  refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}
















 

