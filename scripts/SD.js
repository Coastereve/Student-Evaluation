document.addEventListener("DOMContentLoaded", () => {

    // ✅ DATE & TIME
    const dateTime = document.getElementById("dateTime");

    function updateTime() {
        const now = new Date();
        dateTime.textContent = now.toLocaleString();
    }

    setInterval(updateTime, 1000);
    updateTime();


    // ✅ LOAD STUDENT NUMBER
    const studentNo = localStorage.getItem("studentNo");

    if (studentNo) {
        document.getElementById("studentDisplay").textContent = studentNo;
    }


    // ✅ LOGOUT
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("studentNo");
        window.location.href = "../pages/Login.html"; // adjust if needed
    });


    
    const profButtons = document.querySelectorAll(".prof-btn");

    profButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            // remove active style
            profButtons.forEach(b => b.classList.remove("bg-indigo-500", "text-white"));

            // highlight selected
            btn.classList.add("bg-indigo-500", "text-white");

            console.log("Selected professor:", btn.textContent);

            // TODO: load evaluation form here
        });
    });

});