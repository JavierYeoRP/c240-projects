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
    beaches: [],
    mapReady: false
};

// Sample beaches with cleanup impact
const SAMPLE_BEACHES = [
    { 
        name: 'Surfer\'s Paradise Beach', 
        lat: 28.0174, 
        lng: -82.4241, 
        debris: 'High', 
        lastCleanup: '2 weeks ago',
        priority: 'high'
    },
    { 
        name: 'Coral Cove', 
        lat: 28.0342, 
        lng: -82.4301, 
        debris: 'Medium', 
        lastCleanup: '1 month ago',
        priority: 'medium'
    },
    { 
        name: 'Turtle Sanctuary Beach', 
        lat: 28.0087, 
        lng: -82.4156, 
        debris: 'Low', 
        lastCleanup: '1 week ago',
        priority: 'low'
    },
    { 
        name: 'Sunset Bay', 
        lat: 28.0523, 
        lng: -82.4432, 
        debris: 'High', 
        lastCleanup: '3 weeks ago',
        priority: 'high'
    }
];

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('ShoreSquad app initialized');
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    requestUserLocation();
    updateCrewStats();
    loadWeatherData();
    setupMobileNav();
    // Wait for Google Maps API to load before initializing map
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGoogleMap);
    } else {
        initializeGoogleMap();
    }
}

// ====================================
// NAVIGATION & DOM INTERACTION
// ====================================

function setupEventListeners() {
    // CTA Buttons
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', handleStartCleanup);
    }
    
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', scrollToFeatures);
    }

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            closeMobileNav();
        });
    });

    // Map controls
    const recenterBtn = document.getElementById('recenter-btn');
    if (recenterBtn) {
        recenterBtn.addEventListener('click', recenterMap);
    }

    const clearMarkersBtn = document.getElementById('clear-markers-btn');
    if (clearMarkersBtn) {
        clearMarkersBtn.addEventListener('click', clearAllMarkers);
    }
}

function setupMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;

    // Handle resize to reset nav on larger screens
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
}

function toggleMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;

    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.style.display = isExpanded ? 'none' : 'flex';
    navLinks.style.position = 'absolute';
    navLinks.style.flexDirection = 'column';
    navLinks.style.top = '60px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.backgroundColor = 'rgba(26, 58, 66, 0.95)';
    navLinks.style.padding = '1rem';
}

function closeMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.style.display = 'none';
    }
}

function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ====================================
// LOCATION & GEOLOCATION
// ====================================

function requestUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                appState.userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                console.log('User location acquired:', appState.userLocation);
                updateMapWithLocation();
            },
            (error) => {
                console.warn('Geolocation error:', error.message);
                showNotification('Enable location for better beach recommendations', 'info');
            }
        );
    } else {
        console.warn('Geolocation not supported');
    }
}

// ====================================
// GOOGLE MAPS INTEGRATION
// ====================================

function initializeGoogleMap() {
    const mapElement = document.getElementById('google-map');
    if (!mapElement) {
        console.warn('Map container not found');
        return;
    }

    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || !google.maps) {
        console.warn('Google Maps API not loaded yet');
        showNotification('Maps API loading... please wait', 'info');
        setTimeout(initializeGoogleMap, 1000);
        return;
    }

    // Default location (Tampa, Florida)
    const defaultLocation = { lat: 27.9506, lng: -82.4572 };
    const userLocation = appState.userLocation ? 
        { lat: appState.userLocation.latitude, lng: appState.userLocation.longitude } :
        defaultLocation;

    // Create map
    appState.map = new google.maps.Map(mapElement, {
        zoom: 12,
        center: userLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: getMapStyle()
    });

    appState.mapReady = true;
    console.log('Google Map initialized at', userLocation);

    // Add user location marker
    addUserMarker(userLocation);

    // Load sample beaches
    addBeachMarkers();

    // Listen for map clicks
    appState.map.addListener('click', handleMapClick);
}

function addUserMarker(location) {
    if (!appState.map) return;

    const userMarker = new google.maps.Marker({
        position: location,
        map: appState.map,
        title: 'Your Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    const userInfoWindow = new google.maps.InfoWindow({
        content: '<div><strong>📍 You are here</strong><p>Your current location</p></div>'
    });

    userMarker.addListener('click', () => {
        userInfoWindow.open(appState.map, userMarker);
    });

    appState.markers.push(userMarker);
}

