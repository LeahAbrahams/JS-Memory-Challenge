document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  CheckUserExist();
});

function CheckUserExist() {
  const userName = document.getElementById('userName').value;
  const userCode = document.getElementById('userCode').value;
  const key = `${userName}+${userCode}`;

  //:המרת הסטרינג חזרה לאובייקט
  if (JSON.parse(localStorage.getItem(key))) {
    localStorage.removeItem('currentKey');
    localStorage.setItem('currentKey', key);
    alert("Login successful!");
    window.location = "../Game/Game.html";
  } else {
    alert("You aren't yet registered. Redirecting to sign up...");
    window.location = "../SignUp/SignUp.html";
  }
}


const inputFields = document.querySelectorAll('input');
document.addEventListener('mousemove', focusInput);
function focusInput() {
  for (let input of inputFields) {
    if (input.value.trim() == "") {
      input.focus();
      return;
    }
  }
  // אם אין קלטים ריקים, מכניס את העכבר לקלט האחרון
  if (inputFields.length > 0) {
    inputFields[inputFields.length - 1].focus();
  }
}