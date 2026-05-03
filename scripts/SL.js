document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('submitLogin');
    const studentInput = document.getElementById('studentNumber');
    const errorMsg = document.getElementById('errorMessage');

    loginBtn.addEventListener('click', () => {
        const studentNo = studentInput.value.trim();

        if (studentNo === "" || !/^\d+$/.test(studentNo)) {
            errorMsg.textContent = "Please enter a valid student number."; // i put new code here
            errorMsg.classList.remove('hidden');
            studentInput.classList.add('border-red-500');
            return;
        }

        console.log("Logging in student:", studentNo);

        localStorage.setItem("studentNo", studentNo);

        errorMsg.classList.add('hidden');
        studentInput.classList.remove('border-red-500');

        
        window.location.href = "StudentDashboard.html";
    });

    studentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
});