function addBeachMarkers() {
    if (!appState.map) return;

    SAMPLE_BEACHES.forEach((beach) => {
        const markerColor = getMarkerColor(beach.priority);
        
        const marker = new google.maps.Marker({
            position: { lat: beach.lat, lng: beach.lng },
            map: appState.map,
            title: beach.name,
            icon: markerColor
        });

        const infoWindowContent = `
            <div style="font-family: Arial; width: 200px;">
                <h3 style="margin: 0 0 0.5rem 0; color: #0B7FB8;">${beach.name}</h3>
                <p style="margin: 0.25rem 0;"><strong>Debris Level:</strong> ${beach.debris}</p>
                <p style="margin: 0.25rem 0;"><strong>Last Cleanup:</strong> ${beach.lastCleanup}</p>
                <button onclick="selectBeachForCleanup('${beach.name}')" 
                        style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: #17B89A; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Plan Cleanup
                </button>
            </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });

        marker.addListener('click', () => {
            closeAllInfoWindows();
            infoWindow.open(appState.map, marker);
        });

        beach.marker = marker;
        beach.infoWindow = infoWindow;
        appState.beaches.push(beach);
        appState.markers.push(marker);
    });

    updateBeachesList();
    console.log('Beach markers added:', SAMPLE_BEACHES.length);
}

function getMarkerColor(priority) {
    const colors = {
        'high': 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        'medium': 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
        'low': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    };
    return colors[priority] || colors.medium;
}

function getMapStyle() {
    return [
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#a2daf6' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f3f3f3' }]
        },
        {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [{ color: '#e8f8f5' }]
        }
    ];
}

function recenterMap() {
    if (!appState.map || !appState.userLocation) return;

    const userLocation = {
        lat: appState.userLocation.latitude,
        lng: appState.userLocation.longitude
    };

    appState.map.setCenter(userLocation);
    appState.map.setZoom(12);
    showNotification('Map recentered to your location', 'success');
}

function clearAllMarkers() {
    appState.markers.forEach(marker => marker.setMap(null));
    appState.markers = [];
    appState.beaches = [];
    updateBeachesList();
    showNotification('All markers cleared', 'info');
}

function closeAllInfoWindows() {
    appState.beaches.forEach(beach => {
        if (beach.infoWindow) {
            beach.infoWindow.close();
        }
    });
}

function handleMapClick(event) {
    console.log('Map clicked at:', event.latLng.lat(), event.latLng.lng());
    // Placeholder for future beach suggestion logic
}

function updateMapWithLocation() {
    if (!appState.userLocation || !appState.mapReady) return;
    
    console.log('Map updated with location:', appState.userLocation);
    recenterMap();
}

function updateBeachesList() {
    const beachesList = document.getElementById('beaches-list');
    if (!beachesList) return;

    if (appState.beaches.length === 0) {
        beachesList.innerHTML = '<li>No beaches in view</li>';
        return;
    }

    beachesList.innerHTML = appState.beaches.map(beach => `
        <li class="beach-item" data-beach="${beach.name}">
            <strong>${beach.name}</strong>
            <div class="beach-info">
                <span class="debris-badge ${beach.priority}">${beach.debris}</span>
                <span class="cleanup-time">${beach.lastCleanup}</span>
            </div>
            <button onclick="selectBeachForCleanup('${beach.name}')" class="beach-btn">Plan Cleanup</button>
        </li>
    `).join('');
}

function selectBeachForCleanup(beachName) {
    const beach = appState.beaches.find(b => b.name === beachName);
    if (beach) {
        handleStartCleanup(beachName);
        if (beach.infoWindow) beach.infoWindow.close();
    }
}

// ====================================
// WEATHER DATA
// ====================================

function loadWeatherData() {
    // Placeholder for weather API integration
    // Future: Connect to OpenWeatherMap, Weather.gov, or similar
    
    const mockWeatherData = {
        temperature: 72,
        condition: 'Partly Cloudy',
        windSpeed: 8,
        humidity: 65,
        uvIndex: 5,
        forecast: [
            { day: 'Tomorrow', condition: 'Sunny', temp: 75 },
            { day: 'Thursday', condition: 'Rainy', temp: 68 },
            { day: 'Friday', condition: 'Sunny', temp: 78 }
        ]
    };

    appState.weatherData = mockWeatherData;
    console.log('Weather data loaded:', mockWeatherData);
}

function getWeatherIcon(condition) {
    const iconMap = {
        'Sunny': '☀️',
        'Cloudy': '☁️',
        'Rainy': '🌧️',
        'Partly Cloudy': '⛅',
        'Windy': '💨'
    };
    return iconMap[condition] || '🌤️';
}

// ====================================
// CREW MANAGEMENT
// ====================================

function handleStartCleanup(beachName = null) {
    const eventName = beachName || prompt('Name your cleanup event:');
    if (!eventName) return;

    const newEvent = {
        id: Date.now(),
        name: eventName,
        beach: beachName || 'TBD',
        date: new Date().toISOString(),
        members: 1,
        impact: 0,
        status: 'planning'
    };

    appState.upcomingEvents.push(newEvent);
    appState.crew.cleanups++;
    
    if (beachName && !appState.crew.beaches.includes(beachName)) {
        appState.crew.beaches.push(beachName);
    }
    
    updateCrewStats();
    showNotification(`🎉 "${eventName}" cleanup planned! Invite your crew!`, 'success');
    
    console.log('New cleanup event:', newEvent);
}

function updateCrewStats() {
    const statCards = document.querySelectorAll('.stat-card');
    const stats = [
        appState.crew.cleanups,
        `${appState.crew.impact} lbs`,
        appState.crew.members,
        appState.crew.beaches.length
    ];

    statCards.forEach((card, index) => {
        const statNum = card.querySelector('.stat-number');
        if (statNum) {
            statNum.textContent = stats[index] || '0';
        }
    });
}

// ====================================
// NOTIFICATIONS
// ====================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function getNotificationColor(type) {
    const colors = {
        'success': '#27AE60',
        'error': '#E74C3C',
        'warning': '#F39C12',
        'info': '#0B7FB8'
    };
    return colors[type] || colors.info;
}

// ====================================
// PERFORMANCE OPTIMIZATION
// ====================================

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Debounce utility for resize/scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ====================================
// OFFLINE SUPPORT (Service Worker ready)
// ====================================

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('SW registration failed:', err));
    }
}

// ====================================
// ANALYTICS & TRACKING
// ====================================

function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    
    // Future: Connect to analytics service
    // Examples: Google Analytics, Mixpanel, Segment
    // window.gtag?.('event', eventName, eventData);
}

// Track page views
window.addEventListener('load', () => {
    trackEvent('page_view', { path: window.location.pathname });
});

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('button_click', { text: btn.textContent });
    });
});

// ====================================
// KEYBOARD SHORTCUTS (Accessibility)
// ====================================

document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + / for help
    if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        showNotification('Keyboard: Tab to navigate, Enter to activate, Esc to close', 'info');
    }
});

// ====================================
// EXPORT STATE (For debugging)
// ====================================

window.getAppState = () => appState;
