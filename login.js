// SLIDER START
const container = document.getElementById('login-container')
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login')

registerBtn.addEventListener('click', () =>{
  container.classList.add("active");
});

loginBtn.addEventListener('click', () =>{
  container.classList.remove("active");
});

// SLIDER END

// Sørger for at kodeord og bekræft kodeord er ens og over 8 tegn
function validateSignupForm() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Kodeordene matcher ikke');
    return false;
  }

  if (password.length < 8) {
    alert('Kodeordet skal være mindst 8 tegn');
    return false;
  }

  return true;
}


//Toggle password - show password
function myFunction() {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  if (password.type === "password") {
    password.type = "text";
    confirmPassword.type = "text";
  } else {
    password.type = "password";
    confirmPassword.type = "password";
  }
}

  //Henter elementet med id="password". Hvis typen af password-konstanten er "password", så ændrer den typen til tekst (gør synlig),
  //...hvis ikke, så forbliver type="password", og tegnene er prikker 