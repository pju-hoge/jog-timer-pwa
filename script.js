let runTime, walkTime;
let isRunning = true;
let interval;
let isTimerActive = false;

document.getElementById('start-stop-button').addEventListener('click', () => {
    if (isTimerActive) {
        stopTimer();
    } else {
        startTimer();
    }
});

function startTimer() {
    runTime = parseInt(document.getElementById('run-time').value) * 60;
    walkTime = parseInt(document.getElementById('walk-time').value) * 60;
    
    if (isNaN(runTime) || isNaN(walkTime) || runTime <= 0 || walkTime <= 0) {
        alert('Please enter valid run and walk times.');
        return;
    }

    document.getElementById('run-time').disabled = true; // Disable the input fields
    document.getElementById('walk-time').disabled = true; // Disable the input fields

    document.getElementById('mode').textContent = 'Running';
    playSound(isRunning);
    isTimerActive = true;
    document.getElementById('start-stop-button').textContent = 'Stop';
    document.getElementById('start-stop-button').style.backgroundColor = '#dc3545';

    let timer = runTime;
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

function stopTimer() {
    clearInterval(interval);
    document.getElementById('mode').textContent = 'Stopped';
    document.getElementById('timer').textContent = '00:00';
    isTimerActive = false;
    document.getElementById('start-stop-button').textContent = 'Start';
    document.getElementById('start-stop-button').style.backgroundColor = '#28a745';
    playStopSound(); // Play the stop sound when the "Stop" button is pressed
    document.getElementById('run-time').disabled = false; // Enable the input fields
    document.getElementById('walk-time').disabled = false; // Enable the input fields
}

function playStopSound() {
    let sound = new Audio('stop-sound.mp3');
    sound.play();
}


function playSound(isRunning) {
    let sound = new Audio(isRunning ? 'run-sound.mp3' : 'walk-sound.mp3');
    sound.play();
}
