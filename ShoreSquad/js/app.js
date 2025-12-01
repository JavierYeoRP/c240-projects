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
    weatherData: null
};

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
    initializeMap();
    setupMobileNav();
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
// MAP INTEGRATION
// ====================================

function initializeMap() {
    const mapPlaceholder = document.getElementById('map-placeholder');
    if (!mapPlaceholder) return;

    // Future: Replace with actual map library (Leaflet, Mapbox, Google Maps)
    // For now, show placeholder with instructions
    mapPlaceholder.innerHTML = `
        <div style="text-align: center;">
            <h3 style="margin-bottom: 1rem;">🗺️ Interactive Beach Map</h3>
            <p>Integration ready for:</p>
            <ul style="list-style: none; padding: 1rem; text-align: left; display: inline-block;">
                <li>✓ Leaflet.js (Open source)</li>
                <li>✓ Mapbox GL (Premium features)</li>
                <li>✓ Google Maps API</li>
            </ul>
            <p style="margin-top: 1rem; font-size: 12px; color: #8B8B8B;">
                Location: ${appState.userLocation ? 
                    `${appState.userLocation.latitude.toFixed(2)}, ${appState.userLocation.longitude.toFixed(2)}` : 
                    'Searching...'}
            </p>
        </div>
    `;
}

function updateMapWithLocation() {
    if (!appState.userLocation) return;
    
    const mapPlaceholder = document.getElementById('map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.style.animation = 'pulse 0.5s ease';
        console.log('Map updated with location');
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

function handleStartCleanup() {
    const eventName = prompt('Name your cleanup event:');
    if (!eventName) return;

    const newEvent = {
        id: Date.now(),
        name: eventName,
        date: new Date().toISOString(),
        members: 1,
        impact: 0,
        status: 'planning'
    };

    appState.upcomingEvents.push(newEvent);
    appState.crew.cleanups++;
    
    updateCrewStats();
    showNotification(`🎉 "${eventName}" created! Invite your crew!`, 'success');
    
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
