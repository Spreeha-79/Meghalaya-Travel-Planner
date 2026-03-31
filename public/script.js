// ===== GOOGLE MAP SWITCHER =====
const mapPlaces = {
    main: {
        src: "https://maps.google.com/maps?q=Meghalaya,India&t=k&z=8&output=embed",
        title: "Meghalaya",
        desc: "The Abode of Clouds — explore all major destinations",
        icon: "🗺️"
    },
    shillong: {
        src: "https://maps.google.com/maps?q=Shillong,Meghalaya&t=k&z=13&output=embed",
        title: "Shillong",
        desc: "Scotland of the East — capital city of Meghalaya",
        icon: "🏙️"
    },
    cherrapunji: {
        src: "https://maps.google.com/maps?q=Cherrapunji,Meghalaya&t=k&z=13&output=embed",
        title: "Cherrapunji (Sohra)",
        desc: "Land of waterfalls — Nohkalikai Falls & misty cliffs",
        icon: "🌊"
    },
    mawlynnong: {
        src: "https://maps.google.com/maps?q=Mawlynnong,Meghalaya&t=k&z=14&output=embed",
        title: "Mawlynnong",
        desc: "Asia's Cleanest Village — bamboo houses & root bridges",
        icon: "🌸"
    },
    dawki: {
        src: "https://maps.google.com/maps?q=Dawki,Meghalaya&t=k&z=14&output=embed",
        title: "Dawki",
        desc: "Crystal clear Umngot River — boats float on air!",
        icon: "💎"
    },
    umiam: {
        src: "https://maps.google.com/maps?q=Umiam+Lake,Meghalaya&t=k&z=13&output=embed",
        title: "Umiam Lake",
        desc: "Barapani — scenic reservoir great for water sports",
        icon: "🚣"
    }
};

