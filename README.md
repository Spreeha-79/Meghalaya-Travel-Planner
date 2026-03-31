# 🌿 Meghalaya Travel Planner
 
A full-stack travel planning website for **Meghalaya — The Abode of Clouds**, featuring an interactive itinerary generator, live weather & places APIs, and an admin dashboard for trip submissions.
 
---
## 📁 Project Structure
 

trip-planner/
├── public/
│   ├── script.js           # Javascript 
│   ├── index.html          # Main frontend page
│   ├── style_webp.css      # Stylesheet
│   └── images/             # Local place images
├── server.js               # Express backend
├── trips.json              # Persisted trip submissions
├── .env                    # API keys (not committed)
├── package.json
└── package-lock.json
 
---

## ✨ Features
 
- **Hero Section** — Full-screen landing with animated text and CTA buttons
- **Places Guide** — Shillong, Cherrapunji, Mawlynnong, Dawki, Umiam Lake with images and descriptions
- **Interactive Map** — Switchable Google Maps embeds for each destination
- **Culture & Experiences** — Auto-rotating image carousels for Local Culture, Traditional Food, and Festivals
- **Best Time to Visit** — Seasonal travel guide table
- **Trip Planner Form** — Collects name, email, phone, duration, budget, travel mood, and more
- **AI Itinerary Generator** — Generates a personalized day-by-day itinerary based on mood, budget, and duration
- **Live Weather** — Fetches current Shillong weather via OpenWeatherMap API
- **Places Discovery** — Fetches nearby tourist spots via Geoapify Places API
- **Hotel Recommendations** — Budget-matched hotel suggestions with booking links
- **Food & Packing Tips** — Local cuisine guide and packing essentials
- **Admin Dashboard** — Password-protected panel to view all trip submissions
 
---

## 🚀 Getting Started
 
### 1. Clone the repository
 
```bash
git clone https://github.com/your-username/trip-planner.git
cd trip-planner
```
 
### 2. Install dependencies
 
```bash
npm install
```
 
### 3. Set up environment variables
 
Create a `.env` file in the root directory:
 
```env
WEATHER_API=your_openweathermap_api_key
PLACE_API=your_geoapify_api_key
```
 
| Variable | Source |
|   ---    |   ---  |
| `WEATHER_API` | [openweathermap.org](https://openweathermap.org/api) |
| `PLACE_API`   | [geoapify.com](https://www.geoapify.com/) |
 
### 4. Start the server
 
```bash
npm start
```
 
The app will be live at **http://localhost:3000**
 
---

 ## 🔌 API Endpoints
 
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/weather` | Fetches current weather for Shillong |
| `GET` | `/api/places` | Fetches nearby tourist attractions (50km radius) |
| `POST` | `/api/save-trip` | Saves a new trip form submission to `trips.json` |
| `GET` | `/admin` | Admin panel — view all submissions (password protected) |
 
### Admin Panel Access
Set the following in your `.env` file:

ADMIN_USER=your_username  
ADMIN_PASS=your_password
Visit `http://localhost:3000/admin` and enter the admin credentials to access the information.

---
 
## 📦 Dependencies
 
| Package | Purpose |
|---|---|
| `express` | Web server framework |
| `cors` | Cross-origin request handling |
| `dotenv` | Environment variable management |
| `node-fetch` | HTTP requests to external APIs |
 
---
 
## 🗺️ Destinations Covered
 
| Place | Highlights |
|---|---|
| 🏙️ Shillong | Ward's Lake, Shillong Peak, Laitlum Canyon, Elephant Falls |
| 🌊 Cherrapunji | Nohkalikai Falls, Seven Sisters Falls, Arwah Caves |
| 🌸 Mawlynnong | Asia's Cleanest Village, Sky View Tower, Living Root Bridge |
| 💎 Dawki | Umngot River, India-Bangladesh Border, Dawki Bridge |
| 🚣 Umiam Lake | Water Sports, Lumpongden Island |
 
---
 
## 📅 Best Time to Visit
 
| Season | Weather | Recommended For |
|---|---|---|
| 🌤️ October – April | Clear & pleasant | Trekking, sightseeing |
| 🌧️ May – June | Rainy | Waterfall views |
| ⛈️ July – September | Heavy monsoon | Avoid travel |
 
---
 
## 🧠 Itinerary Generator Logic
 
When a user submits the trip form, the frontend:
 
1. Calls `/api/weather` for live Shillong weather
2. Calls `/api/places` for nearby attractions (falls back to curated local data if API fails)
3. Filters places based on the user's **travel mood** (Adventure / Relax / Nature / Food)
4. Generates a **day-by-day itinerary** with Google Maps links and travel time estimates
5. Appends **hotel recommendations** matched to the selected budget
6. Adds **food tips**, **expert travel tips**, and **packing essentials**
7. Saves the submission to `trips.json` via `/api/save-trip`
 
---
 
## 🔒 Security Notes
 
- `.env` is **not committed** — never push API keys to version control
- Admin panel uses HTTP Basic Auth — consider upgrading to JWT for production
- Form inputs are validated client-side; add server-side sanitization before deploying publicly
- `trips.json` stores plain text data — consider a database (MongoDB, SQLite) for production use
 
---


## 🛠️ Future Improvements
 
- [ ] Replace `trips.json` with a proper database
- [ ] Add email confirmation on trip submission
- [ ] Integrate real-time cab/flight booking APIs
- [ ] Add multi-language support (Hindi, Khasi)
- [ ] Make the site fully mobile-responsive
- [ ] Add user authentication for personalized trip history
 
---
 
## 🙌 Credits
 
- Images: [Unsplash](https://unsplash.com) & [Pexels](https://pexels.com)
- Maps: [Google Maps Embed API](https://developers.google.com/maps/documentation/embed)
- Weather: [OpenWeatherMap](https://openweathermap.org)
- Places: [Geoapify](https://www.geoapify.com)
- Fonts: [Google Fonts](https://fonts.google.com)
 
---
 
> 🌿 *"Meghalaya — where the clouds come down to earth."*
 
