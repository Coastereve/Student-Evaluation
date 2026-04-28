// ======================== STUDENT DATA ========================
const studentNo = localStorage.getItem("studentNo");
if (studentNo) {
    document.getElementById("studentDisplay").textContent = studentNo;
}

// LOGOUT
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("studentNo");
    window.location.href = "../pages/Login.html";
});

// ======================== DATA MODELS ========================
const professorColors = [
    { bg: "from-indigo-500 to-purple-600", initials: "NB" },
    { bg: "from-emerald-500 to-teal-600", initials: "AB" },
    { bg: "from-rose-500 to-pink-600", initials: "RB" },
    { bg: "from-amber-500 to-orange-600", initials: "P4" },
    { bg: "from-cyan-500 to-blue-600", initials: "P5" }
];

const professors = [
    { name: "Nicky Balew", course: "IM101", email: "nickybalew@gmail.com", colorIndex: 0, evaluated: false },
    { name: "Awee Balew", course: "CS 202", email: "awee.balew@qcu.edu", colorIndex: 1, evaluated: false },
    { name: "Redenton Balew", course: "IT 305", email: "redenton@qcu.edu", colorIndex: 2, evaluated: false },
    { name: "Professor 4", course: "DS 401", email: "prof4@qcu.edu", colorIndex: 3, evaluated: false },
    { name: "Professor 5", course: "AI 501", email: "prof5@qcu.edu", colorIndex: 4, evaluated: false }
];

const questions = [
    "The professor demonstrates thorough knowledge of the subject matter and explains concepts clearly.",
    "The professor uses effective teaching methods and engages students in learning.",
    "The professor is punctual, prepared, and organized for each class session.",
    "The professor treats students with respect and fairness at all times.",
    "The professor is approachable and responsive to student concerns and questions.",
    "The professor exhibits a positive and encouraging attitude toward student learning.",
    "The professor maintains a professional appearance appropriate for an academic setting."
];

let evaluationsStore = {};
let currentProfessorIndex = 0;
let currentProfessor = professors[0];
let currentPage = 0;

function getCurrentAnswers() {
    if (!evaluationsStore[currentProfessor.name]) {
        evaluationsStore[currentProfessor.name] = { answers: new Array(questions.length).fill(null) };
    }
    return evaluationsStore[currentProfessor.name].answers;
}

function setAnswer(questionIdx, rating) {
    const answers = getCurrentAnswers();
    answers[questionIdx] = rating;
    evaluationsStore[currentProfessor.name].answers = answers;
    renderCurrentPageQuestions();
    updateProgressBarColors();
    updateSubmitButtonState();
    updatePageWarnings();
}

function isPageComplete(pageNum) {
    const answers = getCurrentAnswers();
    if (pageNum === 0) return answers[0] !== null && answers[1] !== null;
    if (pageNum === 1) return answers[2] !== null && answers[3] !== null && answers[4] !== null;
    if (pageNum === 2) return answers[5] !== null && answers[6] !== null;
    if (pageNum === 3) return answers[5] !== null && answers[6] !== null;
    return false;
}

function isAllQuestionsComplete() {
    const answers = getCurrentAnswers();
    return answers.every(a => a !== null);
}

function updateSubmitButtonState() {
    const submitBtn = document.getElementById('submitEvalBtn');
    const allComplete = isAllQuestionsComplete();
    if (submitBtn) {
        if (allComplete) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('disabled:opacity-50', 'disabled:cursor-not-allowed');
            document.getElementById('submitEnableBadge').innerHTML = '<span class="text-green-600 text-xs font-semibold">All questions answered! Ready to submit.</span>';
            document.getElementById('page3Warning')?.classList.add('hidden');
        } else {
            submitBtn.disabled = true;
            const answeredCount = getCurrentAnswers().filter(a => a !== null).length;
            document.getElementById('submitEnableBadge').innerHTML = `<span class="text-orange-500 text-xs">${answeredCount}/7 answered. Answer all questions to submit.</span>`;
        }
    }
}

