# ShoreSquad - Beach Cleanup Community Platform

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

## 🌊 Features

- 🗺️ **Interactive Google Maps Integration** - Find and locate beaches near you
- 🌤️ **Real-Time Weather** - Check conditions before planning cleanups
- 👥 **Crew Management** - Invite friends and organize team cleanups
- 📍 **Geolocation Support** - Automatically find your location
- 🎯 **Beach Cleanup Tracking** - Monitor debris levels and cleanup history
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Google Maps API Key

### Setup Google Maps API

1. **Get Your API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Maps JavaScript API
   - Create an API key (Credentials > Create Credentials > API Key)
   - Copy your API key

2. **Configure ShoreSquad**
   - Open `index.html`
   - Find this line: `<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places,marker"></script>`
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key

3. **Run Locally**
   - Use Live Server or any local server
   - VS Code: Right-click `index.html` → Open with Live Server
   - Or: `python -m http.server 8000` then visit `http://localhost:8000`

## 📁 Project Structure

```
ShoreSquad/
├── index.html          # Main HTML file with Google Maps container
├── css/
│   └── styles.css      # Ocean-themed color palette & responsive design
├── js/
│   └── app.js          # Google Maps integration & app logic
├── .env.example        # Environment variables template
└── .gitignore          # Git ignore rules
```

## 🗺️ Google Maps Features Implemented

### Beach Markers
- **Color-coded by priority**: Red (High), Orange (Medium), Green (Low)
- **Click to reveal**: Debris level, last cleanup date, plan cleanup button
- **User location**: Blue marker showing current position

### Map Controls
- **My Location Button** - Recenter map to your current location
- **Clear Markers Button** - Remove all markers from map

### Nearby Beaches List
- Dynamic list showing all beaches in map view
- Debris level badges with color coding
- Last cleanup timestamp
- Individual "Plan Cleanup" buttons for each beach

## 🎨 Color Palette

| Color | Value | Usage |
|-------|-------|-------|
| Primary Blue | `#0B7FB8` | Headers, primary actions |
| Secondary Teal | `#17B89A` | Accents, buttons |
| Accent Coral | `#FF6B6B` | Alerts, highlights |
| Light Aqua | `#E8F8F5` | Backgrounds |
| Dark Navy | `#1A3A42` | Text, footers |

## 💻 JavaScript Features

### Geolocation
```javascript
navigator.geolocation.getCurrentPosition()
// Gets user's lat/lng coordinates for map centering
```

### Sample Beach Data
```javascript
SAMPLE_BEACHES = [
  { name: 'Surfer\'s Paradise Beach', lat: 28.0174, lng: -82.4241, ... },
  { name: 'Coral Cove', lat: 28.0342, lng: -82.4301, ... },
  // ... more beaches
]
```

### Dynamic Info Windows
- Click markers to display beach information
- Inline buttons to plan cleanups
- Auto-close behavior when selecting new markers

## 📱 UX Design Principles

- **Accessibility First**: ARIA labels, semantic HTML, keyboard navigation
- **Performance**: Lazy loading, debounced events, efficient DOM updates
- **Mobile-First**: Responsive grid layouts, touch-friendly buttons
- **Visual Feedback**: Smooth animations, hover states, notifications

## 🔧 Customization

### Add More Beaches
Edit `app.js` and add entries to `SAMPLE_BEACHES`:
```javascript
{ 
    name: 'Your Beach Name', 
    lat: 28.0000, 
    lng: -82.0000, 
    debris: 'High', 
    lastCleanup: '2 weeks ago',
    priority: 'high'
}
```

### Change Map Style
Modify `getMapStyle()` function in `app.js` with custom Google Maps styling

### Update Color Palette
Edit CSS variables in `styles.css`:
```css
--primary-blue: #0B7FB8;
--secondary-teal: #17B89A;
```

## 🌐 API Integration Ready

The app is structured to easily add:
- OpenWeatherMap or Weather.gov for real-time weather
- User authentication & crew management
- Event notifications & social sharing
- Analytics tracking (Google Analytics, Mixpanel)

## 🤝 Contributing

Ideas for features:
- Cleanup history timeline
- Crew badges & leaderboards
- Photo uploads from cleanups
- Social media integration
- Offline mode with Service Workers

## 📄 License

Built for Gen Z beach cleanup advocates! 🌊♻️

---

**Questions or issues?** Check the API documentation:
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
