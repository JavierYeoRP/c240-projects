# ShoreSquad 🏖️

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

ShoreSquad is a community-driven web platform that mobilizes young people to clean beaches together. Using interactive maps, weather tracking, and social features, we make eco-action fun and connected.

---

## 🎯 Project Overview

### One-Line Pitch
Rally your crew, track weather, and hit the next beach cleanup with our dope map app!

### Why It Matters
ShoreSquad creates value by:
- **Mobilizing young people** to take environmental action
- **Using maps & weather data** for easy cleanup planning
- **Building community** through social features that make eco-action fun

### Target Audience
Gen Z & Millennials (18-35) who are environmentally conscious and social-media savvy

---

## 🎨 Design System

### Color Palette
Inspired by ocean vibes and environmental consciousness:

| Color | Hex | Usage | Psychology |
|-------|-----|-------|-----------|
| Deep Ocean Blue | `#0B7FB8` | Primary brand color | Trust, stability |
| Coral Reef Teal | `#17B89A` | Secondary/CTA | Growth, harmony |
| Energy Coral | `#FF6B6B` | Alerts, actions | Energy, urgency |
| Clean Fresh | `#E8F8F5` | Backgrounds | Calm, cleanliness |
| Dark Navy | `#1A3A42` | Text, dark elements | Depth, authority |

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Headlines**: Bold (700) for impact
- **Body**: Regular weight (400-500) for readability
- **Sizes**: Responsive scaling from 14px (mobile) to 48px (hero)

---

## 💻 Technology Stack

### Frontend
- **HTML5**: Semantic structure with accessibility (ARIA labels)
- **CSS3**: Modern styling with CSS custom properties, Grid/Flexbox, animations
- **JavaScript (ES6+)**: Interactive features, API integrations
- **Google Maps API**: Real-time beach mapping & location services

### APIs & Services
- **Google Maps API**: Maps, Places, Geometry libraries
- **Geolocation API**: User location detection
- **LocalStorage**: State persistence (future enhancement)

### Development Tools
- **VS Code**: Code editor with Live Server
- **Git**: Version control
- **GitHub Pages**: Deployment ready

---

## 📱 Features

### Core Features
1. **Interactive Beach Map**
   - Google Maps integration with custom styling
   - Real-time user location detection
   - Beach markers with debris priority levels (High/Medium/Low)
   - Info windows with cleanup history

2. **Crew Management**
   - Create cleanup events
   - Track statistics (cleanups organized, impact, team members, beaches visited)
   - Social crew features (invite friends)

3. **Weather Integration**
   - Real-time weather data
   - Forecast for cleanup planning
   - Wind/humidity/UV index display

