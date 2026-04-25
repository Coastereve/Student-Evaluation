document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('submitLogin');
    const studentInput = document.getElementById('studentNumber');
    const errorMsg = document.getElementById('errorMessage');

    loginBtn.addEventListener('click', () => {
        const studentNo = studentInput.value.trim();

        if (studentNo === "") {
            // Show error if empty
            errorMsg.classList.remove('hidden');
            studentInput.classList.add('border-red-500');
        } else {
            // For now, just alert the number. Later, connect to your dashboard.
            console.log("Logging in student:", studentNo);
            errorMsg.classList.add('hidden');
            studentInput.classList.remove('border-red-500');
            
            // Example: window.location.href = "StudentDashboard.html";
            alert("Login successful for: " + studentNo);
        }
    });

    // Optional: Allow pressing "Enter" key to login
    studentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
});