function switchMap(placeKey) {
    const place = mapPlaces[placeKey];
    if (!place) return;

    // Update iframe src
    const iframe = document.getElementById("googleMap");
    iframe.style.opacity = "0";
    setTimeout(() => {
        iframe.src = place.src;
        iframe.style.opacity = "1";
    }, 300);

    // Update info card
    document.getElementById("mapInfoTitle").textContent = place.title;
    document.getElementById("mapInfoDesc").textContent = place.desc;
    document.querySelector(".map-info-icon").textContent = place.icon;

    // Update active button
    document.querySelectorAll(".map-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
}
// ===== END MAP =====
function initCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const track = carousel.querySelector(".carousel-track");
    const images = track.querySelectorAll("img");
    const dots = carousel.querySelectorAll(".dot");

    let current = 0;
    const visible = 3; // number of images visible
    const total = images.length;

    function moveSlide() {
        current++;

        // loop back smoothly
        if (current > total - visible) {
            current = 0;
        }

        track.style.transform = `translateX(-${current * (100 / visible)}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === current % dots.length);
        });
    }

    setInterval(moveSlide, 2500);
}

initCarousel("carousel-culture");
initCarousel("carousel-food");
initCarousel("carousel-festival");
document.getElementById("tripForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let daysText = document.getElementById("days").value;
    let days = 0;
    if (daysText === "2-3 days") days = 3;
    if (daysText === "3-5 days") days = 5;
    if (daysText === "7-10 days") days = 7;
    let budget = document.getElementById("budget").value;
    let month = document.getElementById("month").value;
    let mood = document.getElementById("mood").value;
    let message = document.getElementById("message").value.trim();

    let travelType = document.querySelector('input[name="type"]:checked');

    let error = document.getElementById("error");
    let resultBox = document.getElementById("resultBox");

    if (!name || !email || !phone || !days || !budget || !month) {
        error.textContent = "Please fill all required fields.";
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        error.textContent = "Enter a valid 10-digit phone number.";
        return;
    }

    if (!travelType) {
        error.textContent = "Please select a travel type.";
        return;
    }

    // Show loading state
    document.getElementById("tripResult").innerHTML =
        '<div style="text-align: center; padding: 40px;">' +
        '🤖 Planning your smart Meghalaya trip...<br>' +
        '⏳ Fetching live weather data and attractions...' +
        '</div>';

    error.style.color = "green";
    error.textContent = "Form submitted successfully! 🌿";
    resultBox.style.display = "block";

    // API Keys
    const ROUTE_API = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImE1M2ZhYzc2ODFkYzQ2YmFhODI5MGViNzVkODY3MTYyIiwiaCI6Im11cm11cjY0In0=";
    const PLACE_API = "cadd265f2ff04144be30da817c86d845";
    const WEATHER_API = "92b4c25cd5b8727d2bede553cd415121";

    // Define better fallback places with proper coordinates
    const FALLBACK_PLACES = [
        { name: "Nohkalikai Falls", lat: 25.2495, lon: 91.7172, type: "waterfall", description: "India's tallest plunge waterfall (340m)", image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b" },
        { name: "Living Root Bridge (Double Decker)", lat: 25.2467, lon: 91.7332, type: "trek", description: "UNESCO tentative site, natural bridge" },
        { name: "Mawsmai Cave", lat: 25.2781, lon: 91.7293, type: "cave", description: "Limestone cave with fascinating formations" },
        { name: "Seven Sisters Falls", lat: 25.2702, lon: 91.7218, type: "waterfall", description: "Stunning 7-segmented waterfall" },
        { name: "Shillong Peak", lat: 25.5487, lon: 91.8762, type: "viewpoint", description: "Highest point with panoramic views" },
        { name: "Ward's Lake", lat: 25.5712, lon: 91.8842, type: "lake", description: "Peaceful artificial lake in Shillong" },
        { name: "Umiam Lake", lat: 25.6562, lon: 91.8942, type: "lake", description: "Beautiful man-made reservoir" },
        { name: "Mawlynnong Village", lat: 25.1914, lon: 91.9228, type: "village", description: "Asia's cleanest village" },
        { name: "Dawki River", lat: 25.1822, lon: 92.0381, type: "river", description: "Crystal clear Umngot River" },
        { name: "Elephant Falls", lat: 25.5432, lon: 91.8562, type: "waterfall", description: "Three-tiered waterfall" },
        { name: "Laitlum Canyon", lat: 25.4621, lon: 91.9123, type: "viewpoint", description: "Breathtaking canyon views" },
        { name: "Don Bosco Museum", lat: 25.5751, lon: 91.8912, type: "culture", description: "Rich cultural heritage museum" }
    ];

    // Enhanced activities based on mood
    const ACTIVITIES = {
        adventure: [
            "Trek to Living Root Bridge (2-3 hours trek)",
            "Cave exploration at Mawsmai",
            "Waterfall rappelling at Nohkalikai",
            "Zip-lining at Cherrapunji",
            "Rock climbing at Sohra"
        ],
        relax: [
            "Peaceful boat ride at Umiam Lake",
            "Sunset at Shillong Peak",
            "Cafe hopping in Shillong",
            "Picnic at Ward's Lake",
            "Nature walk at Laitlum Canyon"
        ],
        nature: [
            "Photography at Seven Sisters Falls",
            "Bird watching at Mawphlang Forest",
            "Sunrise at Nohkalikai Falls",
            "Nature trail at Elephant Falls",
            "Orchid hunting at Lum Neh"
        ],
        culture: [
            "Visit Don Bosco Museum",
            "Explore local markets in Shillong",
            "Traditional Khasi food tasting",
            "Visit Mawphlang Sacred Forest",
            "Attend cultural evening at Shillong"
        ],
        food: [
            "Jadoh tasting at local eateries",
            "Street food tour in Police Bazar",
            "Try traditional Tungrymbai",
            "Bamboo shoot curry experience",
            "Local tea tasting session"
        ]
    };

    // Enhanced hotels by budget


    // Enhanced food recommendations
    const FOODS = {
        must_try: [
            { name: "Jadoh", description: "Rice cooked with meat and local spices" },
            { name: "Dohneiiong", description: "Pork cooked in black sesame gravy" },
            { name: "Tungrymbai", description: "Fermented soybean paste" },
            { name: "Smoked Pork", description: "Traditional smoked meat" },
            { name: "Bamboo Shoot Curry", description: "Fresh bamboo shoots in curry" }
        ],
        beverages: [
            "Local Tea from Sohra",
            "Rice Beer (try responsibly)",
            "Fresh fruit juices"
        ]
    };

    // Fetch weather data with better error handling
    async function fetchWeather() {
        try {
            const response = await fetch("/api/weather");
            const data = await response.json();

            if (data.cod === 200) {
                return {
                    temp: data.main.temp,
                    condition: data.weather[0].main,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    feels_like: data.main.feels_like
                };
            }
            return null;
        } catch (error) {
            console.warn("Weather API failed:", error);
            return null;
        }
    }

    // Fetch places with timeout and error handling
    async function fetchPlaces() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const response = await fetch("/api/places");
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (data.features && data.features.length > 0) {
                return data.features.map(f => ({
                    name: f.properties.name || "Unknown",
                    lat: f.geometry.coordinates[1],
                    lon: f.geometry.coordinates[0],
                    categories: f.properties.categories || []
                })).filter(p => p.name !== "Unknown");
            }
            return [];
        } catch (error) {
            console.warn("Places API failed, using fallback data:", error);
            return FALLBACK_PLACES;
        }
    }

    // Calculate distance using Google Maps Distance Matrix (free alternative)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Filter places based on mood
    function filterPlacesByMood(places, mood, days) {
        if (!places || places.length === 0) return FALLBACK_PLACES;

        const moodKeywords = {
            adventure: ["waterfall", "trek", "cave", "falls", "bridge"],
            relax: ["lake", "park", "garden", "cafe", "viewpoint"],
            nature: ["falls", "forest", "hill", "peak", "canyon"],
            culture: ["museum", "village", "heritage", "cultural", "tribe"],
            food: ["market", "cafe", "restaurant", "food"]
        };

        const keywords = moodKeywords[mood] || moodKeywords.nature;

        let filtered = places.filter(place => {
            const name = (place.name || "").toLowerCase();
            return keywords.some(keyword => name.includes(keyword));
        });

        const remaining = places.filter(p => !filtered.includes(p));
        return [...filtered, ...remaining].slice(0, days * 2 + 4);
    }

    // Generate smart itinerary
    function generateItinerary(selectedPlaces, days, mood, weather) {
        let itinerary = `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  color: white; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
        <h3 style="margin: 0; color: white;">🌿 Your Personalized Meghalaya Travel Plan</h3>
        <p style="margin: 5px 0 0 0;">Based on your ${mood} mood preference</p>
      </div>
    `;

        // Add weather info if available
        if (weather) {
            const weatherIcon = weather.condition === "Rain" ? "☔" :
                weather.temp < 15 ? "❄️" : "☀️";
            itinerary += `
        <div style="background: #e3f2fd; padding: 15px; border-radius: 12px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 10px 0;">${weatherIcon} Current Weather in Shillong</h4>
          <p><strong>Temperature:</strong> ${weather.temp}°C (feels like ${weather.feels_like}°C)</p>
          <p><strong>Condition:</strong> ${weather.description}</p>
          <p><strong>Humidity:</strong> ${weather.humidity}%</p>
          ${weather.condition === "Rain" ?
                    '<p style="color: #d32f2f;">⚠️ Rain expected! Carry umbrella and waterproof gear.</p>' :
                    '<p style="color: #388e3c;">✅ Perfect weather for outdoor activities!</p>'}
        </div>
      `;
        }

        // Generate day-by-day itinerary
        for (let i = 0; i < days; i++) {
            const place = selectedPlaces[i] || selectedPlaces[i % selectedPlaces.length];
            const activities = ACTIVITIES[mood] || ACTIVITIES.nature;
            const activity = activities[i % activities.length];

            // Calculate distance from Shillong center
            const distance = calculateDistance(25.5788, 91.8933, place.lat, place.lon);

            itinerary += `
        <div style="border-left: 4px solid #2e7d32; 
                    background: white; 
                    margin: 20px 0; 
                    padding: 20px; 
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="color: #2e7d32; margin-top: 0;">Day ${i + 1}</h3>
          <p><strong>📍 Visit:</strong> ${place.name}</p>
          <p><strong>🎯 Activity:</strong> ${activity}</p>
          <p><strong>📏 Distance from Shillong:</strong> ${distance.toFixed(1)} km</p>
          <p><strong>⏱️ Estimated travel time:</strong> ${Math.ceil(distance / 40)} hours</p>
          <a href="https://www.google.com/maps?q=${place.lat},${place.lon}" 
             target="_blank" 
             style="display: inline-block; 
                    background: #2e7d32; 
                    color: white; 
                    padding: 8px 16px; 
                    text-decoration: none; 
                    border-radius: 6px;
                    margin-top: 10px;">
            📍 View on Google Maps
          </a>
        </div>
      `;
        }

        return itinerary;
    }

    async function saveTripToServer(formData) {
        try {
            const response = await fetch("/api/save-trip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) console.log("✅ Trip saved, ID:", data.id);
        } catch (err) {
            console.warn("Could not save trip:", err);
            // Silent fail — user experience not affected
        }
    }
    async function fetchLiveHotels(budget) {
        const HOTELS = {
            "₹10k – ₹20k": [
                {
                    name: "Zostel Shillong",
                    type: "Hostel",
                    price: "₹500–800/night",
                    rating: "4.2",
                    address: "Laitumkhrah, Shillong",
                    bookingUrl: "https://www.zostel.com/zostel/shillong/"
                },
                {
                    name: "Hotel Shillong Heights",
                    type: "Budget Hotel",
                    price: "₹1200–1800/night",
                    rating: "4.0",
                    address: "Police Bazar, Shillong",
                    bookingUrl: "https://www.makemytrip.com/hotels/hotel-shillong_heights-details-shillong.html"
                },
                {
                    name: "OYO Townhouse Shillong",
                    type: "Guest House",
                    price: "₹900–1500/night",
                    rating: "3.9",
                    address: "GS Road, Shillong",
                    bookingUrl: "https://www.oyorooms.com/hotels-in-shillong/"
                }
            ],
            "₹20k – ₹40k": [
                {
                    name: "Hotel Polo Towers",
                    type: "3-Star Hotel",
                    price: "₹3500–5000/night",
                    rating: "4.4",
                    address: "Oakland Road, Shillong",
                    bookingUrl: "https://www.makemytrip.com/hotels/hotel_polo_towers-details-shillong.html"
                },
                {
                    name: "Pinewood Hotel Shillong",
                    type: "Heritage Hotel",
                    price: "₹4000–6000/night",
                    rating: "4.3",
                    address: "European Ward, Shillong",
                    bookingUrl: "https://pinewoodhotel.site/"
                },
                {
                    name: "Hotel Centre Point",
                    type: "Business Hotel",
                    price: "₹2800–4500/night",
                    rating: "4.1",
                    address: "Police Bazar, Shillong",
                    bookingUrl: "https://www.makemytrip.com/hotels/hotel-details/?hotelId=200809051656408239&_uCurrency=INR&adg=154611179420&aid=674907447779&campaign_type=search&cid=CjwKCAjw-J3OBhBuEiwAwqZ_h2pnKmiiBka91LohxucD_BJbuMeTdB6GdC64PUzmwalJ4iW-GQ3GWxoCLH4QAvD_BwE&city=CTSHL&cmp=SEM%7CD%7CDH%7CG%7CHname%7CDH_HName_CTSHL_4.5-7K_DT%7C200809051656408239%7CR%7C&country=IN&device=c&gad_campaignid=20577364759&gad_source=1&gbraid=0AAAAAD5Az1QODW2NMKiCpPbPKRPqdAgKe&gclid=CjwKCAjw-J3OBhBuEiwAwqZ_h2pnKmiiBka91LohxucD_BJbuMeTdB6GdC64PUzmwalJ4iW-GQ3GWxoCLH4QAvD_BwE&kw=hotel+center+point+shillong&lat=25.57598&lng=91.88036&locusId=CTSHL&locusType=city&mf_campaign=%7BHARDCODE_CAMPAIGN_NAME%7D&mf_campaignid=20577364759&mf_medium=cpc&mf_source=google&pl=&rank=1&reference=hotel&roomStayQualifier=2e2e12e17e&searchText=Shillong&topHtlId=200809051656408239&type=city&mtkeys=undefined&isPropSearch=T"
                }
            ],
            "₹40k+": [
                {
                    name: "Vivanta Shillong",
                    type: "5-Star Luxury",
                    price: "₹8000–12000/night",
                    rating: "4.6",
                    address: "Jail Road, Shillong",
                    bookingUrl: "https://www.tajhotels.com/en-in/vivanta/shillong/"
                },
                {
                    name: "Ri Kynjai Resort",
                    type: "Luxury Resort",
                    price: "₹7000–10000/night",
                    rating: "4.7",
                    address: "Umiam Lake, Shillong",
                    bookingUrl: "https://www.rikynjai.com/"
                },
                {
                    name: "Tripura Castle",
                    type: "Heritage Luxury",
                    price: "₹6000–9000/night",
                    rating: "4.5",
                    address: "Cleve Colony, Shillong",
                    bookingUrl: "https://www.booking.com/hotel/in/tripura-castle.html"
                }
            ]
        };

        // Pick hotels based on budget, default to mid-range
        const hotels = HOTELS[budget] || HOTELS["₹20k – ₹40k"];

        return `
    <div style="margin: 30px 0; padding: 20px; background: #e8f5e9; border-radius: 12px;">
      <h3 style="color: #2e7d32; margin-top: 0;">🏨 Recommended Hotels (${budget})</h3>
      <p style="color: #666; font-size: 13px;">🏷️ Handpicked hotels matching your budget</p>
      <div style="display: grid; gap: 15px;">
        ${hotels.map(hotel => `
          <div style="border: 1px solid #c8e6c9; border-radius: 10px; 
                      padding: 15px; background: white;">
            <strong style="font-size: 16px;">🏨 ${hotel.name}</strong>
            <p style="margin: 6px 0; color: #555;">
              📌 ${hotel.address}
            </p>
            <p style="margin: 6px 0;">
              🏷️ ${hotel.type} &nbsp;|&nbsp; 
              💰 ${hotel.price} &nbsp;|&nbsp; 
              ⭐ ${hotel.rating}
            </p>
            <a href="${hotel.bookingUrl}" target="_blank"
              style="display: inline-block; background: #2e7d32; color: white;
                     padding: 8px 16px; border-radius: 6px; text-decoration: none;
                     margin-top: 8px; font-size: 14px;">
              🔗 Book Now
            </a>
          </div>
        `).join('')}
      </div>
    </div>`;
    }
    // Main travel assistant function
    async function startTravelAssistant(days, budget, mood) {
        try {
            // Fetch data in parallel
            const [weather, apiPlaces] = await Promise.all([
                fetchWeather(),
                fetchPlaces()
            ]);

            // Use API places if available, otherwise use fallback
            let allPlaces = apiPlaces.length > 0 ? apiPlaces : FALLBACK_PLACES;

            // Filter places based on user's mood
            const filteredPlaces = filterPlacesByMood(allPlaces, mood, days);
            const selectedPlaces = filteredPlaces.slice(0, days * 2); // Get enough places for itinerary

            // Generate itinerary
            const itinerary = generateItinerary(selectedPlaces, days, mood, weather);

            // Add food recommendations
            let foodHTML = `
        <div style="margin: 30px 0; padding: 20px; background: #fff3e0; border-radius: 12px;">
          <h3 style="color: #bf360c; margin-top: 0;">🍲 Must-Try Local Cuisine</h3>
          <div style="display: grid; gap: 10px;">
            ${FOODS.must_try.map(food => `
              <div>
                <strong>🍛 ${food.name}</strong>
                <p style="margin: 5px 0 0 20px; color: #666;">${food.description}</p>
              </div>
            `).join('')}
          </div>
          <h4 style="margin-top: 15px;">☕ Local Beverages</h4>
          <ul>
            ${FOODS.beverages.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `;

            // Add hotel recommendations
            let hotelsHTML = await fetchLiveHotels(budget);

            // Add travel tips
            let tipsHTML = `
        <div style="margin: 30px 0; padding: 20px; background: #e1f5fe; border-radius: 12px;">
          <h3 style="color: #01579b; margin-top: 0;">💡 Expert Travel Tips</h3>
          <ul>
            <li>✅ Best time to visit: October to April for pleasant weather<br></li>
            <li>✅ Carry warm clothes even in summer - it gets chilly in evenings<br></li>
            <li>✅ Book accommodations in advance during peak season (Dec-Jan)<br></li>
            <li>✅ Rent a private cab for flexibility in exploring remote areas<br></li>
            <li>✅ Try local guides for trekking to Living Root Bridges<br></li>
            <li>✅ Carry cash as ATMs may be limited in remote areas</li>
          </ul>
        </div>
      `;

            // Add packing essentials
            let packingHTML = `
        <div style="margin: 30px 0; padding: 20px; background: #f3e5f5; border-radius: 12px;">
          <h3 style="color: #6a1b9a; margin-top: 0;">🎒 Packing Essentials</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
            <div>👕 Light cotton clothes</div>
            <div>🧥 Warm jacket/sweater</div>
            <div>☔ Raincoat/umbrella</div>
            <div>👟 Comfortable trekking shoes</div>
            <div>🔦 Torch/flashlight</div>
            <div>💊 Basic medicines</div>
            <div>📸 Camera</div>
            <div>🔌 Power bank</div>
          </div>
        </div>
      `;

            // Combine everything
            const finalHTML = itinerary + foodHTML + hotelsHTML + tipsHTML + packingHTML;
            document.getElementById("tripResult").innerHTML = finalHTML;

        } catch (err) {
            console.error("Error in travel assistant:", err);
            document.getElementById("tripResult").innerHTML = `
        <div style="color: red; padding: 20px; text-align: center;">
          <h3>❌ Something went wrong</h3>
          <p>We couldn't generate your itinerary. Please try again.</p>
          <p>Error: ${err.message}</p>
        </div>
      `;
        }
    }
    saveTripToServer({ name, email, phone, days, budget, month, travelType: travelType.value, mood, message });
    // Call the travel assistant
    startTravelAssistant(days, budget, mood);

    // Display form submission summary
    resultBox.innerHTML = `
    <h3>✅ Trip Request Received! 🌿</h3>
    <p>Thanks <b>${name}</b>! Here's your travel request summary:</p>
    <ul>
      <li><b>Email:</b> ${email}</li>
      <li><b>Phone:</b> ${phone}</li>
      <li><b>Duration:</b> ${days} days</li>
      <li><b>Budget:</b> ${budget}</li>
      <li><b>Preferred Month:</b> ${month}</li>
      <li><b>Travel Type:</b> ${travelType.value}</li>
      <li><b>Travel Mood:</b> ${mood}</li>
    </ul>
    <p><b>Extra message:</b> ${message ? message : "None"}</p>
    <hr>
    <p>🌿 Your personalized itinerary is ready above! Scroll up to see it.</p>
  `;

    resultBox.scrollIntoView({ behavior: "smooth" });

    // this.reset(); 
});