// --- Data for baskets ---
const baskets = [
  {
    id: "food",
    title: "Food Basket",
    price: "$15–20",
    items: [
      "Rice (1 kg)",
      "Pasta (500 g)",
      "Canned vegetables (2 cans)",
      "Canned soup (2 cans)",
      "Peanut butter (1 jar)",
      "Instant noodles (3 packs)",
      "Crackers (1 box)",
      "Tea or coffee (small pack)",
      "Shelf-stable milk (1 L)",
      "Granola bars (4)",
      "Canned fruit (1 can)",
      "Oatmeal (6 instant servings)",
      "Cooking oil (250 ml)"
    ],
    img: "assets/food_basket.jpg",
    ai: "Food baskets are in high demand in your area. Thank you for helping fight hunger!"
  },
  {
    id: "hygiene",
    title: "Hygiene Basket",
    price: "$10–15",
    items: [
      "Bar soap (2 pcs)",
      "Toothpaste (1 tube)",
      "Toothbrushes (2 pcs)",
      "Shampoo (250 ml)",
      "Conditioner (250 ml)",
      "Deodorant (1 stick)",
      "Wet wipes (1 pack)",
      "Hand sanitizer (50–100 ml)",
      "Feminine hygiene products (1 pack)",
      "Comb or small hairbrush (1)",
      "Disposable face masks (5 pcs)",
      "Nail clippers (1 set)",
      "Body lotion (100 ml)"
    ],
    img: "assets/hygiene_basket.jpg",
    ai: "Hygiene products are urgently needed in local shelters. Your donation makes a difference!"
  },
  {
    id: "medicine",
    title: "Medicine Basket",
    price: "$20–25",
    items: [
      "Basic first aid kit (bandages, antiseptic wipes, gauze)",
      "Pain relievers (ibuprofen or acetaminophen)",
      "Thermometer (digital)",
      "Cough drops (1 pack)",
      "Multivitamins (small bottle)",
      "Antiseptic cream (1 tube)",
      "Cotton swabs (1 pack)",
      "Hand sanitizer (medium bottle)",
      "Reusable hot/cold pack (1)",
      "Allergy medicine (antihistamine pack)",
      "Disposable gloves (1 pair)",
      "Face masks (5 pcs)",
      "Emergency contact card (blank)"
    ],
    img: "assets/medicine_basket.jpg",
    ai: "Medicine baskets are critical for families without easy access to healthcare. Your support can make a real difference in emergencies."
  },
  {
    id: "baby",
    title: "Baby Care Basket",
    price: "$25–30",
    items: [
      "Diapers (small pack)",
      "Baby wipes (1 pack)",
      "Baby lotion (100 ml)",
      "Baby shampoo (tear‑free, 250 ml)",
      "Baby food jars (4)",
      "Infant formula (small container)",
      "Pacifier (1)",
      "Baby blanket (1 soft fleece blanket)",
      "Onesie or baby outfit (1 piece)",
      "Small toy or rattle (1)",
      "Burp cloths (2)",
      "Disposable changing pads (2)"
    ],
    img: "assets/baby_basket.jpg",
    ai: "Baby care items are highly requested by new parents in shelters. Your basket will bring comfort to both babies and caregivers."
  },
  {
    id: "custom",
    title: "Customizable Basket",
    price: "$15–30",
    items: [
      "Mix-and-match: Choose items from food, hygiene, medicine, or baby care.",
      "Price adjusts based on items chosen."
    ],
    img: "assets/custom_basket.jpg",
    ai: "Consider adding hygiene and medicine items — these are among the most requested by community centers this month."
  }
];

// --- Data for custom basket categories ---
const categories = [
  {
    id: "Food",
    items: ["Rice", "Pasta", "Canned goods", "Peanut butter", "Snacks"]
  },
  {
    id: "Hygiene",
    items: ["Soap", "Shampoo", "Wipes", "Feminine products"]
  },
  {
    id: "Medicine",
    items: ["First aid basics", "Pain relievers", "Vitamins"]
  },
  {
    id: "Baby Care",
    items: ["Diapers", "Wipes", "Formula", "Baby food"]
  }
];

// --- Navigation logic ---
function navigate(view) {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
  document.getElementById(view).classList.remove('hidden');
  if(view === "donor") renderBaskets();
  if(view === "donee") renderDoneeCategories();
}