function updatePageWarnings() {
    const answers = getCurrentAnswers();
    const page0Complete = answers[0] !== null && answers[1] !== null;
    const page1Complete = answers[2] !== null && answers[3] !== null && answers[4] !== null;
    const page2Complete = answers[5] !== null && answers[6] !== null;
    const page3Complete = answers[7] !== null && answers[8] !== null;
    
    const p0w = document.getElementById('page0Warning');
    const p1w = document.getElementById('page1Warning');
    const p2w = document.getElementById('page2Warning');
    const p3w = document.getElementById('page3Warning');
    
    const updateWarning = (warningEl, isComplete) => {
        if (warningEl) {
            if (isComplete) {
                warningEl.classList.remove('warning-badge');
                warningEl.classList.add('bg-green-100', 'text-green-700');
            } else {
                warningEl.classList.add('warning-badge');
                warningEl.classList.remove('bg-green-100', 'text-green-700');
            }
        }
    };
    
    updateWarning(p0w, page0Complete);
    updateWarning(p1w, page1Complete);
    updateWarning(p2w, page2Complete);
    updateWarning(p3w, page3Complete);
}

function updateProgressBarColors() {
    for (let i = 0; i <= 3; i++) {
        const tab = document.getElementById(`tabPage${i}`);
        const connector = document.getElementById(`connector${i-1}`);
        if (tab) {
            tab.classList.remove('green', 'red', 'white');
            if (i === currentPage) {
                tab.classList.add('white');
            } else if (isPageComplete(i)) {
                tab.classList.add('green');
            } else {
                tab.classList.add('red');
            }
        }
        if (connector && i > 0) {
            connector.classList.remove('green', 'red', 'white');
            let allPrevComplete = true;
            for (let j = 0; j < i; j++) {
                if (!isPageComplete(j)) allPrevComplete = false;
            }
            if (allPrevComplete && currentPage >= i) {
                connector.classList.add('green');
            } else if (currentPage >= i) {
                connector.classList.add('white');
            } else {
                connector.classList.add('red');
            }
        }
    }
}

function renderCurrentPageQuestions() {
    const answers = getCurrentAnswers();
    const page0Container = document.getElementById('questionsPage0');
    const page1Container = document.getElementById('questionsPage1');
    const page2Container = document.getElementById('questionsPage2');
    const page3Container = document.getElementById('questionsPage3');
    
    if (page0Container) page0Container.innerHTML = renderQuestionsForIndices([0, 1], answers);
    if (page1Container) page1Container.innerHTML = renderQuestionsForIndices([2, 3, 4], answers);
    if (page2Container) page2Container.innerHTML = renderQuestionsForIndices([5, 6], answers);
    if (page3Container) page3Container.innerHTML = renderQuestionsForIndices([5, 6], answers);
    
    attachRatingEvents();
    updatePageWarnings();
    updateSubmitButtonState();
}

function renderQuestionsForIndices(indices, answers) {
    let html = '';
    for (let idx of indices) {
        const currentRating = answers[idx];
        let ratingHtml = '';
        for (let rate = 1; rate <= 5; rate++) {
            const isSelected = (currentRating === rate);
            const selectedClass = isSelected ? 'selected bg-indigo-600 text-white border-indigo-600' : 'bg-gray-100 text-gray-700 border-gray-200';
            ratingHtml += `
                <label class="rating-option inline-flex items-center gap-2 px-5 py-2.5 rounded-full border cursor-pointer transition ${selectedClass}" data-qidx="${idx}" data-rate="${rate}">
                    <input type="radio" name="q${idx}" value="${rate}" ${isSelected ? 'checked' : ''} class="hidden">
                    <span class="text-sm font-medium">${rate}</span>
                </label>
            `;
        }
        html += `
            <div class="question-card bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p class="text-gray-800 leading-relaxed mb-5 text-base"><span class="font-bold mr-2">${idx+1}.</span> ${escapeHtml(questions[idx])}</p>
                <div class="flex flex-wrap gap-3 items-center">
                    <span class="text-xs text-gray-400 mr-2">Poor</span>
                    ${ratingHtml}
                    <span class="text-xs text-gray-400 ml-2">Excellent</span>
                </div>
            </div>
        `;
    }
    return html;
}

