    document.getElementById('newsletterForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('subscriber-name').value.trim();
      const email = document.getElementById('subscriber-email').value.trim();
      const consent = document.getElementById('consent').checked;

      // Simpel validering
      if (!name || !email || !consent) {
        alert("Udfyld venligst navn, email og accepter samtykke.");
        return;
      }

      // Ingen backend – bare en besked
      alert("Tak for din tilmelding!");

      // Nulstil formularen
      this.reset();
    });
