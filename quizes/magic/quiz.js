fetch('quiz.json')
    .then(res => res.json())
    .then(data => {
        const form = document.getElementById('quiz-form');
        const questions = Object.values(data.qs);

        questions.forEach((qObj, i) => {
            const fieldset = document.createElement('fieldset');

            const legend = document.createElement('legend');
            legend.textContent = qObj.q;
            fieldset.appendChild(legend);

            Object.entries(qObj.as).forEach(([key, answer]) => {
                const label = document.createElement('label');
                const input = document.createElement('input');

                input.type = 'radio';
                input.name = `q${i}`;
                input.value = key;

                label.appendChild(input);
                label.append(` ${answer}`);

                fieldset.appendChild(label);
                fieldset.appendChild(document.createElement('br'));
            });

            form.appendChild(fieldset);
        });
    })
    .catch(err => console.error(err));
