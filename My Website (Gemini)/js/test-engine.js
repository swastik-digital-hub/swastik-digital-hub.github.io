function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let activeQuestions = [];
let userSelections = {};
let questionStates = {}; 
let currentIdx = 0;
let timerInterval = null;

function startExam(questionsPool, totalQuestionsToPick, timeInMinutes) {
    activeQuestions = shuffleArray(questionsPool).slice(0, totalQuestionsToPick);
    
    activeQuestions.forEach((_, idx) => {
        questionStates[idx] = 'not-visited';
    });
    
    startTimer(timeInMinutes * 60);
    renderPalette();
    loadQuestion(0);
}

function startTimer(secondsLeft) {
    const timerElem = document.getElementById('countdownTimer');
    timerInterval = setInterval(() => {
        const hrs = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
        const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
        const secs = String(secondsLeft % 60).padStart(2, '0');
        if (timerElem) timerElem.textContent = `${hrs}:${mins}:${secs}`;
        
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time is up! Submitting your test automatically.");
            submitTest();
        }
        secondsLeft--;
    }, 1000);
}

function loadQuestion(idx) {
    currentIdx = idx;
    if (questionStates[idx] === 'not-visited') {
        questionStates[idx] = 'not-answered';
    }
    
    const q = activeQuestions[idx];
    document.getElementById('qNumber').textContent = `Question ${idx + 1}`;
    document.getElementById('qContent').textContent = q.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((optText, oIdx) => {
        const isSelected = userSelections[idx] === oIdx ? 'selected' : '';
        optionsContainer.innerHTML += `
            <li class="option-item ${isSelected}" onclick="selectOption(${oIdx})">
                <input type="radio" name="opt" ${isSelected ? 'checked' : ''}>
                <span>${optText}</span>
            </li>
        `;
    });
    
    renderPalette();
}

function selectOption(optIdx) {
    userSelections[currentIdx] = optIdx;
    loadQuestion(currentIdx);
}

function clearResponse() {
    delete userSelections[currentIdx];
    questionStates[currentIdx] = 'not-answered';
    loadQuestion(currentIdx);
}

function saveAndNext() {
    if (userSelections[currentIdx] !== undefined) {
        questionStates[currentIdx] = 'answered';
    } else {
        questionStates[currentIdx] = 'not-answered';
    }
    renderPalette();
    if (currentIdx < activeQuestions.length - 1) loadQuestion(currentIdx + 1);
}

function markForReviewAndNext() {
    if (userSelections[currentIdx] !== undefined) {
        questionStates[currentIdx] = 'ans-marked-review';
    } else {
        questionStates[currentIdx] = 'marked-review';
    }
    renderPalette();
    if (currentIdx < activeQuestions.length - 1) loadQuestion(currentIdx + 1);
}

function renderPalette() {
    const palette = document.getElementById('paletteGrid');
    if (!palette) return;
    palette.innerHTML = '';
    
    activeQuestions.forEach((_, idx) => {
        const stateClass = questionStates[idx] || 'not-visited';
        const isActive = idx === currentIdx ? 'active' : '';
        palette.innerHTML += `
            <button class="palette-btn ${stateClass} ${isActive}" onclick="loadQuestion(${idx})">
                ${idx + 1}
            </button>
        `;
    });
}

function submitTest() {
    clearInterval(timerInterval);
    let score = 0, correct = 0, incorrect = 0, unattempted = 0;
    
    activeQuestions.forEach((q, idx) => {
        const chosen = userSelections[idx];
        if (chosen === undefined) {
            unattempted++;
        } else if (chosen === q.answer) {
            score += 4;
            correct++;
        } else {
            score -= 1;
            incorrect++;
        }
    });

    const maxMarks = activeQuestions.length * 4;
    alert(`--- TEST COMPLETED ---\nTotal Score: ${score} / ${maxMarks}\nCorrect: ${correct}\nIncorrect: ${incorrect}\nUnattempted: ${unattempted}`);
    window.location.href = "mains-hub.html";
}