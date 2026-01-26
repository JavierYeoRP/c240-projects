/**
 * ShoreSquad - Community Beach Cleanup Platform
 * Interactive features: Map integration, Weather API, Crew management
 * Target: Young eco-conscious people (Gen Z/Millennials)
 */

// ====================================
// APP STATE
// ====================================

const appState = {
    userLocation: null,
    crew: {
        members: [],
        cleanups: 0,
        impact: 0,
        beaches: []
    },
    upcomingEvents: [],
    weatherData: null,
    map: null,
    markers: [],
    mapReady: false
};

const SAMPLE_BEACHES = [
    { name: "Surfer's Paradise Beach", lat: 28.0174, lng: -82.4241, debris: "High", lastCleanup: "2 weeks ago", priority: "high" },
    { name: "Coral Cove", lat: 28.0342, lng: -82.4301, debris: "Medium", lastCleanup: "1 month ago", priority: "medium" },
    { name: "Turtle Sanctuary Beach", lat: 28.0087, lng: -82.4156, debris: "Low", lastCleanup: "1 week ago", priority: "low" },
    { name: "Sunset Bay", lat: 28.0523, lng: -82.4432, debris: "High", lastCleanup: "3 weeks ago", priority: "high" }
];

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("ShoreSquad app initialized");
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    requestUserLocation(); // triggers map init after location
    updateCrewStats();
    loadWeatherData();
    setupMobileNav();
}

// ====================================
// LOCATION & MAP
// ====================================

function requestUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                appState.userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                console.log("User location:", appState.userLocation);
                initializeLeafletMap();
            },
            error => {
                console.warn("Geolocation failed:", error.message);
                initializeLeafletMap(); // fallback to default
            }
        );
    } else {
        console.warn("Geolocation not supported");
        initializeLeafletMap(); // fallback to default
    }
}

function initializeLeafletMap() {
    const mapElement = document.getElementById("leaflet-map");
    if (!mapElement) return;

    const defaultLocation = [27.9506, -82.4572]; // Tampa
    const userLocation = appState.userLocation
        ? [appState.userLocation.latitude, appState.userLocation.longitude]
        : defaultLocation;

    appState.map = L.map("leaflet-map").setView(userLocation, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
        minZoom: 3
    }).addTo(appState.map);

    appState.mapReady = true;

    addUserMarkerLeaflet(userLocation);
    addBeachMarkersLeaflet();
    setupMapControls();

    const zoomSlider = document.getElementById("zoom-slider");
    if (zoomSlider) {
        zoomSlider.addEventListener("input", e => {
            appState.map.setZoom(parseInt(e.target.value));
        });
    }
}

function addUserMarkerLeaflet(location) {
    if (!appState.map) return;

    const marker = L.marker(location).bindPopup("📍 You are here").addTo(appState.map);
    appState.markers.push(marker);
}

function addBeachMarkersLeaflet() {
    if (!appState.map) return;

    appState.beaches = []; // clear before adding
    SAMPLE_BEACHES.forEach(beach => {
        const marker = L.marker([beach.lat, beach.lng])
            .bindPopup(`<b>${beach.name}</b><br>Debris: ${beach.debris}<br>Last cleanup: ${beach.lastCleanup}`)
            .addTo(appState.map);

        beach.marker = marker;
        appState.beaches.push(beach);
        appState.markers.push(marker);
    });

    updateBeachesList();
    console.log("Beach markers added:", appState.beaches.length);
}

function setupMapControls() {
    const recenterBtn = document.getElementById("recenter-btn");
    const clearMarkersBtn = document.getElementById("clear-markers-btn");

    if (recenterBtn) {
        recenterBtn.addEventListener("click", () => {
            if (appState.userLocation) {
                const loc = [appState.userLocation.latitude, appState.userLocation.longitude];
                appState.map.flyTo(loc, 12);
            }
        });
    }

    if (clearMarkersBtn) {
        clearMarkersBtn.addEventListener("click", () => {
            appState.markers.forEach(m => appState.map.removeLayer(m));
            appState.markers = [];
            appState.beaches = [];
            updateBeachesList();
        });
    }
}

function updateBeachesList() {
    const beachesList = document.getElementById("beaches-list");
    if (!beachesList) return;

    beachesList.innerHTML = "";

    if (appState.beaches.length === 0) {
        beachesList.innerHTML = "<li>No beaches nearby.</li>";
        return;
    }

    appState.beaches.forEach(beach => {
        const li = document.createElement("li");
        li.textContent = `${beach.name} — Debris: ${beach.debris}`;
        li.addEventListener("click", () => {
            appState.map.flyTo([beach.lat, beach.lng], 14);
            beach.marker.openPopup();
        });
        beachesList.appendChild(li);
    });
}
