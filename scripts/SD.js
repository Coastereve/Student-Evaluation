const studentNo = localStorage.getItem("studentNo");

    if (studentNo) {
        document.getElementById("studentDisplay").textContent = studentNo;
    }


    // ✅ LOGOUT
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("studentNo");
        window.location.href = "../pages/Login.html"; // adjust if needed
    });

    document.getElementById("startBtn").addEventListener("click", () => {
    window.location.href = "../pages/EvalPage.html";
});

const professorColors = [
        { bg: "gray", initials: "N/A" },
        { bg: "from-indigo-500 to-purple-600", initials: "NB" },
        { bg: "from-emerald-500 to-teal-600", initials: "AB" },
        { bg: "from-rose-500 to-pink-600", initials: "RB" },
        { bg: "from-amber-500 to-orange-600", initials: "P4" },
        { bg: "from-cyan-500 to-blue-600", initials: "P5" }
    ];
    
    const professors = [
        { name: "None", course: "None", email: "None", colorIndex: 0, evaluated: false },
        { name: "Nicky Balew", course: "IM101", email: "nickybalew@gmail.com", colorIndex: 1, evaluated: false },
        { name: "Awee Balew", course: "CS 202", email: "awee.balew@qcu.edu", colorIndex: 2, evaluated: false },
        { name: "Redenton Balew", course: "IT 305", email: "redenton@qcu.edu", colorIndex: 3, evaluated: false },
        { name: "Professor 4", course: "DS 401", email: "prof4@qcu.edu", colorIndex: 4, evaluated: false },
        { name: "Professor 5", course: "AI 501", email: "prof5@qcu.edu", colorIndex: 5, evaluated: false }
    ];