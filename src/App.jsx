import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DUMMY DATA
// ─────────────────────────────────────────────────────────────────────────────
const TRIPS = [
  { id: 1, name: "Bali Escape", startDate: "2025-07-10", endDate: "2025-07-22", destinations: 4, budget: 2800, spent: 1950, cover: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", status: "upcoming", description: "Tropical paradise trip through the heart of Bali." },
  { id: 2, name: "Tokyo Dream", startDate: "2025-09-01", endDate: "2025-09-14", destinations: 6, budget: 4200, spent: 0, cover: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", status: "upcoming", description: "Dive deep into Japanese culture, food and technology." },
  { id: 3, name: "Paris Getaway", startDate: "2025-03-15", endDate: "2025-03-22", destinations: 3, budget: 3100, spent: 3250, cover: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", status: "completed", description: "City of lights — art, cuisine and romance." },
  { id: 4, name: "Safari Kenya", startDate: "2026-01-05", endDate: "2026-01-18", destinations: 5, budget: 5500, spent: 0, cover: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80", status: "upcoming", description: "Epic wildlife adventure through the Kenyan savanna." },
  { id: 5, name: "Amalfi Coast", startDate: "2025-05-10", endDate: "2025-05-17", destinations: 4, budget: 3600, spent: 3600, cover: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=600&q=80", status: "completed", description: "Cliffside villages, azure waters and Italian food." },
  { id: 6, name: "Patagonia Trek", startDate: "2025-11-20", endDate: "2025-12-04", destinations: 3, budget: 4800, spent: 0, cover: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80", status: "draft", description: "Hike to the end of the world." },
];

const CITIES = [
  { id: 1,  name: "Kyoto",       country: "Japan",        flag: "🇯🇵", region: "Asia",     score: 94, costIndex: "Medium", costUSD: 120, bestSeason: "Mar–May", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", desc: "Ancient temples, bamboo groves and timeless Japanese culture await in this imperial city.", attractions: ["Fushimi Inari Shrine","Arashiyama Bamboo Grove","Kinkaku-ji Temple","Gion District"], food: ["Kaiseki","Matcha sweets","Ramen","Tofu cuisine"], activities: ["Temple hopping","Tea ceremony","Cycling","Geisha shows"] },
  { id: 2,  name: "Santorini",   country: "Greece",       flag: "🇬🇷", region: "Europe",   score: 97, costIndex: "High",   costUSD: 250, bestSeason: "Jun–Sep", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", desc: "Iconic white-washed buildings and blue domes perched above a stunning volcanic caldera.", attractions: ["Oia Village","Akrotiri ruins","Red Beach","Caldera viewpoint"], food: ["Fresh seafood","Fava","Tomatokeftedes","Local wine"], activities: ["Sailing","Sunset watching","Wine tasting","Boat tours"] },
  { id: 3,  name: "Marrakech",   country: "Morocco",      flag: "🇲🇦", region: "Africa",   score: 88, costIndex: "Low",    costUSD: 60,  bestSeason: "Mar–May", img: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80", desc: "Vibrant souks, ornate riads and the rich tapestry of North African culture and spice.", attractions: ["Djemaa el-Fna","Bahia Palace","Majorelle Garden","Medina souks"], food: ["Tagine","Couscous","Pastilla","Mint tea"], activities: ["Souk exploring","Hammam spa","Camel ride","Cooking class"] },
  { id: 4,  name: "Queenstown",  country: "New Zealand",  flag: "🇳🇿", region: "Oceania",  score: 92, costIndex: "High",   costUSD: 200, bestSeason: "Dec–Feb", img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80", desc: "The adventure capital of the world — bungee, ski, hike and jet-boat through the mountains.", attractions: ["Remarkables range","Milford Sound","Lake Wakatipu","Gondola ride"], food: ["Lamb","Whitebait fritters","Pavlova","Local pinot noir"], activities: ["Bungee jumping","Skiing","Jet-boating","Hiking"] },
  { id: 5,  name: "Havana",      country: "Cuba",         flag: "🇨🇺", region: "Americas", score: 85, costIndex: "Low",    costUSD: 55,  bestSeason: "Dec–Apr", img: "https://images.unsplash.com/photo-1519508234439-4f23643125c1?w=800&q=80", desc: "Colorful colonial streets, vintage American cars and infectious salsa rhythms fill the air.", attractions: ["Old Havana","Malecón","Revolution Square","El Morro castle"], food: ["Ropa vieja","Moros y Cristianos","Cuban sandwich","Mojito"], activities: ["Classic car tour","Salsa classes","Cigar factory","Street art walk"] },
  { id: 6,  name: "Chiang Mai",  country: "Thailand",     flag: "🇹🇭", region: "Asia",     score: 91, costIndex: "Low",    costUSD: 50,  bestSeason: "Nov–Feb", img: "https://images.unsplash.com/photo-1512553696564-8a1a38e78cef?w=800&q=80", desc: "Temples, elephant sanctuaries and legendary street food in Thailand's northern rose.", attractions: ["Doi Suthep temple","Elephant Nature Park","Sunday Walking Street","Old City moat"], food: ["Khao Soi","Pad Thai","Som tum","Mango sticky rice"], activities: ["Elephant sanctuary","Night markets","Thai massage","Cooking class"] },
  { id: 7,  name: "Cape Town",   country: "South Africa", flag: "🇿🇦", region: "Africa",   score: 96, costIndex: "Medium", costUSD: 110, bestSeason: "Nov–Mar", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80", desc: "Dramatic Table Mountain backdrop, world-class beaches and a vibrant arts and food scene.", attractions: ["Table Mountain","V&A Waterfront","Cape of Good Hope","Robben Island"], food: ["Braai","Boerewors","Bobotie","Cape Malay curry"], activities: ["Table Mountain hike","Wine tour","Whale watching","Surfing"] },
  { id: 8,  name: "Lisbon",      country: "Portugal",     flag: "🇵🇹", region: "Europe",   score: 93, costIndex: "Medium", costUSD: 100, bestSeason: "Apr–Jun", img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80", desc: "Hillside trams, pastel-coloured buildings and incredible seafood in Europe's sunniest capital.", attractions: ["Belém Tower","Alfama district","Jerónimos Monastery","Tram 28"], food: ["Pasteis de nata","Grilled sardines","Bacalhau","Ginjinha"], activities: ["Tram rides","Fado show","Sintra day trip","Surf lesson"] },
  { id: 9,  name: "Banff",       country: "Canada",       flag: "🇨🇦", region: "Americas", score: 95, costIndex: "High",   costUSD: 180, bestSeason: "Jun–Sep", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80", desc: "Turquoise glacial lakes and the most dramatic Rocky Mountain scenery in North America.", attractions: ["Lake Louise","Moraine Lake","Icefields Parkway","Sulphur Mountain"], food: ["Elk burger","Poutine","Alberta beef","Maple treats"], activities: ["Kayaking","Wildlife spotting","Hiking","Ski resort"] },
  { id: 10, name: "Bali",        country: "Indonesia",    flag: "🇮🇩", region: "Asia",     score: 93, costIndex: "Low",    costUSD: 65,  bestSeason: "Apr–Oct", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", desc: "Spiritual temples, emerald rice paddies and surf-ready beaches define the Island of the Gods.", attractions: ["Ubud Monkey Forest","Tanah Lot","Tegallalang terraces","Uluwatu temple"], food: ["Nasi goreng","Satay","Babi guling","Fresh coconut"], activities: ["Surfing","Yoga retreat","Temple tour","Rice terrace trek"] },
  { id: 11, name: "Barcelona",   country: "Spain",        flag: "🇪🇸", region: "Europe",   score: 95, costIndex: "Medium", costUSD: 130, bestSeason: "May–Jun", img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80", desc: "Gaudí's masterpieces, lively Las Ramblas, golden beaches and unmatched tapas culture.", attractions: ["Sagrada Família","Park Güell","La Boqueria","Gothic Quarter"], food: ["Patatas bravas","Pan con tomate","Paella","Cava"], activities: ["Architecture tours","Beach","Flamenco show","Tapas crawl"] },
  { id: 12, name: "Tokyo",       country: "Japan",        flag: "🇯🇵", region: "Asia",     score: 96, costIndex: "High",   costUSD: 190, bestSeason: "Mar–May", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", desc: "Neon-lit streets, ancient shrines, world-class sushi and cutting-edge technology collide.", attractions: ["Shibuya Crossing","Senso-ji temple","Shinjuku Gyoen","teamLab Borderless"], food: ["Sushi","Ramen","Yakitori","Wagyu beef"], activities: ["Robot restaurant","Tsukiji market","Anime shopping","Day trips to Nikko"] },
  { id: 13, name: "Amalfi",      country: "Italy",        flag: "🇮🇹", region: "Europe",   score: 94, costIndex: "High",   costUSD: 220, bestSeason: "May–Sep", img: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=800&q=80", desc: "Cliffside pastel villages, azure Mediterranean water and the world's most scenic coastal drive.", attractions: ["Positano village","Path of the Gods","Ravello gardens","Capri day trip"], food: ["Limoncello","Fresh pasta","Seafood","Mozzarella di bufala"], activities: ["Boat tour","Hiking","Kayaking","Limoncello tour"] },
  { id: 14, name: "Petra",       country: "Jordan",       flag: "🇯🇴", region: "Asia",     score: 91, costIndex: "Medium", costUSD: 90,  bestSeason: "Mar–May", img: "https://images.unsplash.com/photo-1518368926049-6b9ef7a5a852?w=800&q=80", desc: "The Rose City carved into rose-red cliffs — one of the world's greatest archaeological wonders.", attractions: ["The Treasury","Monastery","Siq gorge","High Place of Sacrifice"], food: ["Mansaf","Falafel","Hummus","Knafeh"], activities: ["Trekking","Petra by Night","Wadi Rum tour","Camel ride"] },
  { id: 15, name: "Maldives",    country: "Maldives",     flag: "🇲🇻", region: "Asia",     score: 98, costIndex: "High",   costUSD: 450, bestSeason: "Nov–Apr", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", desc: "Overwater bungalows, crystal-clear lagoons and the world's most pristine coral reefs.", attractions: ["Bioluminescent beach","Male city","Banana Reef dive","Whale shark snorkel"], food: ["Garudhiya","Mas huni","Freshly caught fish","Tropical fruit"], activities: ["Snorkelling","Diving","Sunset cruise","Seaplane tour"] },
  { id: 16, name: "Patagonia",   country: "Argentina",    flag: "🇦🇷", region: "Americas", score: 96, costIndex: "Medium", costUSD: 140, bestSeason: "Nov–Mar", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80", desc: "Wind-sculpted glaciers, soaring granite towers and endless Andean wilderness at the end of the world.", attractions: ["Torres del Paine","Perito Moreno glacier","Fitz Roy peak","Bariloche lakes"], food: ["Asado","Empanadas","Dulce de leche","Mate"], activities: ["Glacier trekking","Condor spotting","Multi-day hiking","Fly fishing"] },
];

const ACTIVITIES = [
  { id: 1, title: "Sunrise Yoga on the Beach", category: "Wellness", duration: "1h", cost: 25, rating: 4.9, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", desc: "Start the day with a mindful yoga session as the sun rises over the ocean." },
  { id: 2, title: "Street Food Walking Tour", category: "Food", duration: "3h", cost: 45, rating: 4.8, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", desc: "Sample a dozen local dishes with an expert foodie guide through the old city." },
  { id: 3, title: "Scuba Diving Adventure", category: "Adventure", duration: "4h", cost: 120, rating: 4.7, img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", desc: "Explore vibrant coral reefs and diverse marine life with certified instructors." },
  { id: 4, title: "Traditional Cooking Class", category: "Food", duration: "3h", cost: 65, rating: 4.9, img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", desc: "Learn to cook authentic local dishes using fresh market ingredients." },
  { id: 5, title: "Temple Cycling Tour", category: "Culture", duration: "5h", cost: 35, rating: 4.6, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", desc: "Pedal through ancient temple complexes and discover hidden spiritual sites." },
  { id: 6, title: "Sunset Sailing Cruise", category: "Leisure", duration: "2h", cost: 80, rating: 4.8, img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80", desc: "Glide across the water with cocktails as the sun dips below the horizon." },
  { id: 7, title: "Rock Climbing Experience", category: "Adventure", duration: "6h", cost: 95, rating: 4.5, img: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80", desc: "Scale scenic cliffs with full safety gear and experienced guides." },
  { id: 8, title: "Night Market Exploration", category: "Culture", duration: "2h", cost: 0, rating: 4.7, img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", desc: "Wander through a dazzling night market packed with crafts and flavors." },
];

const ITINERARY_DAYS = [
  { day: 1, date: "Jul 10", city: "Denpasar", activities: [
    { time: "09:00", name: "Arrive at Ngurah Rai Airport", cost: 0, type: "travel" },
    { time: "14:00", name: "Check in – Villa Seminyak", cost: 200, type: "stay" },
    { time: "18:00", name: "Sunset at Seminyak Beach", cost: 0, type: "activity" },
  ]},
  { day: 2, date: "Jul 11", city: "Ubud", activities: [
    { time: "08:00", name: "Tegallalang Rice Terraces", cost: 5, type: "activity" },
    { time: "12:00", name: "Lunch at Warung Local", cost: 12, type: "food" },
    { time: "15:00", name: "Sacred Monkey Forest", cost: 8, type: "activity" },
    { time: "19:30", name: "Dinner at COMO Shambhala", cost: 60, type: "food" },
  ]},
  { day: 3, date: "Jul 12", city: "Ubud", activities: [
    { time: "07:00", name: "Sunrise Yoga Class", cost: 25, type: "wellness" },
    { time: "11:00", name: "Traditional Cooking Class", cost: 65, type: "food" },
    { time: "17:00", name: "Tirta Empul Temple", cost: 15, type: "culture" },
    { time: "19:00", name: "Kecak Fire Dance", cost: 20, type: "culture" },
  ]},
];

const BUDGET_ITEMS = [
  { id: 1, date: "Jul 10", desc: "Return Flights", category: "Transport", amount: 680 },
  { id: 2, date: "Jul 10", desc: "Villa Seminyak (3 nights)", category: "Accommodation", amount: 600 },
  { id: 3, date: "Jul 11", desc: "Lunch at Warung", category: "Food", amount: 12 },
  { id: 4, date: "Jul 11", desc: "Rice Terraces entrance", category: "Activities", amount: 5 },
  { id: 5, date: "Jul 12", desc: "Cooking class", category: "Activities", amount: 65 },
  { id: 6, date: "Jul 12", desc: "Temple visit", category: "Activities", amount: 15 },
  { id: 7, date: "Jul 12", desc: "Kecak Dance show", category: "Activities", amount: 20 },
  { id: 8, date: "Jul 13", desc: "Scuba diving", category: "Activities", amount: 120 },
  { id: 9, date: "Jul 13", desc: "Local market shopping", category: "Shopping", amount: 85 },
  { id: 10, date: "Jul 14", desc: "Sunset cruise", category: "Activities", amount: 80 },
];

const PACKING_CATEGORIES = ["Documents", "Clothing", "Electronics", "Essentials"];
const PACKING_ITEMS_DATA = [
  { id: 1, name: "Passport", category: "Documents", packed: true },
  { id: 2, name: "Travel Insurance", category: "Documents", packed: true },
  { id: 3, name: "Flight Tickets", category: "Documents", packed: false },
  { id: 4, name: "Hotel Confirmations", category: "Documents", packed: false },
  { id: 5, name: "T-Shirts (×5)", category: "Clothing", packed: true },
  { id: 6, name: "Swimwear (×2)", category: "Clothing", packed: true },
  { id: 7, name: "Sandals", category: "Clothing", packed: false },
  { id: 8, name: "Light Jacket", category: "Clothing", packed: false },
  { id: 9, name: "Laptop", category: "Electronics", packed: false },
  { id: 10, name: "Phone Charger", category: "Electronics", packed: true },
  { id: 11, name: "Power Bank", category: "Electronics", packed: false },
  { id: 12, name: "Universal Adapter", category: "Electronics", packed: false },
  { id: 13, name: "Sunscreen SPF 50", category: "Essentials", packed: true },
  { id: 14, name: "First Aid Kit", category: "Essentials", packed: false },
  { id: 15, name: "Insect Repellent", category: "Essentials", packed: false },
  { id: 16, name: "Reusable Water Bottle", category: "Essentials", packed: true },
];

const NOTES_DATA = [
  { id: 1, tripId: 1, day: "Jul 10", title: "Arrival Thoughts", body: "The airport was surprisingly modern. The taxi driver was so friendly and shared great tips about hidden spots in Seminyak. The villa exceeded expectations — private pool and all.", ts: "2025-07-10 15:32" },
  { id: 2, tripId: 1, day: "Jul 11", title: "Ubud is Pure Magic", body: "Rice terraces were absolutely breathtaking. The morning mist made it feel surreal. Must try Nasi Goreng at the Warung next door to the guesthouse.", ts: "2025-07-11 20:15" },
  { id: 3, tripId: 2, day: "Sep 02", title: "Tokyo First Impressions", body: "The trains run like clockwork. Shibuya crossing was everything I imagined. The convenience store snacks are genuinely life-changing.", ts: "2025-09-02 22:00" },
];

const TESTIMONIALS = [
  { name: "Sarah Mitchell", location: "New York, USA", avatar: "SM", rating: 5, text: "Traveloop completely changed how I plan trips. The itinerary builder saved me hours and my Bali trip went flawlessly." },
  { name: "James Okafor", location: "London, UK", avatar: "JO", rating: 5, text: "The budget tracker alone is worth it. I stayed within budget for the first time ever on a 2-week Europe trip." },
  { name: "Priya Sharma", location: "Mumbai, India", avatar: "PS", rating: 5, text: "I've tried every travel app out there. Traveloop is the only one that feels like it was built for real travelers." },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS & MICRO-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const statusMeta = {
  upcoming: { color: "bg-blue-100 text-blue-700", label: "Upcoming" },
  ongoing: { color: "bg-green-100 text-green-700", label: "Ongoing" },
  completed: { color: "bg-gray-100 text-gray-600", label: "Completed" },
  draft: { color: "bg-amber-100 text-amber-700", label: "Draft" },
  past: { color: "bg-gray-100 text-gray-600", label: "Past" },
};

const typeColor = (t) => ({
  travel: "bg-sky-100 text-sky-700",
  stay: "bg-purple-100 text-purple-700",
  activity: "bg-green-100 text-green-700",
  food: "bg-amber-100 text-amber-700",
  wellness: "bg-pink-100 text-pink-700",
  culture: "bg-indigo-100 text-indigo-700",
})[t] || "bg-gray-100 text-gray-600";

const costBadge = (c) => ({
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
})[c] || "bg-gray-100 text-gray-600";

function Avatar({ name, size = 9 }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={`w-${size} h-${size} rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
      {initials}
    </div>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

function Stars({ count = 5 }) {
  return (
    <span className="text-yellow-400 text-sm">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function StatCard({ label, value, icon, sub, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition">
      <div className={`p-3 rounded-xl ${colors[color]} text-xl flex-shrink-0`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function ProgressBar({ value, max, color = "bg-blue-500", className = "" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={`w-full bg-gray-100 rounded-full h-2 ${className}`}>
      <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Modal({ open, onClose, title, children, size = "md" }) {
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function InputField({ label, type = "text", placeholder, icon, value, onChange, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border border-gray-200 rounded-xl py-3 pr-4 ${icon ? "pl-10" : "pl-4"} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white`}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "home",           label: "Home",             icon: "🌍" },
  { id: "dashboard",      label: "Dashboard",        icon: "🏠" },
  { id: "trips",          label: "My Trips",         icon: "🗺️" },
  { id: "createtrip",     label: "Create Trip",      icon: "✈️" },
  { id: "itinerary",      label: "Itinerary Builder",icon: "📋" },
  { id: "itinerary-view", label: "Itinerary View",   icon: "👁️" },
  { id: "cities",         label: "Explore Cities",   icon: "🏙️" },
  { id: "activities",     label: "Activities",       icon: "🎯" },
  { id: "budget",         label: "Budget",           icon: "💰" },
  { id: "packing",        label: "Packing List",     icon: "🧳" },
  { id: "journal",        label: "Travel Journal",   icon: "📓" },
  { id: "shared",         label: "Shared Trip",      icon: "🔗" },
  { id: "profile",        label: "Profile",          icon: "👤" },
  { id: "admin",          label: "Analytics",        icon: "📊" },
];

const NAV_GROUPS = [
  { label: null,       ids: ["home","dashboard"] },
  { label: "Planning", ids: ["trips","createtrip","itinerary","itinerary-view"] },
  { label: "Discover", ids: ["cities","activities"] },
  { label: "Manage",   ids: ["budget","packing","journal","shared"] },
  { label: "Account",  ids: ["profile","admin"] },
];

function Sidebar({ page, setPage, collapsed, setCollapsed }) {
  const navMap = Object.fromEntries(NAV.map(n => [n.id, n]));
  const w = collapsed ? 68 : 228;

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: w,
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        /* Premium frosted glass */
        background: "rgba(255,253,250,0.68)",
        backdropFilter: "blur(28px) saturate(1.4)",
        WebkitBackdropFilter: "blur(28px) saturate(1.4)",
        borderRight: "1px solid rgba(255,255,255,0.60)",
        boxShadow: "4px 0 24px rgba(100,110,160,0.08), 8px 0 48px rgba(100,110,160,0.04), inset -1px 0 0 rgba(255,255,255,0.45)",
        /* Prevent paint on every scroll */
        willChange: "width",
        contain: "layout style",
      }}
    >
      {/* Inner glass shine — top edge highlight */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"rgba(255,255,255,0.80)", pointerEvents:"none" }} />

      {/* ── Header ── */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "18px 0" : "18px 16px",
          borderBottom: "1px solid rgba(200,200,230,0.20)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 min-w-0" style={{ display: collapsed ? "flex" : "flex", justifyContent: collapsed ? "center" : "flex-start" }}>
          <div style={{ width:30, height:30, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0, background:"linear-gradient(135deg,#6366f1,#818cf8)", boxShadow:"0 2px 10px rgba(99,102,241,0.40)" }}>✈️</div>
          {!collapsed && <span style={{ fontWeight:900, color:"#111827", fontSize:14.5, letterSpacing:"-0.02em", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>Traveloop</span>}
        </div>
        {/* Collapse button */}
        {!collapsed && (
          <button onClick={() => setCollapsed(true)}
            style={{ width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#9ca3af", flexShrink:0, cursor:"pointer", border:"none", background:"transparent", transition:"all 0.2s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(99,102,241,0.08)"; e.currentTarget.style.color="#6366f1"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#9ca3af"; }}
            title="Collapse">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8.5 2L4 6.5l4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
      </div>

      {/* Expand button (collapsed mode) */}
      {collapsed && (
        <button onClick={() => setCollapsed(false)}
          style={{ margin:"8px auto 0", width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#9ca3af", cursor:"pointer", border:"none", background:"transparent", flexShrink:0, transition:"all 0.2s ease" }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(99,102,241,0.08)"; e.currentTarget.style.color="#6366f1"; }}
          onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#9ca3af"; }}
          title="Expand">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M4.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}

      {/* ── Navigation ── */}
      <nav style={{ flex:1, overflowY:"auto", overflowX:"hidden", padding:"8px 0", scrollbarWidth:"none", msOverflowStyle:"none" }}>
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} style={{ marginTop: gi > 0 ? 2 : 0 }}>
            {/* Group label */}
            {group.label && !collapsed && (
              <div style={{ padding:"12px 16px 2px" }}>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(99,102,241,0.45)" }}>{group.label}</span>
              </div>
            )}
            {group.label && collapsed && (
              <div style={{ margin:"6px 10px", height:1, background:"rgba(200,200,230,0.30)" }} />
            )}
            {group.ids.map(id => {
              const n = navMap[id];
              if (!n) return null;
              const active = page === n.id;
              return (
                <div key={n.id} style={{ padding: collapsed ? "2px 8px" : "2px 8px" }}>
                  <button
                    onClick={() => setPage(n.id)}
                    title={collapsed ? n.label : undefined}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: collapsed ? "center" : "flex-start",
                      gap: collapsed ? 0 : 9,
                      padding: collapsed ? "9px 0" : "8px 11px",
                      borderRadius: 12,
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      position: "relative",
                      transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                      /* Active: indigo gradient pill */
                      background: active
                        ? "linear-gradient(135deg,#6366f1 0%,#818cf8 100%)"
                        : "transparent",
                      boxShadow: active
                        ? "0 4px 16px rgba(99,102,241,0.28), inset 0 1px 0 rgba(255,255,255,0.20)"
                        : "none",
                      color: active ? "#ffffff" : "#4b5563",
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.background = "rgba(99,102,241,0.09)";
                        e.currentTarget.style.color = "#3730a3";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(99,102,241,0.10)";
                        const icon = e.currentTarget.querySelector(".nav-icon");
                        if (icon) icon.style.transform = "scale(1.15)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#4b5563";
                        e.currentTarget.style.boxShadow = "none";
                        const icon = e.currentTarget.querySelector(".nav-icon");
                        if (icon) icon.style.transform = "scale(1)";
                      }
                    }}
                  >
                    {/* Icon */}
                    <span className="nav-icon" style={{
                      flexShrink: 0,
                      fontSize: active ? 16 : 14,
                      lineHeight: 1,
                      transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), font-size 0.2s ease",
                      filter: active ? "drop-shadow(0 1px 3px rgba(0,0,0,0.18))" : "none",
                      transform: "scale(1)",
                    }}>{n.icon}</span>
                    {/* Label */}
                    {!collapsed && (
                      <span style={{
                        fontSize: 12.5,
                        fontWeight: active ? 700 : 500,
                        letterSpacing: active ? "-0.01em" : "normal",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        transition: "color 0.2s ease",
                      }}>{n.label}</span>
                    )}
                    {/* Active dot (collapsed) */}
                    {collapsed && active && (
                      <span style={{ position:"absolute", right:4, top:"50%", transform:"translateY(-50%)", width:5, height:5, borderRadius:"50%", background:"#a5b4fc" }} />
                    )}
                    {/* Active left bar indicator (expanded) */}
                    {!collapsed && active && (
                      <span style={{ position:"absolute", left:-8, top:"20%", bottom:"20%", width:3, borderRadius:4, background:"rgba(255,255,255,0.60)" }} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Profile card ── */}
      <div style={{ flexShrink:0, padding:8, borderTop:"1px solid rgba(200,200,230,0.22)" }}>
        {collapsed ? (
          <button onClick={() => setPage("profile")} title="Profile"
            style={{ width:36, height:36, borderRadius:12, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12, color:"#fff", cursor:"pointer", border:"none", background:"linear-gradient(135deg,#6366f1,#818cf8)", boxShadow:"0 2px 8px rgba(99,102,241,0.32)", transition:"transform 0.2s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.08)"}
            onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
            AS
          </button>
        ) : (
          <button onClick={() => setPage("profile")}
            style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px", borderRadius:16, border:"1px solid rgba(255,255,255,0.55)", cursor:"pointer", textAlign:"left", background:"rgba(255,255,255,0.55)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", boxShadow:"0 1px 6px rgba(100,110,160,0.10)", transition:"all 0.25s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.88)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(99,102,241,0.14)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.55)"; e.currentTarget.style.boxShadow="0 1px 6px rgba(100,110,160,0.10)"; }}>
            <div style={{ width:32, height:32, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:12, flexShrink:0, background:"linear-gradient(135deg,#6366f1,#a78bfa)", boxShadow:"0 2px 6px rgba(99,102,241,0.30)", transition:"transform 0.2s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>AS</div>
            <div style={{ minWidth:0, flex:1 }}>
              <p style={{ fontSize:12.5, fontWeight:600, color:"#1f2937", margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", lineHeight:1.3 }}>Aryan Shah</p>
              <p style={{ fontSize:11, color:"#9ca3af", margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", lineHeight:1.3 }}>aryan@email.com</p>
            </div>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ flexShrink:0, color:"#d1d5db" }}>
              <path d="M4 2l3 3.5L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Bottom glass shine */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"rgba(255,255,255,0.50)", pointerEvents:"none" }} />
    </aside>
  );
}

function Topbar({ title, setPage, page }) {
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input placeholder="Search anything..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 w-52" />
        </div>
        <div className="relative">
          <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 relative transition">
            🔔
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-2xl shadow-xl w-72 p-4 z-50">
              <p className="font-semibold text-gray-900 mb-3 text-sm">Notifications</p>
              {[
                { icon: "✈️", text: "Bali Escape starts in 12 days!", time: "2h ago" },
                { icon: "💰", text: "Budget alert: 80% used on Bali trip", time: "1d ago" },
                { icon: "🎉", text: "Paris trip marked as completed", time: "3d ago" },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-lg">{n.icon}</span>
                  <div>
                    <p className="text-xs text-gray-700">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => setPage("profile")} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-xs">AS</div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">Aryan</span>
        </button>
      </div>
    </header>
  );
}

const PAGE_TITLES = {
  dashboard: "Dashboard", trips: "My Trips", createtrip: "Create New Trip",
  itinerary: "Itinerary Builder", "itinerary-view": "Itinerary View",
  cities: "Explore Cities", activities: "Find Activities", budget: "Budget Tracker",
  packing: "Packing Checklist", journal: "Travel Journal", shared: "Shared Trip",
  profile: "Profile & Settings", admin: "Analytics",
};

// ─────────────────────────────────────────────────────────────────────────────
// CINEMATIC PAGE BACKGROUND SYSTEM
// ─────────────────────────────────────────────────────────────────────────────
const PAGE_BG = {
  dashboard:        { src:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2560&q=85", pos:"center 30%",  brightness:0.62 },
  trips:            { src:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=2560&q=85", pos:"center 40%",  brightness:0.58 },
  createtrip:       { src:"https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2560&q=85", pos:"center 55%",  brightness:0.60 },
  itinerary:        { src:"https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=2560&q=85", pos:"center 45%",  brightness:0.60 },
  "itinerary-view": { src:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2560&q=85", pos:"center 40%",  brightness:0.62 },
  cities:           { src:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=2560&q=85", pos:"center 35%",  brightness:0.58 },
  activities:       { src:"https://images.unsplash.com/photo-1551632811-561732d1e306?w=2560&q=85", pos:"center 50%",  brightness:0.60 },
  budget:           { src:"https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=2560&q=85", pos:"center 45%",  brightness:0.62 },
  packing:          { src:"https://images.unsplash.com/photo-1581553680321-4fffae59b989?w=2560&q=85", pos:"center 45%",  brightness:0.60 },
  journal:          { src:"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=2560&q=85", pos:"center 50%",  brightness:0.60 },
  shared:           { src:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=2560&q=85", pos:"center 40%",  brightness:0.58 },
  profile:          { src:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=2560&q=85", pos:"center 35%",  brightness:0.62 },
  admin:            { src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2560&q=85", pos:"center 40%",  brightness:0.58 },
  home:             { src:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2560&q=85", pos:"center 30%",  brightness:0.58 },
};

function PageBackground({ page }) {
  const bg = PAGE_BG[page] || PAGE_BG.dashboard;
  return (
    <div className="page-bg" aria-hidden="true">
      {/* Photo — bright & saturated for daylight feel */}
      <img
        src={bg.src}
        alt=""
        className="kb"
        loading="lazy"
        style={{ objectPosition: bg.pos, filter: `brightness(${bg.brightness}) saturate(0.90)` }}
      />
      {/* Very soft warm white wash — keeps it bright, not dark */}
      <div className="absolute inset-0" style={{ background:"rgba(255,252,248,0.18)" }} />
      {/* Soft warm golden tint from top-right (sun direction) */}
      <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse 70% 50% at 85% 0%, rgba(255,230,180,0.22) 0%, transparent 60%)" }} />
      {/* Gentle bottom-edge light fade so cards sit on a slightly brighter floor */}
      <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(255,255,255,0.20) 0%, transparent 40%)" }} />
      {/* Soft top-edge fade so the header merges cleanly */}
      <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 20%)" }} />
      {/* Very subtle edge vignette — just takes harsh edges off */}
      <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse 120% 100% at 50% 50%, transparent 55%, rgba(200,210,230,0.25) 100%)" }} />
    </div>
  );
}

function Layout({ page, setPage, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = PAGE_TITLES[page] || "Traveloop";
  const sideW = collapsed ? 68 : 228;

  return (
    <div className="font-sans" style={{ minHeight:"100vh", background:"#e8edf5" }}>
      {/* ── Fixed cinematic background (behind everything) ── */}
      <PageBackground page={page} />

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background:"rgba(15,12,41,0.45)", backdropFilter:"blur(4px)", WebkitBackdropFilter:"blur(4px)", transition:"opacity 0.3s ease" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar — always fixed, never scrolls ── */}
      {/* Desktop: always visible */}
      <div className="hidden md:block" style={{ position:"fixed", top:0, left:0, bottom:0, zIndex:40, width:sideW, transition:"width 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
        <Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Mobile: slide-in drawer */}
      <div
        className="md:hidden"
        style={{ position:"fixed", top:0, left:0, bottom:0, zIndex:50, width:228, transform: mobileOpen ? "translateX(0)" : "translateX(-100%)", transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)" }}
      >
        <Sidebar page={page} setPage={(p) => { setPage(p); setMobileOpen(false); }} collapsed={false} setCollapsed={() => {}} />
      </div>

      {/* ── Main content — offset by sidebar width on desktop ── */}
      <div
        className="flex flex-col min-h-screen"
        style={{ marginLeft: 0, transition:"margin-left 0.3s cubic-bezier(0.4,0,0.2,1)" }}
      >
        {/* Apply margin only on md+ via inline media — we use a wrapper trick */}
        <style>{`@media(min-width:768px){.main-offset{margin-left:${sideW}px !important}}`}</style>
        <div className="main-offset flex flex-col min-h-screen">
          {/* ── Top header bar (sticky) ── */}
          <header
            className="sticky top-0 z-20"
            style={{ background:"rgba(255,253,250,0.80)", backdropFilter:"blur(22px) saturate(1.3)", WebkitBackdropFilter:"blur(22px) saturate(1.3)", borderBottom:"1px solid rgba(255,255,255,0.60)", boxShadow:"0 1px 0 rgba(255,255,255,0.85), 0 4px 20px rgba(100,110,160,0.08)" }}
          >
            <div className="px-4 md:px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Mobile menu button */}
                <button
                  className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 transition-all duration-200"
                  style={{ background:"transparent" }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(99,102,241,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}
                  onClick={() => setMobileOpen(true)}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                </button>
                <h1 style={{ fontSize:15, fontWeight:700, color:"#111827", letterSpacing:"-0.01em" }}>{title}</h1>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="relative hidden md:block">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                  <input
                    placeholder="Search..."
                    className="pl-9 pr-4 py-[7px] rounded-xl text-[13px] w-48 text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-200"
                    style={{ background:"rgba(255,255,255,0.65)", border:"1px solid rgba(99,102,241,0.15)" }}
                    onFocus={e => { e.currentTarget.style.background="rgba(255,255,255,0.95)"; e.currentTarget.style.boxShadow="0 0 0 2px rgba(99,102,241,0.20)"; }}
                    onBlur={e => { e.currentTarget.style.background="rgba(255,255,255,0.65)"; e.currentTarget.style.boxShadow="none"; }}
                  />
                </div>
                <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 transition-all duration-200"
                  onMouseEnter={e => e.currentTarget.style.background="rgba(99,102,241,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                  🔔<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>
                <button onClick={() => setPage("profile")}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl transition-all duration-200"
                  onMouseEnter={e => e.currentTarget.style.background="rgba(99,102,241,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ background:"linear-gradient(135deg,#6366f1,#818cf8)" }}>AS</div>
                  <span className="text-[13px] font-semibold text-gray-700 hidden sm:block">Aryan</span>
                </button>
              </div>
            </div>
          </header>

          {/* ── Page content ── */}
          <main className="flex-1 overflow-auto p-4 md:p-6 relative z-10 page-enter">{children}</main>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH PAGES
// ─────────────────────────────────────────────────────────────────────────────
function AuthLayout({ children, title, sub }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/10"
              style={{ width: `${(i + 1) * 150}px`, height: `${(i + 1) * 150}px`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          ))}
        </div>
        {/* Background destination cards */}
        <div className="absolute top-8 right-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 w-44 text-white">
          <p className="text-2xl mb-1">🏝️</p>
          <p className="font-bold text-sm">Bali, Indonesia</p>
          <p className="text-white/70 text-xs">7 nights · $1,400</p>
        </div>
        <div className="absolute bottom-24 left-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 w-44 text-white">
          <p className="text-2xl mb-1">🗼</p>
          <p className="font-bold text-sm">Paris, France</p>
          <p className="text-white/70 text-xs">5 nights · $2,200</p>
        </div>
        <div className="relative text-center text-white">
          <div className="text-5xl mb-4">✈️</div>
          <h2 className="text-3xl font-bold mb-3">Start Your Journey</h2>
          <p className="text-blue-200 text-base max-w-xs mx-auto">Your personalized travel companion. Build beautiful itineraries in minutes.</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[["🗺️", "500+", "Destinations"], ["📋", "10K+", "Itineraries"], ["⭐", "4.9", "Rating"]].map(([icon, n, l]) => (
              <div key={l} className="bg-white/10 backdrop-blur rounded-2xl p-3">
                <div className="text-xl mb-1">{icon}</div>
                <div className="font-bold">{n}</div>
                <div className="text-blue-200 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-xl text-gray-900">Traveloop</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
          <p className="text-gray-500 mb-8 text-sm">{sub}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

function SocialBtn({ icon, label }) {
  return (
    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium text-gray-700">
      <span>{icon}</span> {label}
    </button>
  );
}

function LoginPage({ setPage }) {
  const [showPass, setShowPass] = useState(false);
  return (
    <AuthLayout title="Welcome back" sub="Sign in to continue planning your adventures">
      <div className="flex gap-3 mb-5">
        <SocialBtn icon="🔵" label="Google" />
        <SocialBtn icon="⚫" label="Apple" />
      </div>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or continue with email</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <InputField label="Email address" type="email" placeholder="you@example.com" icon="📧" />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
          <input type={showPass ? "text" : "password"} placeholder="••••••••"
            className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition" />
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{showPass ? "Hide" : "Show"}</button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" className="rounded border-gray-300" /> Remember me
        </label>
        <button onClick={() => setPage("forgot")} className="text-sm text-blue-600 hover:underline">Forgot password?</button>
      </div>
      <button onClick={() => setPage("dashboard")}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.98] transition mb-4">
        Sign In
      </button>
      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <button onClick={() => setPage("signup")} className="text-blue-600 font-medium hover:underline">Sign up free</button>
      </p>
    </AuthLayout>
  );
}

function SignupPage({ setPage }) {
  const [pass, setPass] = useState("");
  const strength = pass.length === 0 ? 0 : pass.length < 6 ? 1 : pass.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Medium", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-green-500"][strength];
  return (
    <AuthLayout title="Create your account" sub="Start planning your dream trips today">
      <div className="flex gap-3 mb-5">
        <SocialBtn icon="🔵" label="Google" />
        <SocialBtn icon="⚫" label="Apple" />
      </div>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or sign up with email</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="flex gap-3">
        <InputField label="First Name" placeholder="John" className="flex-1" />
        <InputField label="Last Name" placeholder="Doe" className="flex-1" />
      </div>
      <InputField label="Email" type="email" placeholder="you@example.com" icon="📧" />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
          <input type="password" placeholder="Min 8 characters" value={pass} onChange={(e) => setPass(e.target.value)}
            className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition" />
        </div>
        {pass.length > 0 && (
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i <= strength ? strengthColor : "bg-gray-200"}`} />
              ))}
            </div>
            <p className="text-xs text-gray-500">Strength: <span className={`font-medium ${strength === 3 ? "text-green-600" : strength === 2 ? "text-yellow-600" : "text-red-500"}`}>{strengthLabel}</span></p>
          </div>
        )}
      </div>
      <InputField label="Confirm Password" type="password" placeholder="Repeat password" icon="🔒" />
      <button onClick={() => setPage("dashboard")}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.98] transition mb-3 mt-1">
        Create Account
      </button>
      <p className="text-center text-xs text-gray-400 mb-3">
        By signing up, you agree to our <span className="text-blue-600 cursor-pointer">Terms</span> &amp; <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
      </p>
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button onClick={() => setPage("login")} className="text-blue-600 font-medium hover:underline">Sign in</button>
      </p>
    </AuthLayout>
  );
}

function ForgotPage({ setPage }) {
  const [sent, setSent] = useState(false);
  return (
    <AuthLayout title="Reset password" sub="We'll send you a reset link to your inbox">
      {sent ? (
        <div className="text-center py-6">
          <div className="text-5xl mb-4">📬</div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Check your email</h3>
          <p className="text-gray-500 text-sm mb-6">We've sent reset instructions to your email address.</p>
          <button onClick={() => setPage("login")} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Back to Sign In
          </button>
        </div>
      ) : (
        <>
          <InputField label="Email address" type="email" placeholder="you@example.com" icon="📧" />
          <button onClick={() => setSent(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition mb-4 mt-1">
            Send Reset Link
          </button>
          <button onClick={() => setPage("login")} className="w-full py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            ← Back to Login
          </button>
        </>
      )}
    </AuthLayout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRENDING DESTINATIONS 3D FAN CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────
const TRENDING_DESTINATIONS = [
  {
    id: 1,
    name: "Golden Dunes",
    location: "Morocco, Drâa-Tafilalet, Merzouga",
    desc: "Endless golden sand dunes offering unforgettable sunsets and stellar stargazing. A unique destination for road trips.",
    img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80",
    distance: "2700 M",
    temp: "37°F",
    rating: 4.7,
    price: 1320,
  },
  {
    id: 2,
    name: "Sunset Cliffs",
    location: "USA, California, Big Sur",
    desc: "Dramatic ocean cliffs with panoramic views and coastal roads. A dream destination for road trips.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    distance: "7500 M",
    temp: "18°F",
    rating: 4.95,
    price: 1670,
  },
  {
    id: 3,
    name: "Azure Coast",
    location: "France, Alpes-Côte d'Azur, Nice",
    desc: "A stunning Mediterranean coastline with crystal-clear waters and charming seaside towns. Perfect for relaxing vacations and scenic walks.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    distance: "762 M",
    temp: "22°F",
    rating: 4.9,
    price: 1195,
  },
  {
    id: 4,
    name: "Royal Sand Bay",
    location: "UAE, Dubai, Jumeirah Coast",
    desc: "Pristine beaches combined with modern city life and desert adventures. A premium travel destination.",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    distance: "5900 M",
    temp: "34°F",
    rating: 4.78,
    price: 1770,
  },
  {
    id: 5,
    name: "Coral Wind Island",
    location: "Philippines, Palawan, El Nido",
    desc: "Turquoise lagoons surrounded by coral reefs, clear diving waters and untouched tropical scenery.",
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    distance: "8300 M",
    temp: "27°F",
    rating: 5,
    price: 890,
  },
];

function TrendingCarousel({ setPage }) {
  const [active, setActive] = useState(2); // start centered (index 2 of 5)
  const total = TRENDING_DESTINATIONS.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // offset = position relative to active card
  const getOffset = (idx) => {
    let off = idx - active;
    if (off > total / 2) off -= total;
    if (off < -total / 2) off += total;
    return off;
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Cinematic background — aerial mountain ridges at dusk */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2560&q=85"
          alt="" aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.30) saturate(0.75)" }}
        />
        {/* warm amber haze — sun at horizon */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 40% at 50% 80%, rgba(180,90,10,0.25) 0%, transparent 65%)" }} />
        {/* top & bottom atmospheric fade */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,3,1,0.6) 0%, transparent 20%, transparent 75%, rgba(5,3,1,0.65) 100%)" }} />
        {/* world map ghost at extreme low opacity */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-screen pointer-events-none"
          style={{ backgroundImage:"url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2560px-World_map_-_low_resolution.svg.png')", backgroundSize:"cover", backgroundPosition:"center", filter:"saturate(0)" }} />
      </div>
      {/* warm orb */}
      <div className="absolute pointer-events-none" style={{ top:"30%", left:"50%", transform:"translateX(-50%)", width:900, height:300, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(251,146,60,0.07) 0%,transparent 70%)", filter:"blur(32px)" }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-2">Discover the World</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Trending Destinations</h2>
          <p className="text-gray-400 text-base">Explore what's popular among travelers right now</p>
        </div>

        {/* Carousel stage */}
        <div className="relative h-[520px] flex items-center justify-center" style={{ perspective: "1200px" }}>
          {TRENDING_DESTINATIONS.map((dest, idx) => {
            const off = getOffset(idx);
            const absOff = Math.abs(off);
            if (absOff > 2) return null; // only render visible cards

            const isActive = off === 0;
            // Position, scale, rotation, opacity per offset slot
            const configs = {
              "-2": { x: -480, scale: 0.68, rotateY: 28, z: -280, opacity: 0.55 },
              "-1": { x: -250, scale: 0.82, rotateY: 16, z: -120, opacity: 0.8 },
               "0": { x: 0,    scale: 1,    rotateY: 0,  z: 0,    opacity: 1 },
               "1": { x: 250,  scale: 0.82, rotateY: -16, z: -120, opacity: 0.8 },
               "2": { x: 480,  scale: 0.68, rotateY: -28, z: -280, opacity: 0.55 },
            };
            const cfg = configs[String(off)] || { x: 0, scale: 0, rotateY: 0, z: -400, opacity: 0 };

            return (
              <div
                key={dest.id}
                onClick={() => !isActive && setActive(idx)}
                style={{
                  position: "absolute",
                  transform: `translateX(${cfg.x}px) translateZ(${cfg.z}px) rotateY(${cfg.rotateY}deg) scale(${cfg.scale})`,
                  opacity: cfg.opacity,
                  transition: "all 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  zIndex: 10 - absOff,
                  cursor: isActive ? "default" : "pointer",
                  width: "280px",
                }}
              >
                <div className={`rounded-3xl overflow-hidden shadow-2xl ${isActive ? "shadow-blue-500/20" : ""}`}
                  style={{ background: isActive ? "#ffffff" : "#1e1e2e", border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                    {!isActive && <div className="absolute inset-0 bg-black/30" />}
                  </div>

                  {/* Content */}
                  <div className={`p-5 ${isActive ? "text-gray-900" : "text-white"}`}>
                    <h3 className={`font-bold text-lg leading-tight ${isActive ? "text-gray-900" : "text-white"}`}>{dest.name}</h3>
                    <p className={`text-xs mt-0.5 flex items-center gap-1 ${isActive ? "text-gray-500" : "text-gray-400"}`}>
                      <span>📍</span>{dest.location}
                    </p>

                    {isActive && (
                      <>
                        <div className="mt-3 mb-3">
                          <p className={`text-xs font-semibold mb-1 ${isActive ? "text-gray-800" : "text-gray-200"}`}>Description</p>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{dest.desc}</p>
                        </div>
                      </>
                    )}

                    {!isActive && (
                      <p className="text-xs text-gray-400 leading-relaxed mt-2 line-clamp-2">{dest.desc}</p>
                    )}

                    {/* Stats row */}
                    <div className={`flex items-center justify-between mt-3 pt-3 ${isActive ? "border-t border-gray-100" : "border-t border-white/10"}`}>
                      <div className="text-center">
                        <p className={`text-[10px] font-medium ${isActive ? "text-gray-400" : "text-gray-500"}`}>Distance</p>
                        <p className={`text-xs font-bold ${isActive ? "text-cyan-600" : "text-cyan-400"}`}>{dest.distance}</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-[10px] font-medium ${isActive ? "text-gray-400" : "text-gray-500"}`}>Temp</p>
                        <p className={`text-xs font-bold ${isActive ? "text-cyan-600" : "text-cyan-400"}`}>{dest.temp}</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-[10px] font-medium ${isActive ? "text-gray-400" : "text-gray-500"}`}>Rating</p>
                        <p className={`text-xs font-bold ${isActive ? "text-cyan-600" : "text-cyan-400"}`}>{dest.rating}</p>
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-end justify-between mt-4">
                      <div>
                        <p className={`text-[10px] font-medium ${isActive ? "text-gray-400" : "text-gray-500"}`}>Total Price</p>
                        <p className={`text-xl font-black ${isActive ? "text-gray-900" : "text-white"}`}>€{dest.price}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setPage("cities"); }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg transition hover:scale-110 ${
                          isActive
                            ? "bg-gray-900 text-white hover:bg-gray-700"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        ✈️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows + dots */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button onClick={prev}
            className="w-11 h-11 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition flex items-center justify-center text-lg backdrop-blur-sm">
            ‹
          </button>
          <div className="flex gap-2">
            {TRENDING_DESTINATIONS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all ${i === active ? "w-6 h-2.5 bg-amber-400" : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50"}`} />
            ))}
          </div>
          <button onClick={next}
            className="w-11 h-11 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition flex items-center justify-center text-lg backdrop-blur-sm">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────
const HERO_CARDS = [
  { city: "Cape Town", country: "South Africa", desc: "A vibrant city with stunning mountain backdrops and world-class beaches.", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80" },
  { city: "Santorini", country: "Greece", desc: "A picturesque Greek island perched above the volcanic caldera.", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80" },
  { city: "Banff", country: "Canada", desc: "Turquoise glacier lakes amid dramatic Rocky Mountain scenery.", img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&q=80" },
];

function LandingPage({ setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const parallaxRef = useRef(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Lightweight parallax — only moves the hero image
  useEffect(() => {
    const img = document.getElementById("hero-parallax-img");
    if (!img) return;
    const onScroll = () => {
      const y = window.scrollY;
      img.style.transform = `scale(1.08) translateY(${y * 0.28}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-sans">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">✈️</span>
            <span className={`font-bold text-lg tracking-tight ${scrolled ? "text-gray-900" : "text-white"}`}>Traveloop</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Explore", "Flights", "Hotels", "About"].map((l) => (
              <span key={l} className={`text-sm font-medium cursor-pointer hover:opacity-70 transition ${scrolled ? "text-gray-700" : "text-white"}`}>{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setPage("login")} className={`text-sm font-medium transition ${scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-white/80"}`}>
              Sign In
            </button>
            <button onClick={() => setPage("signup")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${scrolled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white/15 backdrop-blur border border-white/30 text-white hover:bg-white/25"}`}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* ── Cinematic background: lush mountain valley at golden hour ── */}
        <div className="absolute inset-0" id="hero-bg">
          {/* Primary hero landscape — Dolomites / alpine valley at sunrise */}
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2560&q=90"
            alt="Cinematic mountain landscape"
            className="w-full h-full object-cover object-center"
            style={{ transform: "scale(1.08)", transformOrigin: "center center" }}
            id="hero-parallax-img"
          />
          {/* Layer 1: top vignette — keeps nav readable */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 30%, transparent 55%)" }} />
          {/* Layer 2: warm golden-hour tint from the right (sun side) */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(180,100,20,0.18) 70%, rgba(220,140,30,0.22) 100%)" }} />
          {/* Layer 3: atmospheric haze on distant mountains (bottom 40%) */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(30,20,10,0.35) 75%, rgba(10,8,4,0.75) 100%)" }} />
          {/* Layer 4: subtle volumetric light ray from upper-right */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 10%, rgba(255,200,80,0.10) 0%, transparent 60%)" }} />
          {/* Layer 5: left-edge soft shadow for depth */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.28) 0%, transparent 35%)" }} />
        </div>
        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-[0.2em] uppercase drop-shadow-lg mb-6 animate-fade-in">
            Traveloop
          </h1>
          <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
            Plan, organize and share your perfect trips — all in one place.
          </p>
          {/* Search Bar */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-full px-6 py-4 flex items-center gap-4 max-w-2xl mx-auto mb-4 shadow-2xl">
            <span className="text-white/70 text-lg flex-shrink-0">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Discover your destination..."
              className="flex-1 bg-transparent text-white placeholder-white/60 text-base focus:outline-none"
            />
            <button onClick={() => setPage("cities")} className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition flex-shrink-0">
              Explore
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 text-white/60 text-xs mb-16">
            {["🏝️ Beach", "🏔️ Mountains", "🏛️ Culture", "🍜 Food"].map((t) => (
              <button key={t} className="hover:text-white transition">{t}</button>
            ))}
          </div>
        </div>

        {/* Destination Cards floating at bottom */}
        <div className="relative z-10 w-full px-4 pb-12 flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl w-full justify-center">
            {HERO_CARDS.map((c) => (
              <div key={c.city} onClick={() => setPage("cities")}
                className="backdrop-blur-lg bg-black/30 border border-white/20 rounded-2xl p-5 w-full sm:w-[280px] hover:bg-black/45 transition-all duration-300 cursor-pointer group">
                <div className="w-full h-24 rounded-xl overflow-hidden mb-3">
                  <img src={c.img} alt={c.city} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <p className="text-xl font-bold text-white">{c.city}</p>
                <p className="text-sm text-white/70 mb-1">{c.country}</p>
                <p className="text-xs text-white/60 line-clamp-2">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN YOUR PERFECT TRIP — cinematic nature background ── */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Fixed cinematic background — misty forest valley */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2560&q=85"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.38) saturate(0.85)" }}
          />
          {/* warm golden-hour glow from top-right */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 75% 0%, rgba(200,130,30,0.22) 0%, transparent 60%)" }} />
          {/* atmospheric fog layer at bottom */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,6,2,0.45) 0%, transparent 30%, transparent 65%, rgba(5,3,1,0.7) 100%)" }} />
          {/* subtle vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
        </div>
        {/* ambient orbs on top of photo */}
        <div className="absolute pointer-events-none" style={{ top:"8%", left:"5%", width:520, height:520, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 65%)", filter:"blur(48px)" }} />
        <div className="absolute pointer-events-none" style={{ top:"15%", right:"4%", width:440, height:440, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 65%)", filter:"blur(48px)" }} />
        <div className="absolute pointer-events-none" style={{ bottom:"10%", left:"50%", transform:"translateX(-50%)", width:600, height:300, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(14,165,233,0.08) 0%,transparent 70%)", filter:"blur(40px)" }} />
        {/* dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.035) 1px,transparent 1px)", backgroundSize:"32px 32px" }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-5 border" style={{ background:"rgba(139,92,246,0.12)", borderColor:"rgba(139,92,246,0.35)", color:"rgba(196,181,253,1)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
              AI-Powered Trip Planning
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5">
              Plan Your{" "}
              <span style={{ background:"linear-gradient(90deg,#a78bfa,#c084fc,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Perfect Trip
              </span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color:"rgba(196,181,253,0.7)" }}>
              Everything you need to craft unforgettable journeys — from first idea to final memory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { icon:"🗺️", title:"Multi-City Itineraries", desc:"Plan complex trips across multiple destinations with smart routing and time-slot management.", grad:"rgba(139,92,246,0.14)", border:"rgba(139,92,246,0.3)", glow:"rgba(139,92,246,0.4)", tag:"500+ destinations" },
              { icon:"💰", title:"Smart Budget Tracking", desc:"Real-time expense breakdowns, currency conversion and overspend alerts keep your wallet on track.", grad:"rgba(16,185,129,0.11)", border:"rgba(16,185,129,0.28)", glow:"rgba(16,185,129,0.35)", tag:"$2M+ tracked" },
              { icon:"🧭", title:"Activity Discovery", desc:"AI-curated experiences for every taste — from hidden street-food alleys to adrenaline adventures.", grad:"rgba(14,165,233,0.11)", border:"rgba(14,165,233,0.28)", glow:"rgba(14,165,233,0.35)", tag:"10K+ activities" },
              { icon:"👥", title:"Collaborative Planning", desc:"Invite travel companions, vote on spots and build your perfect shared itinerary in real time.", grad:"rgba(244,63,94,0.11)", border:"rgba(244,63,94,0.28)", glow:"rgba(244,63,94,0.35)", tag:"50K+ groups" },
            ].map((f) => (
              <div key={f.title} className="group relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 cursor-default"
                style={{ background:`linear-gradient(135deg,${f.grad},rgba(255,255,255,0.02))`, border:`1px solid ${f.border}`, backdropFilter:"blur(12px)" }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow:`0 0 40px ${f.glow}, inset 0 0 30px rgba(255,255,255,0.015)` }} />
                <div className="relative">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{f.icon}</div>
                  <h3 className="font-bold text-white text-base mb-2 leading-snug">{f.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color:"rgba(196,181,253,0.6)" }}>{f.desc}</p>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background:"rgba(255,255,255,0.06)", color:"rgba(196,181,253,0.8)" }}>{f.tag}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value:"500+", label:"Destinations", icon:"🌍" },
              { value:"10K+", label:"Itineraries Built", icon:"📋" },
              { value:"50K+", label:"Happy Travelers", icon:"😊" },
              { value:"4.9 ★", label:"Avg. Rating", icon:"⭐" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-5 text-center"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", backdropFilter:"blur(8px)" }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color:"rgba(196,181,253,0.6)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING DESTINATIONS — 3D Fan Carousel */}
      <TrendingCarousel setPage={setPage} />

      {/* ── HOW IT WORKS — cinematic valley at twilight ── */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=2560&q=85"
            alt="" aria-hidden="true"
            className="w-full h-full object-cover object-bottom"
            style={{ filter: "brightness(0.28) saturate(0.8)" }}
          />
          {/* cool blue twilight tint */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,4,15,0.55) 0%, transparent 25%, transparent 70%, rgba(3,2,10,0.65) 100%)" }} />
          {/* soft cyan volumetric glow from sky */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 40% at 50% 5%, rgba(14,100,180,0.18) 0%, transparent 60%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.5) 100%)" }} />
        </div>
        <div className="absolute pointer-events-none" style={{ top:"20%", left:"50%", transform:"translateX(-50%)", width:700, height:400, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(14,165,233,0.09) 0%,transparent 70%)", filter:"blur(50px)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize:"32px 32px" }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-5 border" style={{ background:"rgba(14,165,233,0.1)", borderColor:"rgba(14,165,233,0.3)", color:"rgba(125,211,252,1)" }}>
              🚀 Simple 3-Step Process
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">How Traveloop Works</h2>
            <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color:"rgba(196,181,253,0.65)" }}>
              From dream destination to departure in three effortless steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-14 left-[18%] right-[18%] h-px pointer-events-none"
              style={{ background:"linear-gradient(90deg,transparent,rgba(139,92,246,0.6) 20%,rgba(99,102,241,0.6) 50%,rgba(14,165,233,0.6) 80%,transparent)" }} />
            {[
              { step:"01", icon:"📁", title:"Create",  desc:"Start a trip, add destinations and set travel dates in minutes.", cA:"#7c3aed", cB:"#a855f7", glow:"rgba(139,92,246,0.5)" },
              { step:"02", icon:"📅", title:"Plan",    desc:"Build a day-by-day itinerary, track your budget and prep your packing list.", cA:"#4338ca", cB:"#6366f1", glow:"rgba(99,102,241,0.5)" },
              { step:"03", icon:"✈️", title:"Go",      desc:"Export, share with your crew and enjoy every moment with Traveloop.", cA:"#0369a1", cB:"#0ea5e9", glow:"rgba(14,165,233,0.5)" },
            ].map((s) => (
              <div key={s.step} className="group relative text-center">
                <div className="text-[11px] font-black tracking-widest mb-3" style={{ color:"rgba(255,255,255,0.2)" }}>{s.step}</div>
                <div className="relative mx-auto mb-6 w-24 h-24">
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background:`radial-gradient(circle,${s.glow},transparent 70%)`, filter:"blur(16px)", transform:"scale(1.5)" }} />
                  <div className="relative w-24 h-24 rounded-full flex items-center justify-center text-4xl border border-white/15 group-hover:scale-110 transition-transform duration-300"
                    style={{ background:`linear-gradient(135deg,${s.cA},${s.cB})`, boxShadow:`0 8px 32px ${s.glow}` }}>
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-xl font-black text-white mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color:"rgba(196,181,253,0.65)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — misty forest at dawn ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=2560&q=85"
            alt="" aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.26) saturate(0.7)" }}
          />
          {/* warm sunrise from top-right */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 50% at 80% 0%, rgba(220,140,40,0.2) 0%, transparent 55%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,3,1,0.5) 0%, transparent 20%, transparent 70%, rgba(3,2,1,0.6) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)" }} />
        </div>
        <div className="absolute pointer-events-none" style={{ top:"20%", right:"10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,158,11,0.08) 0%,transparent 65%)", filter:"blur(40px)" }} />
        <div className="absolute pointer-events-none" style={{ bottom:"15%", left:"8%", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.09) 0%,transparent 65%)", filter:"blur(40px)" }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-5 border" style={{ background:"rgba(245,158,11,0.1)", borderColor:"rgba(245,158,11,0.3)", color:"rgba(253,211,77,1)" }}>
              ⭐ Trusted by 50,000+ travelers
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">What Travelers Say</h2>
            <p className="text-base max-w-md mx-auto" style={{ color:"rgba(196,181,253,0.6)" }}>Real stories from adventurers who planned their best trips with Traveloop.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="group rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={i === 1 ? {
                  background:"linear-gradient(135deg,rgba(99,102,241,0.3) 0%,rgba(139,92,246,0.3) 100%)",
                  border:"1px solid rgba(139,92,246,0.45)",
                  boxShadow:"0 0 40px rgba(139,92,246,0.18)",
                  backdropFilter:"blur(16px)"
                } : {
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.09)",
                  backdropFilter:"blur(12px)"
                }}>
                <Stars count={t.rating} />
                <p className="text-sm leading-relaxed mt-3 mb-5" style={{ color:i===1?"rgba(221,214,254,0.9)":"rgba(196,181,253,0.7)" }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ background:i===1?"rgba(255,255,255,0.18)":"linear-gradient(135deg,#6366f1,#a855f7)", color:"white" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{t.name}</p>
                    <p className="text-xs" style={{ color:"rgba(196,181,253,0.55)" }}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — dramatic mountain peak at golden hour ── */}
      <section className="relative py-28 px-4 overflow-hidden text-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=2560&q=85"
            alt="" aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.30) saturate(0.8)" }}
          />
          {/* golden-hour glow from top */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(200,130,20,0.25) 0%, transparent 55%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,5,2,0.5) 0%, transparent 25%, transparent 65%, rgba(5,3,1,0.65) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)" }} />
        </div>
        <div className="absolute pointer-events-none" style={{ top:"-5%", left:"30%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 65%)", filter:"blur(50px)" }} />
        <div className="absolute pointer-events-none" style={{ bottom:"-5%", right:"25%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 65%)", filter:"blur(50px)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize:"32px 32px" }} />
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium mb-6 border"
            style={{ background:"rgba(255,255,255,0.06)", borderColor:"rgba(255,255,255,0.14)", color:"rgba(196,181,253,0.8)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Free forever · No credit card needed
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Ready to Start Your<br />
            <span style={{ background:"linear-gradient(90deg,#818cf8,#c084fc,#fb7185)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Adventure?
            </span>
          </h2>
          <p className="mb-10 text-base leading-relaxed" style={{ color:"rgba(196,181,253,0.65)" }}>
            Join thousands of travelers planning smarter, more memorable trips with Traveloop.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setPage("signup")}
              className="px-8 py-4 rounded-2xl font-black text-base text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
              style={{ background:"linear-gradient(135deg,#6366f1,#a855f7)", boxShadow:"0 8px 32px rgba(99,102,241,0.4)" }}>
              Get Started Free →
            </button>
            <button onClick={() => setPage("cities")}
              className="px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-200 hover:scale-105"
              style={{ border:"1px solid rgba(139,92,246,0.4)", color:"rgba(196,181,253,0.9)", background:"rgba(139,92,246,0.08)", backdropFilter:"blur(8px)" }}>
              Explore Destinations
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✈️</span>
              <span className="text-white font-bold">Traveloop</span>
            </div>
            <p className="text-sm leading-relaxed">Your personalized travel planning companion.</p>
            <div className="flex gap-3 mt-4">
              {["🐦", "📸", "💼", "📘"].map((i) => (
                <span key={i} className="cursor-pointer hover:text-white transition">{i}</span>
              ))}
            </div>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "About", "Changelog"] },
            { title: "Resources", links: ["Blog", "Help Center", "Contact", "Status"] },
            { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Security"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white font-semibold mb-3 text-sm">{col.title}</p>
              {col.links.map((l) => (
                <p key={l} className="text-sm mb-2 cursor-pointer hover:text-white transition">{l}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs">
          © 2026 Traveloop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function Dashboard({ setPage }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <Layout page="dashboard" setPage={setPage}>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-[8rem] opacity-10 select-none">✈️</div>
        <p className="text-blue-200 text-sm font-medium mb-1">{greeting},</p>
        <h2 className="text-2xl font-bold mb-2">Aryan Shah 👋</h2>
        <p className="text-blue-100 text-sm mb-5">You have <span className="font-bold text-white">3 upcoming trips</span>. Your next adventure starts in <span className="font-bold text-white">12 days!</span></p>
        <div className="flex gap-3">
          <button onClick={() => setPage("createtrip")} className="bg-white text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-50 transition">
            + Plan New Trip
          </button>
          <button onClick={() => setPage("trips")} className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20 transition">
            View All Trips
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Trips" value="7" icon="🗺️" sub="+2 this year" color="blue" />
        <StatCard label="Destinations" value="23" icon="🏙️" sub="Across 14 countries" color="green" />
        <StatCard label="Total Spent" value="$18.4K" icon="💰" sub="Lifetime travel budget" color="amber" />
        <StatCard label="Days Traveled" value="94" icon="📅" sub="Since Jan 2023" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Upcoming Trips */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Upcoming Trips</h3>
            <button onClick={() => setPage("trips")} className="text-sm text-blue-600 hover:underline">View all →</button>
          </div>
          <div className="space-y-3">
            {TRIPS.filter((t) => t.status === "upcoming").slice(0, 3).map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => setPage("itinerary-view")}>
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={t.cover} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{t.name}</p>
                  <p className="text-xs text-gray-500">📅 {t.startDate} → {t.endDate}</p>
                  <div className="mt-1.5">
                    <ProgressBar value={t.spent} max={t.budget} color="bg-blue-500" />
                    <p className="text-xs text-gray-400 mt-0.5">${t.spent.toLocaleString()} / ${t.budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge className={statusMeta[t.status]?.color || "bg-gray-100 text-gray-600"}>{statusMeta[t.status]?.label}</Badge>
                  <p className="text-xs text-gray-400 mt-1">{t.destinations} stops</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "Plan New Trip", icon: "✈️", page: "createtrip", color: "bg-blue-600 text-white hover:bg-blue-700" },
              { label: "View Itinerary", icon: "📋", page: "itinerary-view", color: "bg-emerald-600 text-white hover:bg-emerald-700" },
              { label: "Packing Checklist", icon: "🧳", page: "packing", color: "bg-amber-500 text-white hover:bg-amber-600" },
              { label: "Budget Overview", icon: "💰", page: "budget", color: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" },
              { label: "Explore Cities", icon: "🏙️", page: "cities", color: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" },
            ].map((a) => (
              <button key={a.label} onClick={() => setPage(a.page)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${a.color}`}>
                <span className="text-lg">{a.icon}</span> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Destinations */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Recommended for You</h3>
          <button onClick={() => setPage("cities")} className="text-sm text-blue-600 hover:underline">See all →</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CITIES.slice(0, 4).map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer group" onClick={() => setPage("cities")}>
              <div className="h-28 overflow-hidden">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                <p className="text-xs text-gray-500">{c.flag} {c.country}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <Stars count={Math.round(c.score / 20)} />
                  <Badge className={costBadge(c.costIndex)}>{c.costIndex}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MY TRIPS
// ─────────────────────────────────────────────────────────────────────────────
function TripCard({ trip, setPage }) {
  const meta = statusMeta[trip.status] || statusMeta.upcoming;
  const pct = trip.budget > 0 ? Math.min(100, Math.round((trip.spent / trip.budget) * 100)) : 0;
  const overBudget = trip.spent > trip.budget;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img src={trip.cover} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Badge className={`absolute top-3 right-3 ${meta.color}`}>{meta.label}</Badge>
        <p className="absolute bottom-3 left-3 text-white font-bold text-base drop-shadow">{trip.name}</p>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs text-gray-500 mb-2">📅 {trip.startDate} → {trip.endDate}</p>
        <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1">{trip.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>🏙️ {trip.destinations} destinations</span>
          <span className={`font-semibold ${overBudget ? "text-red-500" : "text-gray-800"}`}>${trip.budget.toLocaleString()}</span>
        </div>
        {trip.spent > 0 && (
          <div className="mb-3">
            <ProgressBar value={trip.spent} max={trip.budget} color={overBudget ? "bg-red-400" : "bg-blue-500"} />
            <p className="text-xs text-gray-400 mt-1">${trip.spent.toLocaleString()} spent · {pct}%</p>
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={() => setPage("itinerary-view")} className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition">View</button>
          <button onClick={() => setPage("itinerary")} className="py-2 px-3 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition">Edit</button>
          <button className="py-2 px-3 border border-red-100 rounded-xl text-xs text-red-400 hover:bg-red-50 transition">🗑</button>
        </div>
      </div>
    </div>
  );
}

function MyTrips({ setPage }) {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const filtered = TRIPS.filter((t) => {
    const matchStatus = filter === "all" || t.status === filter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <Layout page="trips" setPage={setPage}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Trips</h2>
          <p className="text-sm text-gray-500">{TRIPS.length} trips total</p>
        </div>
        <button onClick={() => setPage("createtrip")} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition whitespace-nowrap">
          + New Trip
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search trips..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "upcoming", "ongoing", "completed", "draft"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition ${filter === f ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white ml-auto">
          <button onClick={() => setView("grid")} className={`px-3 py-2 text-sm transition ${view === "grid" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>⊞</button>
          <button onClick={() => setView("list")} className={`px-3 py-2 text-sm transition ${view === "list" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>≡</button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">No trips found</h3>
          <p className="text-gray-500 mb-6">Start planning your first adventure!</p>
          <button onClick={() => setPage("createtrip")} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Create Trip
          </button>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((t) => <TripCard key={t.id} trip={t} setPage={setPage} />)}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition cursor-pointer" onClick={() => setPage("itinerary-view")}>
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={t.cover} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <Badge className={statusMeta[t.status]?.color}>{statusMeta[t.status]?.label}</Badge>
                </div>
                <p className="text-xs text-gray-500">{t.startDate} → {t.endDate} · {t.destinations} destinations</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{t.description}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="font-bold text-gray-900">${t.budget.toLocaleString()}</p>
                <div className="flex gap-1 mt-2">
                  <button onClick={(e) => { e.stopPropagation(); setPage("itinerary-view"); }} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-100 transition">View</button>
                  <button onClick={(e) => { e.stopPropagation(); setPage("itinerary"); }} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-100 transition">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CREATE TRIP WIZARD
// ─────────────────────────────────────────────────────────────────────────────
function CreateTrip({ setPage }) {
  const [step, setStep] = useState(1);
  const [travelers, setTravelers] = useState(2);
  const [tripType, setTripType] = useState("Beach");
  const [visibility, setVisibility] = useState("Private");
  const steps = ["Trip Details", "Dates & Budget", "Finalize"];
  const totalSteps = steps.length;

  return (
    <Layout page="createtrip" setPage={setPage}>
      <div className="max-w-2xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i + 1 < step ? "bg-blue-600 text-white" :
                  i + 1 === step ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {i + 1 < step ? "✓" : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i + 1 <= step ? "text-blue-600" : "text-gray-400"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 transition-all ${i + 1 < step ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          {step === 1 && (
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-5">Tell us about your trip</h3>
              <InputField label="Trip Name" placeholder="e.g. Bali Summer Escape 2026" icon="✈️" />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea rows={3} placeholder="What's this trip about? Any special plans?"
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white resize-none" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[["🏖️","Beach"],["🏔️","Adventure"],["🏛️","Culture"],["🍽️","Food"],["🛍️","Shopping"],["🧘","Wellness"]].map(([icon, label]) => (
                    <button key={label} onClick={() => setTripType(label)}
                      className={`flex items-center gap-2 p-3 border rounded-xl text-sm transition ${tripType === label ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                      <span>{icon}</span> {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-5">When & How much?</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                </div>
              </div>
              <InputField label="Total Budget ($)" type="number" placeholder="e.g. 3000" icon="💰" />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Number of Travelers</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 font-bold text-xl text-gray-600 transition">−</button>
                  <span className="font-bold text-gray-900 text-xl w-8 text-center">{travelers}</span>
                  <button onClick={() => setTravelers(travelers + 1)}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 font-bold text-xl text-gray-600 transition">+</button>
                  <span className="text-sm text-gray-500">{travelers === 1 ? "traveler" : "travelers"}</span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Breakdown</label>
                <div className="space-y-3">
                  {[["✈️","Transport","35%"],["🏨","Accommodation","30%"],["🍜","Food","20%"],["🎭","Activities","15%"]].map(([icon,cat,pct]) => (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="w-7">{icon}</span>
                      <span className="text-sm text-gray-600 w-32">{cat}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: pct }} />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">{pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-5">Almost there!</h3>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 transition cursor-pointer bg-gray-50 hover:bg-blue-50/50">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-sm text-gray-500">Drop an image or <span className="text-blue-600 font-medium">browse files</span></p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP up to 5MB</p>
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                <div className="flex gap-3">
                  {["Private", "Friends Only", "Public"].map((v) => (
                    <button key={v} onClick={() => setVisibility(v)}
                      className={`flex-1 py-2.5 border rounded-xl text-sm font-medium transition ${visibility === v ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              {/* Summary Card */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="font-semibold text-blue-900 mb-2">Trip Summary</p>
                <div className="space-y-1 text-sm text-blue-800">
                  <p>✈️ Type: <span className="font-medium">Beach · {travelers} travelers</span></p>
                  <p>💰 Visibility: <span className="font-medium">{visibility}</span></p>
                  <p>📅 Ready to create your adventure!</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            <button onClick={() => step > 1 ? setStep(step - 1) : setPage("trips")}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
              {step > 1 ? "← Back" : "Cancel"}
            </button>
            {step < totalSteps ? (
              <button onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
                Continue →
              </button>
            ) : (
              <button onClick={() => setPage("itinerary-view")}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
                🎉 Create Trip
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ITINERARY VIEW
// ─────────────────────────────────────────────────────────────────────────────
function ItineraryView({ setPage }) {
  const trip = TRIPS[0];
  const [viewMode, setViewMode] = useState("timeline");

  return (
    <Layout page="itinerary-view" setPage={setPage}>
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-6 h-56">
        <img src={trip.cover} alt={trip.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{trip.name}</h2>
            <p className="text-white/80 text-sm">📅 {trip.startDate} → {trip.endDate} · {trip.destinations} stops</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setPage("itinerary")} className="bg-white/20 backdrop-blur border border-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium hover:bg-white/30 transition">✏️ Edit</button>
            <button onClick={() => setPage("shared")} className="bg-white/20 backdrop-blur border border-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium hover:bg-white/30 transition">🔗 Share</button>
            <button className="bg-white/20 backdrop-blur border border-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium hover:bg-white/30 transition">📥 Export</button>
          </div>
        </div>
      </div>

      {/* Sub nav */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          { id: "timeline", label: "Timeline", icon: "📋" },
          { id: "calendar", label: "Calendar", icon: "📅" },
        ].map((v) => (
          <button key={v.id} onClick={() => setViewMode(v.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${viewMode === v.id ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <span>{v.icon}</span> {v.label}
          </button>
        ))}
        <div className="flex gap-2 ml-auto">
          {[
            { label: "Budget", icon: "💰", page: "budget" },
            { label: "Packing", icon: "🧳", page: "packing" },
            { label: "Journal", icon: "📓", page: "journal" },
          ].map((b) => (
            <button key={b.label} onClick={() => setPage(b.page)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition whitespace-nowrap">
              {b.icon} {b.label}
            </button>
          ))}
        </div>
      </div>

      {viewMode === "timeline" && (
        <div className="space-y-8">
          {ITINERARY_DAYS.map((d) => (
            <div key={d.day} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="flex items-center gap-4 p-5 border-b border-gray-50">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {d.day}
                </div>
                <div>
                  <p className="font-bold text-gray-900">Day {d.day} — {d.date}</p>
                  <p className="text-sm text-gray-500">📍 {d.city}</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  ${d.activities.reduce((s, a) => s + a.cost, 0)} total
                </div>
              </div>
              <div className="p-5 relative">
                <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gray-100" />
                <div className="space-y-4">
                  {d.activities.map((a, i) => (
                    <div key={i} className="flex items-start gap-4 pl-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-white shadow flex-shrink-0 mt-1.5 relative z-10" />
                      <div className="flex-1 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-gray-900 text-sm">{a.name}</p>
                          {a.cost > 0 && <span className="text-xs text-gray-500 font-medium">${a.cost}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">⏰ {a.time}</span>
                          <Badge className={typeColor(a.type)}>{a.type}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "calendar" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="font-bold text-gray-900 mb-4">July 2025</p>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} className="text-xs text-gray-400 font-medium py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const active = day >= 10 && day <= 22;
              return (
                <div key={day} className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition cursor-pointer ${active ? "bg-blue-600 text-white font-semibold shadow-sm" : "hover:bg-gray-50 text-gray-700"}`}>
                  {day}
                  {active && <div className="w-1 h-1 bg-white/70 rounded-full mt-0.5" />}
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-900 mb-3">Jul 10 — Day 1</p>
            {ITINERARY_DAYS[0].activities.map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400 w-14">{a.time}</span>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${a.type === "food" ? "bg-amber-400" : a.type === "stay" ? "bg-purple-400" : "bg-blue-400"}`} />
                <span className="text-sm text-gray-700">{a.name}</span>
                {a.cost > 0 && <span className="ml-auto text-xs text-gray-400">${a.cost}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ITINERARY BUILDER
// ─────────────────────────────────────────────────────────────────────────────
function ItineraryBuilder({ setPage }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [addActivityOpen, setAddActivityOpen] = useState(false);
  const currentDay = ITINERARY_DAYS.find((d) => d.day === selectedDay);

  return (
    <Layout page="itinerary" setPage={setPage}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Bali Escape — Builder</h2>
          <p className="text-sm text-gray-500">Drag and drop to reorder activities</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPage("itinerary-view")} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            👁 Preview
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left: Stops */}
        <div className="w-72 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-gray-900 text-sm">Trip Stops</p>
            <button className="text-xs text-blue-600 hover:underline">+ Add Stop</button>
          </div>
          <div className="space-y-3">
            {[
              { city: "Denpasar", dates: "Jul 10–11", count: 3 },
              { city: "Ubud", dates: "Jul 11–15", count: 7 },
              { city: "Seminyak", dates: "Jul 15–18", count: 5 },
              { city: "Nusa Penida", dates: "Jul 18–22", count: 4 },
            ].map((s, i) => (
              <div key={s.city} className="bg-white rounded-xl border border-gray-200 p-3 hover:shadow-md transition cursor-move">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-300 text-sm">⠿</span>
                  <p className="font-semibold text-gray-900 text-sm">{s.city}</p>
                </div>
                <p className="text-xs text-gray-400 pl-5">{s.dates}</p>
                <div className="flex items-center justify-between pl-5 mt-1.5">
                  <span className="text-xs text-gray-400">{s.count} activities</span>
                  <div className="flex gap-1">
                    <button className="text-xs text-blue-500 hover:underline">Edit</button>
                    <span className="text-gray-300 text-xs">·</span>
                    <button className="text-xs text-red-400 hover:underline">Del</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Day Timeline */}
        <div className="flex-1 min-w-0">
          {/* Day tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {ITINERARY_DAYS.map((d) => (
              <button key={d.day} onClick={() => setSelectedDay(d.day)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition ${selectedDay === d.day ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                Day {d.day} · {d.date}
              </button>
            ))}
          </div>

          {currentDay && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-gray-900">Day {currentDay.day} — {currentDay.date}</p>
                  <p className="text-sm text-gray-500">📍 {currentDay.city}</p>
                </div>
                <p className="text-sm text-gray-500">${currentDay.activities.reduce((s, a) => s + a.cost, 0)} budgeted</p>
              </div>

              <div className="space-y-3">
                {currentDay.activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <span className="text-gray-200 cursor-move pt-3 text-sm flex-shrink-0">⠿</span>
                    <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 font-mono">{a.time}</span>
                          <Badge className={typeColor(a.type)}>{a.type}</Badge>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                          <button className="text-xs text-blue-500 px-2 py-1 rounded hover:bg-blue-50">Edit</button>
                          <button className="text-xs text-red-400 px-2 py-1 rounded hover:bg-red-50">✕</button>
                        </div>
                      </div>
                      <p className="font-medium text-gray-900 text-sm mt-1">{a.name}</p>
                      {a.cost > 0 && <p className="text-xs text-gray-400 mt-0.5">Cost: ${a.cost}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setAddActivityOpen(true)}
                className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition">
                + Add Activity
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal open={addActivityOpen} onClose={() => setAddActivityOpen(false)} title="Add Activity">
        <InputField label="Activity Name" placeholder="e.g. Visit Tanah Lot Temple" icon="🎯" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Time</label>
            <input type="time" className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
          </div>
          <InputField label="Cost ($)" type="number" placeholder="0" icon="💰" className="mb-0" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
          <div className="flex gap-2 flex-wrap">
            {["travel","stay","activity","food","wellness","culture"].map((c) => (
              <button key={c} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${typeColor(c)}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
          <textarea rows={2} placeholder="Any notes..." className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none" />
        </div>
        <button onClick={() => setAddActivityOpen(false)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
          Add to Day {selectedDay}
        </button>
      </Modal>
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CITY SEARCH
// ─────────────────────────────────────────────────────────────────────────────
function CitySearch({ setPage }) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [cost, setCost] = useState("All");

  const filtered = CITIES.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === "All" || c.region === region;
    const matchCost = cost === "All" || c.costIndex === cost;
    return matchSearch && matchRegion && matchCost;
  });

  return (
    <Layout page="cities" setPage={setPage}>
      {/* ── Full-screen Hero Background ── */}
      <div className="relative -mx-4 md:-mx-6 -mt-4 md:-mt-6 mb-8 h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=85"
          alt="Explore cities hero"
          className="w-full h-full object-cover"
        />
        {/* dark + teal gradient overlay, inspired by the reference */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/30 to-teal-900/50" />

        {/* Slide indicator line (right side accent from reference) */}
        <div className="absolute right-6 top-1/4 bottom-1/4 flex flex-col items-center gap-2 hidden lg:flex">
          <span className="text-white/50 text-xs font-mono">01</span>
          <div className="flex-1 w-px bg-white/20 relative">
            <div className="absolute top-0 left-0 w-full bg-green-400 h-1/3 rounded-full" />
          </div>
          <span className="text-white/50 text-xs font-mono">06</span>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 max-w-5xl">
          {/* Big title split — matching the "Discover / Ease" reference style */}
          <div className="mb-4">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-none tracking-tight drop-shadow-lg">
              Discover
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white/90 leading-none tracking-tight drop-shadow-lg ml-8 sm:ml-16">
              Cities
            </h1>
          </div>

          {/* Description (bottom-left, like the reference) */}
          <p className="text-white/75 text-sm max-w-xs leading-relaxed mb-6">
            Open new horizons. Travel to fascinating places, immerse yourself in different cultures and create unforgettable memories.
          </p>

          {/* Search bar — glassmorphism */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-full px-5 py-3.5 flex items-center gap-3 max-w-xl shadow-2xl">
            <span className="text-white/70 text-lg flex-shrink-0">🌍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cities or countries..."
              className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-white/60 hover:text-white transition">✕</button>
            )}
            <button onClick={() => {}} className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap">
              Explore →
            </button>
          </div>

          {/* Activity type icons row (bottom of hero, like reference) */}
          <div className="flex gap-6 mt-8">
            {[["🚵", "Adventure"], ["🏛️", "Culture"], ["🏕️", "Nature"], ["🏄", "Sports"]].map(([icon, label]) => (
              <div key={label} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-xl group-hover:bg-white/20 transition backdrop-blur-sm">
                  {icon}
                </div>
                <span className="text-white/60 text-xs group-hover:text-white transition">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <span className="text-sm font-medium text-gray-600">Region:</span>
        {["All", "Asia", "Europe", "Americas", "Africa", "Oceania"].map((r) => (
          <button key={r} onClick={() => setRegion(r)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${region === r ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {r}
          </button>
        ))}
        <span className="text-sm font-medium text-gray-600 ml-2">Cost:</span>
        {["All", "Low", "Medium", "High"].map((c) => (
          <button key={c} onClick={() => setCost(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${cost === c ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {c}
          </button>
        ))}
        {(region !== "All" || cost !== "All" || search) && (
          <button onClick={() => { setRegion("All"); setCost("All"); setSearch(""); }}
            className="text-xs text-red-500 hover:underline ml-2">Clear filters</button>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length} destinations found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100">
            <div className="h-44 overflow-hidden relative">
              <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition translate-y-2 group-hover:translate-y-0 duration-300 whitespace-nowrap">
                + Add to Trip
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <p className="font-bold text-gray-900 text-lg">{c.name}</p>
                <Badge className={costBadge(c.costIndex)}>{c.costIndex}</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-2">{c.flag} {c.country}</p>
              <div className="flex items-center gap-1 mb-2">
                <Stars count={Math.round(c.score / 20)} />
                <span className="text-xs text-gray-400">({c.score})</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY SEARCH
// ─────────────────────────────────────────────────────────────────────────────
function ActivitySearch({ setPage }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", "Wellness", "Food", "Adventure", "Culture", "Leisure"];
  const filtered = ACTIVITIES.filter((a) => {
    const matchS = a.title.toLowerCase().includes(search.toLowerCase());
    const matchC = category === "All" || a.category === category;
    return matchS && matchC;
  });

  return (
    <Layout page="activities" setPage={setPage}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Activities</h2>
        <p className="text-gray-500 mb-6">Discover things to do on your next trip</p>
        <div className="bg-white rounded-full shadow-md border border-gray-200 px-5 py-3.5 flex items-center gap-3 max-w-xl mx-auto">
          <span className="text-gray-400">🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activities..." className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none" />
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition ${category === c ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((a) => (
          <div key={a.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100">
            <div className="h-40 overflow-hidden relative">
              <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 backdrop-blur">{a.category}</Badge>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{a.title}</h4>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span>⏱ {a.duration}</span>
                <span>💵 ${a.cost}/person</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <Stars count={Math.round(a.rating)} />
                <span className="text-xs text-gray-400">{a.rating}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{a.desc}</p>
              <button className="w-full py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold hover:bg-blue-100 transition">
                + Add to Trip
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BUDGET PAGE
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  Transport: { bg: "bg-blue-100 text-blue-700", bar: "bg-blue-500", dot: "bg-blue-500" },
  Accommodation: { bg: "bg-purple-100 text-purple-700", bar: "bg-purple-500", dot: "bg-purple-500" },
  Food: { bg: "bg-amber-100 text-amber-700", bar: "bg-amber-500", dot: "bg-amber-500" },
  Activities: { bg: "bg-green-100 text-green-700", bar: "bg-green-500", dot: "bg-green-500" },
  Shopping: { bg: "bg-pink-100 text-pink-700", bar: "bg-pink-500", dot: "bg-pink-500" },
};

function MiniPieChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let accumulated = 0;
  const COLORS = ["#3B82F6", "#8B5CF6", "#F59E0B", "#10B981", "#EC4899"];
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1F5F9" strokeWidth="3" />
          {data.map((d, i) => {
            const pct = (d.value / total) * 100;
            const offset = accumulated;
            accumulated += pct;
            return (
              <circle key={i} cx="18" cy="18" r="15.9" fill="none"
                stroke={COLORS[i % COLORS.length]} strokeWidth="3"
                strokeDasharray={`${pct} ${100 - pct}`}
                strokeDashoffset={`${25 - offset}`} />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-gray-500">Spent</p>
            <p className="text-sm font-bold text-gray-900">${data.reduce((s,d) => s+d.value,0).toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0`} style={{ backgroundColor: ["#3B82F6","#8B5CF6","#F59E0B","#10B981","#EC4899"][i] }} />
            <span className="text-xs text-gray-600">{d.label}</span>
            <span className="text-xs font-semibold text-gray-900 ml-auto">${d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetPage({ setPage }) {
  const trip = TRIPS[0];
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);

  const categoryTotals = BUDGET_ITEMS.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});
  const pieData = Object.entries(categoryTotals).map(([label, value]) => ({ label, value }));
  const totalSpent = BUDGET_ITEMS.reduce((s, i) => s + i.amount, 0);
  const remaining = trip.budget - totalSpent;
  const overBudget = remaining < 0;

  return (
    <Layout page="budget" setPage={setPage}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Budget Tracker</h2>
          <p className="text-sm text-gray-500">{trip.name}</p>
        </div>
        <button onClick={() => setAddExpenseOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
          + Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Budget" value={`$${trip.budget.toLocaleString()}`} icon="💰" color="blue" />
        <StatCard label="Total Spent" value={`$${totalSpent.toLocaleString()}`} icon="📊" sub={`${Math.round((totalSpent/trip.budget)*100)}% used`} color="amber" />
        <StatCard label="Remaining" value={`$${Math.abs(remaining).toLocaleString()}`} icon={overBudget ? "⚠️" : "✅"} sub={overBudget ? "Over budget!" : "Available"} color={overBudget ? "red" : "green"} />
        <StatCard label="Daily Average" value={`$${Math.round(totalSpent / 13).toLocaleString()}`} icon="📅" sub="Per day" color="purple" />
      </div>

      {/* Budget progress */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-gray-900">Budget Progress</p>
          <span className={`text-sm font-bold ${overBudget ? "text-red-500" : "text-gray-700"}`}>
            ${totalSpent.toLocaleString()} / ${trip.budget.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div className={`${overBudget ? "bg-red-400" : "bg-blue-500"} h-3 rounded-full transition-all`}
            style={{ width: `${Math.min(100, (totalSpent / trip.budget) * 100)}%` }} />
        </div>
        {overBudget && (
          <div className="mt-3 bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-red-600">
            ⚠️ You're ${Math.abs(remaining).toLocaleString()} over budget!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="font-semibold text-gray-900 mb-4">Spending by Category</p>
          <MiniPieChart data={pieData} />
        </div>

        {/* Category Bars */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="font-semibold text-gray-900 mb-4">Category Breakdown</p>
          <div className="space-y-4">
            {Object.entries(categoryTotals).map(([cat, amount]) => {
              const pct = Math.round((amount / trip.budget) * 100);
              const colors = CATEGORY_COLORS[cat] || { bg: "bg-gray-100 text-gray-600", bar: "bg-gray-400" };
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Badge className={colors.bg}>{cat}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">{pct}%</span>
                      <span className="font-semibold text-gray-900">${amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <ProgressBar value={amount} max={trip.budget} color={colors.bar} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <p className="font-semibold text-gray-900">All Expenses</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Description</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Category</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-5 py-3">Amount</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {BUDGET_ITEMS.map((item) => {
                const colors = CATEGORY_COLORS[item.category] || { bg: "bg-gray-100 text-gray-600" };
                return (
                  <tr key={item.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-5 py-3 text-gray-500">{item.date}</td>
                    <td className="px-5 py-3 font-medium text-gray-900">{item.desc}</td>
                    <td className="px-5 py-3"><Badge className={colors.bg}>{item.category}</Badge></td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900">${item.amount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="text-xs text-blue-500 px-2 py-1 rounded hover:bg-blue-50">Edit</button>
                        <button className="text-xs text-red-400 px-2 py-1 rounded hover:bg-red-50">Del</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td colSpan={3} className="px-5 py-3 font-semibold text-gray-900">Total</td>
                <td className="px-5 py-3 text-right font-bold text-gray-900">${totalSpent.toLocaleString()}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <Modal open={addExpenseOpen} onClose={() => setAddExpenseOpen(false)} title="Add Expense">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
            <input type="date" className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
          </div>
          <InputField label="Amount ($)" type="number" placeholder="0.00" icon="💰" className="mb-0" />
        </div>
        <InputField label="Description" placeholder="What did you spend on?" icon="📝" />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
              <button key={cat} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${colors.bg}`}>{cat}</button>
            ))}
          </div>
        </div>
        <button onClick={() => setAddExpenseOpen(false)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
          Save Expense
        </button>
      </Modal>
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PACKING CHECKLIST
// ─────────────────────────────────────────────────────────────────────────────
function PackingPage({ setPage }) {
  const [items, setItems] = useState(PACKING_ITEMS_DATA);
  const [activeCategory, setActiveCategory] = useState("All");
  const [newItem, setNewItem] = useState("");
  const [addingIn, setAddingIn] = useState(null);

  const togglePacked = (id) => setItems(items.map((i) => i.id === id ? { ...i, packed: !i.packed } : i));
  const markAll = () => setItems(items.map((i) => ({ ...i, packed: true })));
  const resetAll = () => setItems(items.map((i) => ({ ...i, packed: false })));
  const deleteItem = (id) => setItems(items.filter((i) => i.id !== id));
  const addItem = (category) => {
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now(), name: newItem.trim(), category, packed: false }]);
    setNewItem("");
    setAddingIn(null);
  };

  const totalPacked = items.filter((i) => i.packed).length;
  const total = items.length;
  const pct = total > 0 ? Math.round((totalPacked / total) * 100) : 0;
  const catIcons = { Documents: "📄", Clothing: "👕", Electronics: "💻", Essentials: "🎒" };

  return (
    <Layout page="packing" setPage={setPage}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Packing Checklist</h2>
          <p className="text-sm text-gray-500">Bali Escape — Jul 10–22</p>
        </div>
        <div className="flex gap-2">
          <button onClick={resetAll} className="px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition">Reset</button>
          <button onClick={markAll} className="px-3 py-2 bg-green-600 text-white rounded-xl text-xs font-semibold hover:bg-green-700 transition">Mark All Packed</button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-bold text-gray-900 text-lg">{totalPacked} of {total} items packed</p>
            <p className="text-sm text-gray-500">{pct === 100 ? "🎉 All packed! You're ready!" : pct >= 80 ? "Almost there!" : "Keep going!"}</p>
          </div>
          <div className="w-16 h-16 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1F5F9" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke={pct === 100 ? "#10B981" : "#3B82F6"} strokeWidth="3"
                strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset="25" className="transition-all duration-500" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">{pct}%</span>
            </div>
          </div>
        </div>
        <ProgressBar value={totalPacked} max={total} color={pct === 100 ? "bg-green-500" : "bg-blue-500"} />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {["All", ...PACKING_CATEGORIES].map((c) => (
          <button key={c} onClick={() => setActiveCategory(c)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition ${activeCategory === c ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {c !== "All" ? catIcons[c] + " " : ""}{c}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {PACKING_CATEGORIES.filter((c) => activeCategory === "All" || activeCategory === c).map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          const catPacked = catItems.filter((i) => i.packed).length;
          return (
            <div key={cat} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{catIcons[cat]}</span>
                  <p className="font-semibold text-gray-900">{cat}</p>
                  <span className="text-xs text-gray-400">{catPacked}/{catItems.length}</span>
                </div>
                <ProgressBar value={catPacked} max={catItems.length} color="bg-green-400" className="w-24" />
              </div>
              <div className="divide-y divide-gray-50">
                {catItems.map((item) => (
                  <div key={item.id} className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition group ${item.packed ? "opacity-60" : ""}`}>
                    <button onClick={() => togglePacked(item.id)}
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition ${item.packed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-green-400"}`}>
                      {item.packed && <span className="text-xs">✓</span>}
                    </button>
                    <span className={`flex-1 text-sm ${item.packed ? "line-through text-gray-400" : "text-gray-800"}`}>{item.name}</span>
                    <button onClick={() => deleteItem(item.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition text-xs px-1">✕</button>
                  </div>
                ))}
              </div>
              {/* Add item */}
              {addingIn === cat ? (
                <div className="px-4 py-3 bg-gray-50 flex items-center gap-2">
                  <input value={newItem} onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addItem(cat)}
                    placeholder={`Add ${cat.toLowerCase()} item...`} autoFocus
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  <button onClick={() => addItem(cat)} className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition">Add</button>
                  <button onClick={() => { setAddingIn(null); setNewItem(""); }} className="px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-500 hover:bg-white transition">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setAddingIn(cat)} className="w-full px-4 py-3 text-left text-sm text-gray-400 hover:text-blue-600 hover:bg-gray-50 transition">
                  + Add {cat.toLowerCase()} item
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRAVEL JOURNAL
// ─────────────────────────────────────────────────────────────────────────────
function JournalPage({ setPage }) {
  const [notes, setNotes] = useState(NOTES_DATA);
  const [addOpen, setAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [editNote, setEditNote] = useState(null);

  const saveNote = () => {
    if (!newTitle.trim()) return;
    if (editNote) {
      setNotes(notes.map((n) => n.id === editNote.id ? { ...n, title: newTitle, body: newBody } : n));
    } else {
      setNotes([{ id: Date.now(), tripId: 1, day: "Jul 13", title: newTitle, body: newBody, ts: new Date().toISOString().slice(0, 16).replace("T", " ") }, ...notes]);
    }
    setNewTitle(""); setNewBody(""); setEditNote(null); setAddOpen(false);
  };

  const startEdit = (note) => { setEditNote(note); setNewTitle(note.title); setNewBody(note.body); setAddOpen(true); };

  return (
    <Layout page="journal" setPage={setPage}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Travel Journal</h2>
          <p className="text-sm text-gray-500">Notes and memories from your trips</p>
        </div>
        <button onClick={() => { setEditNote(null); setNewTitle(""); setNewBody(""); setAddOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
          + New Note
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📓</div>
          <h3 className="font-bold text-gray-900 mb-2">Start your travel story</h3>
          <p className="text-gray-500 mb-6">Capture memories, tips and moments from your journey.</p>
          <button onClick={() => setAddOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition">
            Add First Note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {notes.map((note) => (
            <div key={note.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Badge className="bg-blue-50 text-blue-600 mb-2">{note.day}</Badge>
                  <h4 className="font-bold text-gray-900">{note.title}</h4>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => startEdit(note)} className="text-xs text-blue-500 px-2 py-1 rounded hover:bg-blue-50">Edit</button>
                  <button onClick={() => setNotes(notes.filter((n) => n.id !== note.id))} className="text-xs text-red-400 px-2 py-1 rounded hover:bg-red-50">Del</button>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{note.body}</p>
              <p className="text-xs text-gray-400 mt-3">{note.ts}</p>
            </div>
          ))}
        </div>
      )}

      <Modal open={addOpen} onClose={() => { setAddOpen(false); setEditNote(null); }} title={editNote ? "Edit Note" : "New Journal Entry"}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
          <select className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
            {ITINERARY_DAYS.map((d) => (
              <option key={d.day}>Day {d.day} — {d.date} ({d.city})</option>
            ))}
          </select>
        </div>
        <InputField label="Title" placeholder="Give this entry a title..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Write your note</label>
          <textarea rows={6} value={newBody} onChange={(e) => setNewBody(e.target.value)}
            placeholder="What happened today? Share your memories, tips, and highlights..."
            className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white resize-none" />
        </div>
        <div className="flex gap-3">
          <button onClick={() => setAddOpen(false)} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">Cancel</button>
          <button onClick={saveNote} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">Save Note</button>
        </div>
      </Modal>
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED TRIP (READ-ONLY)
// ─────────────────────────────────────────────────────────────────────────────
function SharedTrip({ setPage }) {
  const trip = TRIPS[0];
  const [copied, setCopied] = useState(false);
  const copyLink = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="min-h-screen font-sans relative overflow-hidden">
      {/* Shared trip cinematic background */}
      <PageBackground page="shared" />
      {/* Minimal nav */}
      <nav className="relative z-10 border-b px-6 py-4 flex items-center justify-between"
        style={{ background:"rgba(255,253,250,0.78)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderColor:"rgba(255,255,255,0.55)" }}>
        <div className="flex items-center gap-2">
          <span className="text-xl">✈️</span>
          <span className="font-bold text-gray-900">Traveloop</span>
        </div>
        <button onClick={() => setPage("home")} className="text-sm text-gray-500 hover:text-gray-700 transition">← Back to Home</button>
      </nav>

      {/* Hero */}
      <div className="relative z-10 h-72">
        <img src={trip.cover} alt={trip.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <p className="text-white/70 text-sm mb-1">Shared itinerary by</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">AS</div>
              <span className="text-white text-sm font-medium">Aryan Shah</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{trip.name}</h2>
            <p className="text-white/80 text-sm">📅 {trip.startDate} → {trip.endDate} · {trip.destinations} stops</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={copyLink}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition ${copied ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
            {copied ? "✅ Copied!" : "🔗 Copy Link"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 transition">
            🐦 Twitter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 transition">
            📘 Facebook
          </button>
          <button onClick={() => setPage("createtrip")}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition ml-auto">
            Copy This Trip →
          </button>
        </div>

        {/* Trip Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{trip.destinations}</p>
            <p className="text-xs text-gray-500 mt-1">Destinations</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-500 mt-1">Days</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900">${trip.budget.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Est. Budget</p>
          </div>
        </div>

        {/* Read-only Timeline */}
        <h3 className="font-bold text-gray-900 text-lg mb-4">Day-by-Day Itinerary</h3>
        <div className="space-y-6">
          {ITINERARY_DAYS.map((d) => (
            <div key={d.day} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">{d.day}</div>
                <div>
                  <p className="font-bold text-gray-900">Day {d.day} — {d.date}</p>
                  <p className="text-xs text-gray-500">📍 {d.city}</p>
                </div>
              </div>
              <div className="space-y-2">
                {d.activities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-400 w-14 font-mono">{a.time}</span>
                    <Badge className={typeColor(a.type)}>{a.type}</Badge>
                    <span className="text-sm text-gray-700 flex-1">{a.name}</span>
                    {a.cost > 0 && <span className="text-xs text-gray-400">${a.cost}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <p className="font-bold text-xl mb-2">Plan your own trip with Traveloop</p>
          <p className="text-blue-200 text-sm mb-5">Join thousands of travelers planning smarter trips</p>
          <button onClick={() => setPage("signup")} className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition">
            Get Started Free →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE & SETTINGS
// ─────────────────────────────────────────────────────────────────────────────
function ProfilePage({ setPage }) {
  const [activeSection, setActiveSection] = useState("personal");
  const [theme, setTheme] = useState("Light");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("English");
  const settingsSections = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
    { id: "saved", label: "Saved Places", icon: "🔖" },
    { id: "privacy", label: "Privacy", icon: "🔒" },
    { id: "danger", label: "Danger Zone", icon: "⚠️" },
  ];

  return (
    <Layout page="profile" setPage={setPage}>
      <div className="flex gap-6">
        {/* Settings Sidebar */}
        <div className="w-48 flex-shrink-0">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">AS</div>
            <p className="font-semibold text-gray-900 text-sm">Aryan Shah</p>
            <p className="text-xs text-gray-400">aryan@email.com</p>
          </div>
          <nav className="space-y-1">
            {settingsSections.map((s) => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition ${activeSection === s.id ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeSection === "personal" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5">Personal Information</h3>
              <div className="flex items-start gap-6 mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-2">AS</div>
                  <button className="text-xs text-blue-600 hover:underline">Change photo</button>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="First Name" placeholder="Aryan" />
                    <InputField label="Last Name" placeholder="Shah" />
                  </div>
                </div>
              </div>
              <InputField label="Email Address" type="email" placeholder="aryan@email.com" icon="📧" />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                <textarea rows={3} placeholder="Tell other travelers about yourself..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white resize-none" />
              </div>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          )}

          {activeSection === "preferences" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5">Preferences</h3>
              <div className="space-y-5">
                {[
                  { label: "Language", options: ["English", "Spanish", "French", "German"], value: language, setValue: setLanguage },
                  { label: "Currency", options: ["USD", "EUR", "GBP", "JPY", "INR"], value: currency, setValue: setCurrency },
                  { label: "Theme", options: ["Light", "Dark", "System"], value: theme, setValue: setTheme },
                ].map(({ label, options, value, setValue }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <p className="font-medium text-gray-900 text-sm">{label}</p>
                    <div className="flex gap-2">
                      {options.map((opt) => (
                        <button key={opt} onClick={() => setValue(opt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${value === opt ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "saved" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5">Saved Places</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CITIES.slice(0, 4).map((c) => (
                  <div key={c.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition group">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.flag} {c.country}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 text-red-400 text-xs px-2 py-1 rounded hover:bg-red-50 transition">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "privacy" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5">Privacy Settings</h3>
              <div className="space-y-4">
                {[
                  "Make trips public by default",
                  "Show profile to other travelers",
                  "Allow others to copy my trips",
                  "Email notifications for trip reminders",
                  "Weekly travel inspiration emails",
                ].map((label) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <p className="text-sm text-gray-700">{label}</p>
                    <ToggleSwitch />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "danger" && (
            <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
              <h3 className="font-bold text-red-700 text-lg mb-2">Danger Zone</h3>
              <p className="text-sm text-gray-500 mb-6">These actions are permanent and cannot be undone.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-red-100 rounded-xl bg-red-50">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Export All Data</p>
                    <p className="text-xs text-gray-500">Download all your trips and data</p>
                  </div>
                  <button className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-white transition">Export</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-xl bg-red-50">
                  <div>
                    <p className="font-medium text-red-700 text-sm">Delete Account</p>
                    <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition">Delete Account</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function ToggleSwitch({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} className={`w-11 h-6 rounded-full transition-colors ${on ? "bg-blue-600" : "bg-gray-200"} relative flex-shrink-0`}>
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN ANALYTICS
// ─────────────────────────────────────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const USER_GROWTH = [420, 580, 740, 820, 1050, 1340];
const TRIP_COUNTS = [120, 180, 230, 280, 360, 430];

function MiniBarChart({ data, color = "bg-blue-500", max }) {
  const maxVal = max || Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className={`${color} rounded-sm w-full transition-all`} style={{ height: `${(v / maxVal) * 56}px` }} />
        </div>
      ))}
    </div>
  );
}

function AdminAnalytics({ setPage }) {
  return (
    <Layout page="admin" setPage={setPage}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-sm text-gray-500">Platform overview — last 6 months</p>
        </div>
        <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700">
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>This year</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users" value="1,340" icon="👥" sub="+27.6% vs last month" color="blue" />
        <StatCard label="Total Trips" value="4,280" icon="🗺️" sub="+19.4% this month" color="green" />
        <StatCard label="Active Users (7d)" value="892" icon="📊" sub="66.6% of total" color="amber" />
        <StatCard label="Avg Trip Budget" value="$2,840" icon="💰" sub="Across all trips" color="purple" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-gray-900">User Growth</p>
            <Badge className="bg-blue-50 text-blue-600">+27.6%</Badge>
          </div>
          <MiniBarChart data={USER_GROWTH} color="bg-blue-500" />
          <div className="flex justify-between mt-2">
            {MONTHS.map((m) => <span key={m} className="text-xs text-gray-400 flex-1 text-center">{m}</span>)}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-gray-900">Trips Created</p>
            <Badge className="bg-green-50 text-green-600">+19.4%</Badge>
          </div>
          <MiniBarChart data={TRIP_COUNTS} color="bg-green-500" />
          <div className="flex justify-between mt-2">
            {MONTHS.map((m) => <span key={m} className="text-xs text-gray-400 flex-1 text-center">{m}</span>)}
          </div>
        </div>
      </div>

      {/* Popular Cities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="font-semibold text-gray-900 mb-4">Most Popular Destinations</p>
          <div className="space-y-3">
            {[
              { name: "Bali, Indonesia", count: 342, pct: 80 },
              { name: "Tokyo, Japan", count: 298, pct: 70 },
              { name: "Paris, France", count: 276, pct: 65 },
              { name: "Santorini, Greece", count: 241, pct: 57 },
              { name: "Cape Town, SA", count: 198, pct: 46 },
            ].map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{c.name}</span>
                  <span className="text-xs text-gray-500 font-medium">{c.count} trips</span>
                </div>
                <ProgressBar value={c.pct} max={100} color="bg-blue-400" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="font-semibold text-gray-900 mb-4">Engagement Metrics</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Avg Trip Duration", value: "9.2 days", icon: "📅" },
              { label: "Avg Budget/Trip", value: "$2,840", icon: "💰" },
              { label: "Most Active Region", value: "Asia Pacific", icon: "🌏" },
              { label: "Top Activity", value: "Food Tours", icon: "🍜" },
            ].map((m) => (
              <div key={m.label} className="bg-gray-50 rounded-xl p-4">
                <span className="text-xl">{m.icon}</span>
                <p className="font-bold text-gray-900 text-sm mt-1">{m.value}</p>
                <p className="text-xs text-gray-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <p className="font-semibold text-gray-900">Recent Users</p>
          <button className="text-sm text-blue-600 hover:underline">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["User", "Joined", "Trips", "Last Active", "Status"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Aryan Shah", email: "aryan@email.com", joined: "Jan 2024", trips: 7, last: "Today", status: "Active" },
                { name: "Sarah Mitchell", email: "sarah@email.com", joined: "Mar 2024", trips: 4, last: "2d ago", status: "Active" },
                { name: "James Okafor", email: "james@email.com", joined: "Jun 2024", trips: 2, last: "1w ago", status: "Inactive" },
                { name: "Priya Sharma", email: "priya@email.com", joined: "Aug 2024", trips: 9, last: "Yesterday", status: "Active" },
              ].map((u) => (
                <tr key={u.email} className="border-t border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {u.name.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{u.joined}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{u.trips}</td>
                  <td className="px-5 py-3 text-gray-500">{u.last}</td>
                  <td className="px-5 py-3">
                    <Badge className={u.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}>
                      {u.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":       return <LandingPage setPage={setPage} />;
      case "login":      return <LoginPage setPage={setPage} />;
      case "signup":     return <SignupPage setPage={setPage} />;
      case "forgot":     return <ForgotPage setPage={setPage} />;
      case "dashboard":  return <Dashboard setPage={setPage} />;
      case "trips":      return <MyTrips setPage={setPage} />;
      case "createtrip": return <CreateTrip setPage={setPage} />;
      case "itinerary":  return <ItineraryBuilder setPage={setPage} />;
      case "itinerary-view": return <ItineraryView setPage={setPage} />;
      case "cities":     return <CitySearch setPage={setPage} />;
      case "activities": return <ActivitySearch setPage={setPage} />;
      case "budget":     return <BudgetPage setPage={setPage} />;
      case "packing":    return <PackingPage setPage={setPage} />;
      case "journal":    return <JournalPage setPage={setPage} />;
      case "shared":     return <SharedTrip setPage={setPage} />;
      case "profile":    return <ProfilePage setPage={setPage} />;
      case "admin":      return <AdminAnalytics setPage={setPage} />;
      default:           return <LandingPage setPage={setPage} />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
}
