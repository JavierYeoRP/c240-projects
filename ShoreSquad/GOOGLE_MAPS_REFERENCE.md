## 🗺️ Google Maps Integration - Quick Reference

### Getting Started

1. **Get Your API Key**
   - Visit: https://console.cloud.google.com/
   - Enable "Maps JavaScript API"
   - Enable "Places API" (for future enhancements)
   - Create API Key in Credentials

2. **Add API Key to index.html**
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,marker"></script>
   ```

### Key Functions

#### `initializeGoogleMap()`
- Initializes the map when page loads
- Centers on user location or default (Tampa, FL)
- Applies custom styling
- Calls `addUserMarker()` and `addBeachMarkers()`

#### `addBeachMarkers()`
- Adds color-coded markers for all beaches
- Red = High priority, Orange = Medium, Green = Low
- Creates info windows with beach details
- Populates the nearby beaches list

#### `getMarkerColor(priority)`
- Returns Google Maps icon URL based on priority level
- Used for visual distinction on the map

#### `recenterMap()`
- Centers map on user's current location
- Sets zoom to 12
- Called by "My Location" button

#### `clearAllMarkers()`
- Removes all markers from the map
- Clears beaches array
- Updates the beaches list display

#### `updateBeachesList()`
- Renders the nearby beaches list UI
- Shows debris level, cleanup time, plan button
- Updates when markers change

#### `selectBeachForCleanup(beachName)`
- Initiates a cleanup event for selected beach
- Closes the info window
- Updates crew stats

### Custom Styling

Map features styled with CSS color palette:
```css
.google-map {
    height: 500px;
    box-shadow: 0 8px 24px rgba(11, 127, 184, 0.15);
}

.map-btn {
    background: #FFFFFF;
    color: #0B7FB8;
    border: 2px solid #0B7FB8;
}
```

### Data Structure

```javascript
// Sample beach object
{
    name: 'Surfer\'s Paradise Beach',
    lat: 28.0174,
    lng: -82.4241,
    debris: 'High',
    lastCleanup: '2 weeks ago',
    priority: 'high',
    marker: <google.maps.Marker>,      // Added after map init
    infoWindow: <google.maps.InfoWindow> // Added after map init
}
```

### Adding New Beaches

Add to `SAMPLE_BEACHES` in `app.js`:
```javascript
{ 
    name: 'Your Beach Name', 
    lat: 28.0000,      // Latitude
    lng: -82.0000,     // Longitude (negative for West)
    debris: 'High',    // 'High', 'Medium', or 'Low'
    lastCleanup: '2 weeks ago',
    priority: 'high'   // 'high', 'medium', or 'low'
}
```

### API Libraries Included

- **places** - For future Place Search functionality
- **marker** - Enhanced marker styling

### Geolocation Integration

User location is automatically requested:
```javascript
navigator.geolocation.getCurrentPosition(
    (position) => {
        appState.userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
        };
        updateMapWithLocation();
    }
)
```

### Responsive Design

- Desktop: 500px height map
- Tablet (768px): 400px height
- Mobile: Full-width controls stacked horizontally

### Accessibility Features

- ARIA labels on all buttons
- Semantic HTML (role="region")
- Keyboard navigation support
- Screen reader friendly info windows

### Common Customizations

**Change Default Center:**
```javascript
const defaultLocation = { lat: 27.9506, lng: -82.4572 };
// Update these coordinates
```

**Change Initial Zoom:**
```javascript
appState.map = new google.maps.Map(mapElement, {
    zoom: 12,  // Change this (1-20)
});
```

**Modify Marker Info Window:**
Edit the `infoWindowContent` template in `addBeachMarkers()`

**Custom Map Styling:**
Modify `getMapStyle()` function to add/change:
- Water color
- Road color  
- Landscape color

### Troubleshooting

**Map not showing?**
- Check API key is valid and enabled
- Verify CORS settings if getting 403 error
- Check browser console for errors

**Markers not appearing?**
- Ensure SAMPLE_BEACHES has valid lat/lng
- Check that map is ready before adding markers
- Verify marker URLs are accessible

**Geolocation not working?**
- User must grant permission in browser
- Check browser console for permission errors
- Falls back to default location (Tampa) if denied

### Performance Tips

- Markers are reusable - no need to recreate
- Info windows are lazy-created on first click
- Debounce resize events for map responsiveness
- Use clustering for large marker sets (future enhancement)

### Next Steps

Future enhancements to consider:
- [ ] Weather API integration for real-time conditions
- [ ] User authentication and crew management
- [ ] Photo gallery from cleanups
- [ ] Heatmap showing most impacted beaches
- [ ] Directions API for route planning
- [ ] Marker clustering for many beaches
