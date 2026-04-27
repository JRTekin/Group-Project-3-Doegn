/* ===============================
   SIDEBAR
=============================== */
function openNav() {
  const sidebar = document.getElementById("mySidebar");
  const main = document.getElementById("main");

  if (!sidebar || !main) return;

  sidebar.classList.add("open");
  main.style.marginLeft = "250px";
}

function closeNav() {
  const sidebar = document.getElementById("mySidebar");
  const main = document.getElementById("main");

  if (!sidebar || !main) return;

  sidebar.classList.remove("open");
  main.style.marginLeft = "0";
}

/* ===============================
   COUNTDOWN (Forside)
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  // Stop hvis countdown ikke findes
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const nowDate = new Date();
  const yyyy = nowDate.getFullYear();
  const nextYear = yyyy + 1;
  let eventDate = new Date(yyyy, 7, 17);

  if (nowDate > eventDate) {
    eventDate = new Date(nextYear, 7, 19);
  }

  const countDown = eventDate.getTime();

  const x = setInterval(() => {
    const now = Date.now();
    const distance = countDown - now;

    daysEl.innerText = Math.floor(distance / day);
    hoursEl.innerText = Math.floor((distance % day) / hour);
    minutesEl.innerText = Math.floor((distance % hour) / minute);
    secondsEl.innerText = Math.floor((distance % minute) / second);

    if (distance < 0) {
      clearInterval(x);

      const title = document.getElementById("nedtælling");
      const box = document.getElementById("countdown");
      const content = document.getElementById("content");

      if (title) title.innerText = "Tre Døgn er startet!";
      if (box) box.style.display = "none";
      if (content) content.style.display = "block";
    }
  }, 1000);
});

/* ===============================
   PROGRAM-FANER
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".day-tab");
  const panels = document.querySelectorAll(".day-panel");

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.day;
      const targetPanel = document.getElementById(target);

      if (!targetPanel) return;

      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      targetPanel.classList.add("active");
    });
  });
});

/* ===============================
   LOGIN MODAL (Sikker)
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  const showLoginBtn = document.getElementById("show-login");
  const popup = document.querySelector(".popup");
  const closeBtn = document.querySelector(".popup .close-btn");

  if (!showLoginBtn || !popup || !closeBtn) return;

  showLoginBtn.addEventListener("click", () => {
    popup.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });
});

