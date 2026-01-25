const params = new URLSearchParams(window.location.search);
const attemptId = params.get('attempt');

if (!attemptId) {
    document.getElementById('results-container').textContent =
        'No attempt specified.';
    throw new Error('Missing attempt id');
}

fetch(`/scripts/results.php?attempt=${attemptId}`)
    .then(res => res.json())
    .then(data => {
        renderResults(data);
    });

function renderResults(data) {
    const container = document.getElementById('results-container');

    const summary = document.createElement('p');
    summary.textContent = `Score: ${data.score} / ${data.total}`;
    container.appendChild(summary);

    data.questions.forEach((q, i) => {
        const block = document.createElement('div');
        block.className = 'result-question';

        const title = document.createElement('h3');
        title.textContent = `${i + 1}. ${q.question}`;
        block.appendChild(title);

        Object.entries(q.answers).forEach(([key, text]) => {
            const p = document.createElement('p');
            p.textContent = text;

            if (key === q.correct) p.classList.add('correct');
            if (key === q.user && key !== q.correct) p.classList.add('wrong');

            block.appendChild(p);
        });

        container.appendChild(block);
    });
}