4. **User Experience**
   - Mobile-responsive design (480px, 768px breakpoints)
   - Smooth animations and transitions
   - Accessibility-first approach (WCAG 2.1 compliant)
   - Dark mode support

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Google Maps API Key
- Live Server extension (optional, for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JavierYeoRP/c240-projects.git
   cd ShoreSquad
   ```

2. **Get Google Maps API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Maps API, Places API, Geometry library
   - Create an API key
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` in `index.html`

3. **Run locally**
   - **Option A**: Open `index.html` directly in browser
   - **Option B**: Use Live Server (Right-click → Open with Live Server)
   - **Option C**: Use Python: `python -m http.server 8000`

4. **Visit** `http://localhost:5500` (or your server port)

---

## 📂 Project Structure

```
ShoreSquad/
├── index.html              # HTML5 boilerplate + semantic structure
├── css/
│   └── styles.css         # Styles with custom properties & responsive design
├── js/
│   └── app.js             # Core functionality (Maps, Weather, Crew, Events)
├── assets/                # Images, icons, media (empty for now)
├── .gitignore             # Git ignore rules
├── .vscode/
│   └── settings.json      # Live Server configuration
└── README.md              # This file
```

---

## 🔑 JavaScript Features

### Interactivity & Performance

#### App State Management
```javascript
const appState = {
    userLocation: { latitude, longitude },
    map: null,
    markers: [],
    beaches: [],
    crew: { members, cleanups, impact, beaches },
    weatherData: null
};
```

#### Key Functions
- `initializeGoogleMap()` - Initialize map on page load
- `addBeachMarkers()` - Load beach locations with custom icons
- `recenterMap()` - Center map to user location
- `selectBeachForCleanup(beachName)` - Schedule cleanup event
- `requestUserLocation()` - Geolocation with fallback

#### Performance Optimizations
- Debounced resize/scroll handlers
- Lazy image loading (IntersectionObserver)
- Service Worker ready (future PWA support)
- Minimal DOM manipulation
- Event delegation for dynamic content

#### Accessibility Features
- ARIA labels for navigation & interactions
- Focus visible states with proper styling
- Semantic HTML5 elements
- Keyboard shortcut support (Cmd/Ctrl + /)
- Reduced motion preferences respected

---

## 🎯 UX Design Principles

### Usability
1. **Clear Navigation**: Sticky navbar with smooth scrolling
2. **Visual Hierarchy**: Size, color, and spacing guide attention
3. **Intuitive Maps**: Familiar Google Maps UI with custom beach markers
4. **Fast Feedback**: Toast notifications for user actions

### Accessibility
1. **WCAG 2.1 Level AA** compliance
2. Semantic HTML with proper heading structure
3. Color contrast ratios ≥ 4.5:1 for text
4. Keyboard navigation support
5. Alt text for images (when added)
6. Reduced motion preferences respected

### Mobile-First Responsive Design
- **Mobile**: 480px - Single column, touch-friendly buttons
- **Tablet**: 768px - Two-column layouts, optimized spacing
- **Desktop**: 1200px+ - Full featured experience

---

## 🌊 Sample Data

### Beach Locations (with debris priority)
```javascript
const SAMPLE_BEACHES = [
    { name: "Surfer's Paradise Beach", lat: 28.0174, lng: -82.4241, debris: "High", priority: "high" },
    { name: "Coral Cove", lat: 28.0342, lng: -82.4301, debris: "Medium", priority: "medium" },
    { name: "Turtle Sanctuary Beach", lat: 28.0087, lng: -82.4156, debris: "Low", priority: "low" },
    { name: "Sunset Bay", lat: 28.0523, lng: -82.4432, debris: "High", priority: "high" }
];
```

---

## 🔧 Configuration

### Live Server Settings (.vscode/settings.json)
```json
{
    "liveServer.settings.port": 5500,
    "liveServer.settings.https": false,
    "liveServer.settings.root": "/"
}
```

### Git Ignore Rules (.gitignore)
```
node_modules/
.DS_Store
*.log
.env
dist/
```

---

## 📊 Crew Stats Tracking

Track the impact of your cleanup activities:
- **Cleanups Organized**: Number of events created
- **Total Impact**: Pounds of debris collected (manual entry)
- **Team Members**: Size of your crew
- **Beaches Visited**: Unique locations cleaned

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| IE 11 | ❌ Not supported |

---

## 🚀 Future Enhancements

### Phase 2
- [ ] User authentication (Google Sign-In)
- [ ] Real-time crew chat
- [ ] Photo upload & cleanup documentation
- [ ] Leaderboards & achievements
- [ ] Weather API integration (OpenWeatherMap)

### Phase 3
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Offline support (Service Worker)
- [ ] Backend API (Node.js/Express)
- [ ] Database (MongoDB/PostgreSQL)

### Phase 4
- [ ] Crew profiles with social links
- [ ] Event registration & RSVP
- [ ] Impact analytics dashboard
- [ ] Partner organization integration
- [ ] Sponsorship/donation platform

---

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👥 Team

**ShoreSquad** is built by a community of young environmental advocates. 

Contact: info@shoresquad.com

---

## 🙏 Acknowledgments

- Inspired by the need to mobilize young people for environmental action
- Built with modern web technologies and accessibility first
- Color palette inspired by ocean conservation

---

**Last Updated**: December 1, 2025
**Status**: 🟢 MVP Ready for Testing & Feedback
