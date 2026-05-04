document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('contacter-name').value.trim();
  const email = document.getElementById('contacter-email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('contacter-message').value.trim();

  // Simpel validering
  if (!email || !subject || !message) {
    alert("Udfyld venligst navn, email, emne og besked.");
    return;
  }

  // Ingen backend – bare en besked
  alert("Din besked er nu sendt. Vi bestræber os efter at svare på din henvendelse inden for 1-2 arbejdsdage");

  // Nulstil formularen
  this.reset();
});
