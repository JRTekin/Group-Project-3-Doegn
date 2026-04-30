document.addEventListener("DOMContentLoaded", function () {
    const mapElement = document.getElementById("map");
    if (!mapElement || typeof L === "undefined") return;

    // Koordinater
    const flyvestationVaerlose = [55.76863, 12.32589];

    const map = L.map(mapElement).setView(flyvestationVaerlose, 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    L.marker(flyvestationVaerlose)
        .addTo(map)
        .bindPopup("<strong>Tre Døgn Festival</strong><br>Flyvestation Værløse")
        .openPopup();
});
``