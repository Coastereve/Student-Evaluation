document.addEventListener('DOMContentLoaded', () => {
    const studentBtn = document.getElementById('studentBtn');
    const adminBtn = document.getElementById('adminBtn');

    if (studentBtn) {
        studentBtn.addEventListener('click', () => {
            window.location.href = "StudentLogin.html";
        });
    }

    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            console.log("Admin login clicked");
        });
    }
});