const container = document.getElementById('quiz-form');
const jsonFile = container.dataset.quizJson;

function showConfirmPopup(onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal';

    const text = document.createElement('p');
    text.textContent = 'Are you sure you want to submit your results?';

    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'Yes';
    yesBtn.className = 'modal-confirm';

    const noBtn = document.createElement('button');
    noBtn.textContent = 'No';
    noBtn.className = 'modal-cancel';

    yesBtn.onclick = () => {
        document.body.removeChild(overlay);
        onConfirm();
    };

    noBtn.onclick = () => {
        document.body.removeChild(overlay);
    };

    modal.append(text, yesBtn, noBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

function timer(timeLeft) {

    const timerEl = document.createElement('div');
    timerEl.className = 'quiz-timer';
    container.prepend(timerEl);

    const interval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerEl.textContent = `Time left: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(interval);
            alert('Time is up!');
        }
    }, 1000);

}

function collectAnswers() {
    const answers = {};

    const checked = container.querySelectorAll('input[type="radio"]:checked');
    checked.forEach(input => {
        answers[input.name] = input.value;
    });

    return answers;
}

timer(600);

fetch(jsonFile)
    .then(res => res.json())
    .then(data => {
        const questions = Object.values(data.qs);

        questions.forEach((qObj, i) => {
            const fieldset = document.createElement('fieldset');
            fieldset.classList.add('quiz-question');

            const legend = document.createElement('legend');

            const numberSpan = document.createElement('span');
            numberSpan.className = 'question-number';
            numberSpan.textContent = `${i + 1}. `;

            legend.appendChild(numberSpan);
            legend.append(qObj.q);

            legend.classList.add('quiz-question-title');
            fieldset.appendChild(legend);

            Object.entries(qObj.as).forEach(([key, answer]) => {
                const label = document.createElement('label');
                label.classList.add('quiz-option');

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `q${i + 1}`;
                input.value = key;

                label.appendChild(input);
                label.append(` ${answer}`);
                fieldset.appendChild(label);
            });

            container.appendChild(fieldset);
        });

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';
        submitBtn.type = 'button';
        submitBtn.classList.add('quiz-submit');

        submitBtn.addEventListener('click', () => {
            showConfirmPopup(() => {
                const answers = collectAnswers();
                let json_body = JSON.stringify({
                    quiz: jsonFile.replace('.json', ''),
                    answers: answers
                })
                var request = new XMLHttpRequest();
                request.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let res = JSON.parse(request.responseText);
                        window.location.href = `results.html?z=${res.uid}`;
                    }
                };
                request.open('POST', '../../scripts/submit.php', true);
                request.setRequestHeader('Content-type', 'application/json');
                request.send(json_body);
            });
        });

        container.appendChild(submitBtn);
    })
    .catch(err => console.error(err));

