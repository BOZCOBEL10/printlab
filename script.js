// --- STATE MANAGEMENT ---
// Changed to an array of objects to track quantity: { sNo: "string", count: number }
let selectedItems = [];

// --- UI TOGGLE FUNCTIONS ---

function showOrderForm(type) {
    const formContainer = document.getElementById('order-form-container');
    const comingSoonContainer = document.getElementById('coming-soon-container');

    if (type === 'inschool') {
        formContainer.style.display = 'block';
        comingSoonContainer.style.display = 'none';
    } else if (type === 'others') {
        formContainer.style.display = 'none';
        comingSoonContainer.style.display = 'block';
    }
}

function revealCatalog() {
    const hero = document.getElementById('hero-screen');
    hero.classList.add('slide-up');
    setTimeout(() => {
        hero.style.display = 'none';
    }, 800);
}

function toggleSidebar() {
    const sidebar = document.getElementById('summary-sidebar');
    sidebar.classList.toggle('active');
}

function togglePatchNotes() {
    const content = document.getElementById('patch-content');
    const arrow = document.getElementById('patch-arrow');
    content.classList.toggle('active');
    arrow.classList.toggle('rotated');
}

function toggleGuide() {
    const guide = document.getElementById('guide-box');
    guide.classList.toggle('active');
    if(guide.classList.contains('active')) {
        setTimeout(() => {
            guide.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
}

// --- DATA & CART FUNCTIONS ---

function copyToClipboard(sNo) {
    // 1. Logic to increment count or add new item
    const existingItem = selectedItems.find(item => item.sNo === sNo);
    
    if (existingItem) {
        existingItem.count += 1;
    } else {
        selectedItems.push({ sNo: sNo, count: 1 });
    }
    
    // 2. Update Sidebar
    updateSidebar();

    // 3. Clipboard Logic
    const text = "Yo! I want to order S.No: " + sNo;
    navigator.clipboard.writeText(text).then(() => {
        alert("Added to log: " + sNo);
    });
}

function updateSidebar() {
    const itemsList = document.getElementById('cart-items');
    
    // Filter out Custom entries (we only want to rebuild the S.No items)
    // We assume custom entries have a different class or identifier. 
    // Here we clear only the entries that match the standard format.
    // NOTE: This logic assumes you have a way to keep custom items. 
    // To be safe, let's just clear everything that looks like an S.No entry
    const entries = itemsList.querySelectorAll('.cart-item-entry');
    entries.forEach(entry => {
        if (!entry.querySelector('[style*="border-left"]')) { // Don't delete custom requests
            entry.remove();
        }
    });
    
    // Inject the elements
    selectedItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item-entry';
        // Add (xN) if count > 1
        const displayLabel = item.count > 1 ? `S.NO // ${item.sNo} (x${item.count})` : `S.NO // ${item.sNo}`;
        div.innerText = displayLabel;
        itemsList.appendChild(div);
    });

    updateCartCount();
}

function updateCartCount() {
    const count = document.querySelectorAll('.cart-item-entry').length;
    document.getElementById('cart-count').innerText = count;
}

function addCustomToLog() {
    const fileLink = document.getElementById('customFileLink').value;
    const details = document.getElementById('customDetails').value;
    const cartItems = document.getElementById('cart-items');
    
    if(!fileLink && !details) {
        alert("ERROR: TERMINAL DATA EMPTY.");
        return;
    }

    const customEntry = document.createElement('div');
    customEntry.className = 'cart-item-entry'; 
    customEntry.innerHTML = `
        <div style="border-left: 2px solid #00bfff; padding: 10px; margin-bottom: 10px; background: rgba(0,191,255,0.05);">
            <p style="font-size: 0.8rem; color: #00bfff; font-weight: bold;">[ CUSTOM REQUEST ]</p>
            <p style="font-size: 0.7rem;">LINK: ${fileLink || "N/A"}</p>
            <p style="font-size: 0.7rem; opacity: 0.8;">DATA: ${details || "None"}</p>
        </div>
    `;
    
    cartItems.appendChild(customEntry);
    updateCartCount(); 
    document.getElementById('summary-sidebar').classList.add('active');

    document.getElementById('customFileLink').value = '';
    document.getElementById('customDetails').value = '';
}

function submitOrder() {
    const name = document.getElementById('orderName').value;
    const sClass = document.getElementById('orderClass').value;
    const sSection = document.getElementById('orderSection').value;
    const shawarmaFund = document.getElementById('shawarmaCheck').checked;

    const cartEntries = document.querySelectorAll('#cart-items .cart-item-entry');
    let itemDetails = [];
    
    cartEntries.forEach(entry => {
        itemDetails.push(entry.innerText.replace(/\n/g, " ").trim());
    });

    if(!name || !sClass || !sSection) {
        alert("CRITICAL: OPERATOR DATA INCOMPLETE.");
        return;
    }
    
    if(itemDetails.length === 0) {
        alert("ERROR: NO ITEMS DETECTED IN DEPLOYMENT LOG.");
        return;
    }

    let shawarmaLine = shawarmaFund ? "\nAdd 300 baiza to this order as a tip!\n" : "";
    const productList = itemDetails.join('\n- ');
    const email = "printlab.shop@proton.me";
    const subject = `PrintLab Order: ${name} (${sClass}-${sSection})`;
    
    const body = `TACTICAL ORDER DEPLOYED\n\nOPERATOR: ${name}\nCLASS: ${sClass}\nSECTION: ${sSection}\n${shawarmaLine}\nITEMS REQUESTED:\n- ${productList}\n\n--------------------------

[ SAFETY & LIABILITY DISCLAIMER ]

PrintLab items are intended for display and collection only.

Some models may have sharp edges or points. Handle with care.

PrintLab is not responsible for any injury or misuse of 3D-printed assets.

(By submitting this order you agree to not blaming us if you do dumb stuff)

--------------------------`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// --- ADMIN KEY COMMAND ---

let typedKeys = "";
window.addEventListener('keydown', (e) => {
    typedKeys += e.key;
    typedKeys = typedKeys.slice(-5);
    if (typedKeys.toLowerCase() === "admin") {
        revealCatalog();
        typedKeys = "";
    }
});

// --- VIEW SWITCHING ---
function showOrderForm(type) {
    const formContainer = document.getElementById('order-form-container');
    const comingSoonContainer = document.getElementById('coming-soon-container');

    // This logic toggles between the form and a placeholder for other categories
    if (type === 'inschool') {
        formContainer.style.display = 'block';
        comingSoonContainer.style.display = 'none';
    } else if (type === 'others') {
        formContainer.style.display = 'none';
        comingSoonContainer.style.display = 'block';
    }
}

// --- SUPPORT DATA LOGGING ---
function addCustomsToLog() {
    const name = document.getElementById('orderName').value;
    const sClass = document.getElementById('orderClass').value;
    const sSection = document.getElementById('orderSection').value;
    const fileLink = document.getElementById('customFileLink').value;
    const details = document.getElementById('customDetails').value;
    
    // 1. Validation: Ensure required fields are populated
    if(!name || sClass === "CLASS" || sSection === "SECTION" || !details) {
        alert("CRITICAL: PLEASE FILL IN ALL REQUIRED SUPPORT FIELDS.");
        return;
    }

    // 2. Construct the Email
    const email = "printlab.shop@proton.me";
    const subject = `PrintLab Support Ticket: ${name} (${sClass}-${sSection})`;
    const body = `TACTICAL SUPPORT TICKET\n\nOPERATOR: ${name}\nCLASS: ${sClass}\nSECTION: ${sSection}\n\nFILE LINK: ${fileLink || "N/A"}\nDETAILS: ${details}\n\n--------------------------\n[ SYSTEM GENERATED TICKET ]`;

    // 3. Trigger the email client
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // 4. Clear inputs[cite: 5]
    document.getElementById('customFileLink').value = '';
    document.getElementById('customDetails').value = '';
    document.getElementById('orderName').value = '';
}

// --- HELPER TO UPDATE CART UI ---
function updateCartCount() {
    // Calculates total entries based on the DOM elements[cite: 5]
    const count = document.querySelectorAll('.cart-item-entry').length;
    document.getElementById('cart-count').innerText = count;
}

function openTOS() {
    document.getElementById('tos-popup').style.display = 'flex';
}

function closeTOS() {
    document.getElementById('tos-popup').style.display = 'none';
    revealCatalog(); // This triggers your existing catalog reveal
}
