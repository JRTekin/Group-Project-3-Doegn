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


