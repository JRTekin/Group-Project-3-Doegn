/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").classList.add("open"); /*tilføjer klassen "open" til sidebar, som har CSS-regler for at åbne den*/
  document.getElementById("main").style.marginLeft = "250px"; /*flytter hovedindholdet til højre, så det ikke overlapper med den åbne sidebar*/
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").classList.remove("open");
  document.getElementById("main").style.marginLeft = "0";
}


document.addEventListener("DOMContentLoaded", () => {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  // Skip countdown logic on pages that do not have countdown markup.
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    return;
  }

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const nowDate = new Date();
  const yyyy = nowDate.getFullYear();
  const nextYear = yyyy + 1;
  let eventDate = new Date(yyyy, 7, 17); // July 17

  if (nowDate > eventDate) {
    eventDate = new Date(nextYear, 7, 19); // July 19
  }

  const countDown = eventDate.getTime();
  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDown - now;

    daysEl.innerText = Math.floor(distance / day);
    hoursEl.innerText = Math.floor((distance % day) / hour);
    minutesEl.innerText = Math.floor((distance % hour) / minute);
    secondsEl.innerText = Math.floor((distance % minute) / second);

    if (distance < 0) {
      const countdownTitle = document.getElementById("nedtælling");
      const countdownBox = document.getElementById("countdown");
      const content = document.getElementById("content");

      if (countdownTitle) {
        countdownTitle.innerText = "Tre Døgn er startet!";
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

/* START Program.html JavaScript */

/*program tabs buttons*/
document.addEventListener("DOMContentLoaded", () => { /*Når hele HTML-dokumentet er indlæst og klar, udføres følgende funktion */
  const tabs = document.querySelectorAll(".day-tab"); /* Vælger alle elementer med klassen "day-tab" og gemmer dem i variablen "tabs" */
  const panels = document.querySelectorAll(".day-panel"); /* Vælger alle elementer med klassen "day-panel" og gemmer dem i variablen "panels" */

  if (!tabs.length || !panels.length) {
    return;
  }

  tabs.forEach((tab) => { /* Går igennem hver "tab" i "tabs" og tilføjer en click-event listener til hver af dem */
    tab.addEventListener("click", () => { /* Når en "tab" bliver klikket, udføres følgende funktion */
      const target = tab.dataset.day; /* Henter værdien af "data-day" attributten fra den klikkede "tab" og gemmer den i variablen "target" */
      const targetPanel = document.getElementById(target); /* Vælger det element, der har et id, der matcher værdien i "target" og gemmer det i variablen "targetPanel" */

      if (!targetPanel) { 
        return; /* Hvis der ikke findes et element med det id, der matcher "target", afsluttes funktionen uden at gøre noget */
      }

      tabs.forEach((t) => t.classList.remove("active")); /*Går igennem hver "tab" i "tabs" og fjerner klassen "active" fra dem alle, så ingen "tab" er markeret som aktiv*/
      panels.forEach((p) => p.classList.remove("active")); /*Går igennem hver "panel" i "panels" og fjerner klassen "active" fra dem alle, så ingen "panel" er vist*/

      tab.classList.add("active"); /*Tilføjer klassen "active" til den klikkede "tab", så den bliver markeret som aktiv*/
      targetPanel.classList.add("active"); /*Tilføjer klassen "active" til det "panel", der matcher den klikkede "tab"s "data-day" værdi, så det bliver vist*/
    });
  });
});
/* End programs tabs buttons*/