function attachRatingEvents() {
    document.querySelectorAll('.rating-option').forEach(label => {
        label.removeEventListener('click', ratingClickHandler);
        label.addEventListener('click', ratingClickHandler);
    });
}

function ratingClickHandler() {
    const rate = parseInt(this.getAttribute('data-rate'));
    const qidx = parseInt(this.getAttribute('data-qidx'));
    setAnswer(qidx, rate);
    const parent = this.parentElement;
    parent.querySelectorAll('.rating-option').forEach(lbl => {
        lbl.classList.remove('selected', 'bg-indigo-600', 'text-white', 'border-indigo-600');
        lbl.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-200');
    });
    this.classList.add('selected', 'bg-indigo-600', 'text-white', 'border-indigo-600');
    showToast(`Question ${qidx+1} rated ${rate}/5`);
}

function goToPage(pageNum) {
    if (pageNum < 0 || pageNum > 3) return;
    document.querySelectorAll('[id^="page"]').forEach(page => page.classList.add('hidden'));
    document.getElementById(`page${pageNum}`).classList.remove('hidden');
    currentPage = pageNum;
    updateProgressBarColors();
    renderCurrentPageQuestions();
}

function submitAndContinue() {
    if (!isAllQuestionsComplete()) {
        showToast("Cannot submit! Please answer all 7 questions first.");
        return;
    }
    
    professors[currentProfessorIndex].evaluated = true;
    showToast(`Evaluation completed for ${currentProfessor.name}!`);
    
    let nextIndex = -1;
    for (let i = 0; i < professors.length; i++) {
        if (!professors[i].evaluated) {
            nextIndex = i;
            break;
        }
    }
    
    if (nextIndex !== -1) {
        currentProfessorIndex = nextIndex;
        currentProfessor = professors[currentProfessorIndex];
        currentPage = 0;
        
        document.getElementById('currentProfNameDisplay').innerText = currentProfessor.name;
        document.getElementById('currentCourseDisplay').innerText = `Course Code: ${currentProfessor.course}`;
        document.getElementById('currentEmailDisplay').innerText = currentProfessor.email;
        updateProfessorAvatar(currentProfessor);
        
        if (!evaluationsStore[currentProfessor.name]) {
            evaluationsStore[currentProfessor.name] = { answers: new Array(questions.length).fill(null) };
        }
        
        goToPage(0);
        renderCurrentPageQuestions();
        updateProgressBarColors();
        updateSubmitButtonState();
        renderProfessorsList();
        
        showToast(`📚 Moving to next professor: ${currentProfessor.name}`);
    } else {
        const completeMsg = document.getElementById('submitMessage');
        if (completeMsg) {
            completeMsg.innerHTML = `Congratulations! All ${professors.length} professors have been evaluated.`;
            completeMsg.classList.remove('hidden');
        }
        showToast("All professors evaluated.");
        const submitBtn = document.getElementById('submitEvalBtn');
        if (submitBtn) submitBtn.disabled = true;
    }
}

function updateProfessorAvatar(prof) {
    const avatarDiv = document.getElementById('currentProfAvatar');
    const colorData = professorColors[prof.colorIndex % professorColors.length];
    if (avatarDiv) {
        avatarDiv.className = `prof-avatar-large bg-gradient-to-br ${colorData.bg} shadow-lg mb-4`;
        avatarDiv.textContent = colorData.initials;
    }
}

