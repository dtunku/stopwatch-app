document.addEventListener('DOMContentLoaded', function() {
    let timer;
    let isRunning = false;
    let centiseconds = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    const display = document.getElementById('display');
    const startStopBtn = document.getElementById('startStop');
    const resetBtn = document.getElementById('reset');
    const clearRecordsBtn = document.getElementById('clearRecords');
    const recordsBody = document.getElementById('recordsBody');

    function updateDisplay() {
        display.textContent = 
            (hours < 10 ? '0' + hours : hours) + ':' +
            (minutes < 10 ? '0' + minutes : minutes) + ':' +
            (seconds < 10 ? '0' + seconds : seconds) + ':' +
            (centiseconds < 10 ? '0' + centiseconds : centiseconds);
    }

    function startStop() {
        if (isRunning) {
            clearInterval(timer);
            startStopBtn.textContent = 'Start';
            isRunning = false;
            addRecord();
        } else {
            timer = setInterval(function() {
                centiseconds++;
                if (centiseconds === 100) {
                    centiseconds = 0;
                    seconds++;
                    if (seconds === 60) {
                        seconds = 0;
                        minutes++;
                        if (minutes === 60) {
                            minutes = 0;
                            hours++;
                        }
                    }
                }
                updateDisplay();
            }, 10);
            startStopBtn.textContent = 'Stop';
            isRunning = true;
        }
    }

    function reset() {
        clearInterval(timer);
        isRunning = false;
        centiseconds = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateDisplay();
        startStopBtn.textContent = 'Start';
    }

    function addRecord() {
        const row = recordsBody.insertRow(0);
        const timeCell = row.insertCell(0);
        const actionCell = row.insertCell(1);

        timeCell.textContent = display.textContent;
        timeCell.className = 'border px-4 py-2 text-left';
        
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '<i class="far fa-clipboard"></i>';
        copyBtn.className = 'bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded';
        copyBtn.title = 'Copy to clipboard';
        copyBtn.onclick = function() {
            navigator.clipboard.writeText(timeCell.textContent)
                .then(() => {
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="far fa-clipboard"></i>';
                    }, 1000);
                })
                .catch(err => console.error('Error copying text: ', err));
        };
                
        actionCell.appendChild(copyBtn);
        actionCell.className = 'border px-4 py-2';
    }

    function clearRecords() {
        recordsBody.innerHTML = '';
    }

    startStopBtn.addEventListener('click', startStop);
    resetBtn.addEventListener('click', reset);
    clearRecordsBtn.addEventListener('click', clearRecords);
});