// --- Render basket cards for donor ---
function renderBaskets() {
  const container = document.getElementById('baskets-list');
  container.innerHTML = "";
  baskets.forEach(basket => {
    const card = document.createElement('div');
    card.className = "basket-card";
    card.innerHTML = `
      <img src="${basket.img}" alt="${basket.title}" class="basket-img" onerror="this.src='assets/placeholder.png'">
      <div class="basket-title">${basket.title}</div>
      <div class="basket-price">${basket.price}</div>
      <ul class="item-list">${basket.items.map(i => `<li>${i}</li>`).join('')}</ul>
      <button class="select-btn" onclick="selectBasket('${basket.id}')">Select Basket</button>
    `;
    container.appendChild(card);
  });
}

// --- Select basket and show confirmation with AI suggestion ---
function selectBasket(id) {
  const basket = baskets.find(b => b.id === id);
  document.getElementById("thank-you-msg").textContent = "Thank you! Your basket will bring hope to someone in need.";
  document.getElementById("ai-suggestion-msg").textContent = "AI Suggestion: " + basket.ai;
  document.getElementById("confirmation-modal").classList.remove("hidden");
}

// --- AI Search Bar in donor page ---
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('ai-search-btn').onclick = function() {
    const q = document.getElementById('ai-search-input').value.trim().toLowerCase();
    let answer = "Food baskets are currently the most needed in your area. Thank you for your support!";
    if(q.includes("medicine")) answer = "Medicine baskets are especially urgent for families without easy healthcare access.";
    else if(q.includes("baby")) answer = "Baby care items are highly requested by new parents in shelters.";
    else if(q.includes("hygiene")) answer = "Hygiene baskets are urgently needed in local shelters.";
    else if(q.includes("custom")) answer = "Consider including hygiene and medicine items for maximum impact!";
    document.getElementById('ai-search-input').value = "";
    alert("AI Suggestion: " + answer);
  };

  // Modal close logic
  document.getElementById('close-modal').onclick = function() {
    document.getElementById("confirmation-modal").classList.add("hidden");
  };
  window.onclick = function(e) {
    if(e.target === document.getElementById("confirmation-modal")) {
      document.getElementById("confirmation-modal").classList.add("hidden");
    }
  };

  // Homepage button logic
  document.getElementById('donee-btn').onclick = () => navigate('donee');
  document.getElementById('donor-btn').onclick = () => navigate('donor');
});

// --- DONEE: Build a basket page (pick what they want) ---
function renderDoneeCategories() {
  document.getElementById("customize-section").classList.remove("hidden");
  document.getElementById("donee-confirmation").classList.add("hidden");
  const cont = document.getElementById("categories-container");
  cont.innerHTML = "";
  categories.forEach(cat => {
    const box = document.createElement('div');
    box.className = "category-box";
    box.innerHTML = `<div class="category-title">${cat.id}</div>
      <div class="category-items">
        ${cat.items.map(item => `
          <label>
            <input type="checkbox" value="${item}" name="cat_${cat.id}"> ${item}
          </label>
        `).join('')}
      </div>
    `;
    cont.appendChild(box);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("submit-donee").onclick = function() {
    const selected = [];
    categories.forEach(cat => {
      document.querySelectorAll(`input[name="cat_${cat.id}"]:checked`).forEach(cb => selected.push(cb.value));
    });
    if(selected.length === 0) {
      alert("Please select at least one item for your basket.");
      return;
    }
    document.getElementById("customize-section").classList.add("hidden");
    document.getElementById("donee-confirmation").classList.remove("hidden");
    // AI message for donee
    let aiMsg = "AI Suggestion: Great selection! ";
    if(selected.includes("Rice") || selected.includes("Pasta")) aiMsg += "Staple foods help fight hunger.";
    if(selected.includes("Soap") || selected.includes("Shampoo")) aiMsg += " Hygiene items are always needed.";
    if(selected.includes("First aid basics") || selected.includes("Pain relievers")) aiMsg += " Medicine items are vital for health emergencies.";
    if(selected.includes("Diapers") || selected.includes("Formula")) aiMsg += " Baby care products are among the top requests.";
    document.getElementById("donee-ai-msg").textContent = aiMsg;
  };
});

// Hide modal on esc
document.addEventListener("keydown", function(e) {
  if(e.key === "Escape") {
    document.getElementById("confirmation-modal").classList.add("hidden");
  }
});