function switchProfessor(prof, index) {
    if (prof.evaluated) {
        showToast(`${prof.name} has already been evaluated. Cannot re-evaluate.`);
        return;
    }
    currentProfessorIndex = index;
    currentProfessor = prof;
    currentPage = 0;
    
    document.getElementById('currentProfNameDisplay').innerText = prof.name;
    document.getElementById('currentCourseDisplay').innerText = `Course Code: ${prof.course}`;
    document.getElementById('currentEmailDisplay').innerText = prof.email;
    updateProfessorAvatar(prof);
    
    if (!evaluationsStore[currentProfessor.name]) {
        evaluationsStore[currentProfessor.name] = { answers: new Array(questions.length).fill(null) };
    }
    
    goToPage(0);
    renderCurrentPageQuestions();
    updateProgressBarColors();
    updateSubmitButtonState();
    renderProfessorsList();
    showToast(`Switched to ${prof.name}`);
}

function renderProfessorsList() {
    const container = document.getElementById('professorsListContainer');
    if (!container) return;
    container.innerHTML = '';
    
    professors.forEach((prof, idx) => {
        const colorData = professorColors[prof.colorIndex % professorColors.length];
        const isActive = currentProfessor.name === prof.name;
        const isEvaluated = prof.evaluated;
        
        const btn = document.createElement('button');
        btn.className = `w-full text-left px-3 py-2 rounded-xl mb-2 transition flex items-center gap-3 ${
            isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } ${isEvaluated ? 'opacity-60' : ''}`;
        btn.innerHTML = `
            <div class="prof-avatar-small bg-gradient-to-br ${colorData.bg} flex items-center justify-center text-white font-bold shadow-md">${colorData.initials}</div>
            <div class="flex-1 min-w-0">
                <div class="flex justify-between items-center">
                    <span class="font-semibold text-sm">${prof.name}</span>
                    <span class="text-xs ${isActive ? 'text-indigo-200' : 'text-gray-500'}">${prof.course}</span>
                </div>
                <div class="text-xs ${isActive ? 'text-indigo-200' : 'text-gray-400'} truncate">${prof.email}</div>
                ${isEvaluated ? '<span class="text-xs text-green-500 mt-1 inline-block">✓ Evaluated</span>' : ''}
            </div>
        `;
        if (!isEvaluated) {
            btn.addEventListener('click', () => switchProfessor(prof, idx));
        } else {
            btn.style.cursor = 'not-allowed';
            btn.title = 'Already evaluated';
        }
        container.appendChild(btn);
    });
}

function updateDateTime() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const header = document.getElementById('dateTimeDisplayHeader');
    if (header) header.textContent = `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
}

function showToast(msg) {
    let toast = document.getElementById('dynamicToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'dynamicToast';
        toast.className = 'fixed bottom-5 right-5 bg-gray-800 text-white px-5 py-2 rounded-full text-sm shadow-lg z-50 transition-opacity duration-300 opacity-0';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 2000);
}

function init() {
    renderProfessorsList();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    updateProfessorAvatar(currentProfessor);
    
    if (!evaluationsStore[currentProfessor.name]) {
        evaluationsStore[currentProfessor.name] = { answers: new Array(questions.length).fill(null) };
    }
    
    document.getElementById('currentProfNameDisplay').innerText = currentProfessor.name;
    document.getElementById('currentCourseDisplay').innerText = `Course Code: ${currentProfessor.course}`;
    document.getElementById('currentEmailDisplay').innerText = currentProfessor.email;
    
    renderCurrentPageQuestions();
    updateProgressBarColors();
    updateSubmitButtonState();
    
    document.getElementById('nextToPage1')?.addEventListener('click', () => goToPage(1));
    document.getElementById('prevToPage0')?.addEventListener('click', () => goToPage(0));
    document.getElementById('nextToPage2')?.addEventListener('click', () => goToPage(2));
    document.getElementById('prevToPage1')?.addEventListener('click', () => goToPage(1));
    document.getElementById('nextToPage3')?.addEventListener('click', () => goToPage(3));
    document.getElementById('prevToPage2')?.addEventListener('click', () => goToPage(2));
    document.getElementById('submitEvalBtn')?.addEventListener('click', submitAndContinue);
    
    for (let i = 0; i <= 3; i++) {
        document.getElementById(`tabPage${i}`)?.addEventListener('click', () => goToPage(i));
    }
}

init();