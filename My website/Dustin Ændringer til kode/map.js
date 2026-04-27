document.addEventListener("DOMContentLoaded", function () {
  const mapElement = document.getElementById("map");
  if (!mapElement || typeof L === "undefined") return;

  // Fjern tidligere Leaflet-instans hvis den findes
  if (mapElement._leaflet_id) {
    mapElement._leaflet_id = null;
  }

  // ✅ Placering der matcher OpenStreetMap-teksten "Flyvestation Værløse"
  const flyvestationVaerlose = [55.7791, 12.3562];

  const map = L.map(mapElement, {
    center: flyvestationVaerlose,
    zoom: 14,
    zoomControl: true
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  L.marker(flyvestationVaerlose)
    .addTo(map)
    .bindPopup("<strong>Tre Døgn Festival</strong><br>Flyvestation Værløse");
});
