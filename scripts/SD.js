const studentNo = localStorage.getItem("studentNo");

if (studentNo) {
    document.getElementById("studentDisplay").textContent = studentNo;
}

// LOGOUT
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("studentNo");
    window.location.href = "../pages/Login.html";
});

// START BUTTON
document.getElementById("startBtn").addEventListener("click", () => {
    window.location.href = "../pages/EvalPage.html";
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
    { name: "Nicky Balew", course: "IM101", email: "nickybalew@gmail.com", colorIndex: 0 },
    { name: "Awee Balew", course: "CS 202", email: "awee.balew@qcu.edu", colorIndex: 1 },
    { name: "Redenton Balew", course: "IT 305", email: "redenton@qcu.edu", colorIndex: 2 },
    { name: "Professor 4", course: "DS 401", email: "prof4@qcu.edu", colorIndex: 3 },
    { name: "Professor 5", course: "AI 501", email: "prof5@qcu.edu", colorIndex: 4 }
];


// PROFESSOR LIST (DISPLAY ONLY)
function renderProfessorsList() {
    const container = document.getElementById('professorsListContainer');
    if (!container) return;
    container.innerHTML = '';
    
    professors.forEach((prof) => {
        const colorData = professorColors[prof.colorIndex % professorColors.length];
        
        const div = document.createElement('div');
        div.className = `w-full text-left px-3 py-2 rounded-xl mb-2 flex items-center gap-3 bg-gray-100 text-gray-700`;
        div.innerHTML = `
            <div class="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br ${colorData.bg} flex items-center justify-center text-white font-bold shadow-sm text-xs">${colorData.initials}</div>
            <div class="flex-1 min-w-0">
                <div class="flex justify-between items-center">
                    <span class="font-semibold text-sm">${prof.name}</span>
                    <span class="text-xs text-gray-500">${prof.course}</span>
                </div>
                <div class="text-xs text-gray-400 truncate">${prof.email}</div>
            </div>
        `;
        container.appendChild(div);
    });
}

// DATE AND TIME
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

renderProfessorsList();
updateDateTime();
setInterval(updateDateTime, 1000);