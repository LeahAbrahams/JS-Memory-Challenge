document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    checkInput();
});

function checkInput() {
    const userName = document.getElementById('userName').value;
    const userCode = document.getElementById('userCode').value;
    const key = `${userName}+${userCode}`;
    if (!localStorage.getItem(key)) {
        saveUserData();
    } else {
        alert("You are already registered. Redirecting to login...");
        window.location = "../Login/Login.html";
    }
}

function saveUserData() {
    const userName = document.getElementById('userName').value;
    const userCode = document.getElementById('userCode').value;
    const key = `${userName}+${userCode}`;
    localStorage.removeItem('currentKey');
    localStorage.setItem('currentKey', key);
    const userData = {
        user: userName,
        userID: document.getElementById('userID').value,
        userPhone: document.getElementById('userPhone').value,
        password: userCode
    };
    // :ממיר את הנתונים של המשתמש מאובייקט, לסטרינג
    localStorage.setItem(key, JSON.stringify(userData));
    alert("User data saved successfully!");
    window.location = "../Game/Game.html";
}
