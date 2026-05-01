/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").classList.add("open"); /*tilføjer klassen "open" til sidebar, som har CSS-regler for at åbne den*/
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").classList.remove("open");
}


/* START countdown*/
document.addEventListener("DOMContentLoaded", () => { /*Venter på hele HTML siden er loaded*/
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds"); /*Finder HTML id'erne*/

  // Skip countdown logic on pages that do not have countdown markup.
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) { /*Hvis siden ikke har disse elementer, stopper scriptet*/
    return;
  }

  const second = 1000; /*definerer tidsenheder til milisekunder*/
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const nowDate = new Date();
  const yyyy = nowDate.getFullYear();
  const nextYear = yyyy + 1;
  let eventDate = new Date(yyyy, 6, 17); // July 17 - 6 because january is 0 - den finder ud af hvilken dato den skal tælle ned til*/

  const countDown = eventDate.getTime();
  const x = setInterval(function () { // Starter nedtællingen med setInterval, koden kører hvert sekund
    const now = new Date().getTime(); // Henter tiden nu
    const distance = countDown - now; //tager eventdatoen og minusser med tiden nu

    daysEl.innerText = Math.floor(distance / day); //dage udregnes
    hoursEl.innerText = Math.floor((distance % day) / hour); //timer udrenges
    minutesEl.innerText = Math.floor((distance % hour) / minute);
    secondsEl.innerText = Math.floor((distance % minute) / second);

    if (distance < 0) { //når nedtællingen er slut
      const countdownTitle = document.getElementById("nedtælling"); //Henter værdien for #nedtælling
      const countdownBox = document.getElementById("countdown");
      const content = document.getElementById("content");

      if (countdownTitle) {
        countdownTitle.innerText = "Tre Døgn er startet!"; //ændrer titlen
      }
      if (countdownBox) {
        countdownBox.style.display = "none";
      }
      if (content) {
        content.style.display = "block";
      }
      clearInterval(x);
    }
  }, 1000);
});