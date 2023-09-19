let runTime, walkTime;
let isRunning = true;
let interval;

document.getElementById('start-button').addEventListener('click', () => {
    runTime = parseInt(document.getElementById('run-time').value) * 60;
    walkTime = parseInt(document.getElementById('walk-time').value) * 60;
    
    if (isNaN(runTime) || isNaN(walkTime) || runTime <= 0 || walkTime <= 0) {
        alert('Please enter valid run and walk times.');
        return;
    }

    document.getElementById('mode').textContent = 'Running';
    playSound(isRunning); // Play the running sound when the timer starts
    startTimer(runTime);
});


document.getElementById('stop-button').addEventListener('click', () => {
    clearInterval(interval);
    document.getElementById('mode').textContent = 'Stopped';
    document.getElementById('timer').textContent = '00:00';
});

function startTimer(duration) {
    let timer = duration;
    interval = setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        document.getElementById('timer').textContent = minutes + ':' + seconds;

        if (--timer < 0) {
            isRunning = !isRunning;
            document.getElementById('mode').textContent = isRunning ? 'Running' : 'Walking';
            playSound(isRunning);
            timer = isRunning ? runTime : walkTime;
        }
    }, 1000);
}

function playSound(isRunning) {
    let sound = new Audio(isRunning ? 'run-sound.mp3' : 'walk-sound.mp3');
    sound.play();
}
