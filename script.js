function copyToClipboard(sNo) {
    const text = "Yo! I want to order S.No: " + sNo;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied: " + text + ". Now paste it in my DMs!");
    });
}

let selectedItems = [];

function revealCatalog() {
    const hero = document.getElementById('hero-screen');
    hero.classList.add('slide-up');
    
    // Optional: Remove it from the DOM after animation to save memory
    setTimeout(() => {
        hero.style.display = 'none';
    }, 800);
}

let typedKeys = "";

window.addEventListener('keydown', (e) => {
    // Add the key to our string
    typedKeys += e.key;
    
    // Only keep the last 5 characters (length of "Admin")
    typedKeys = typedKeys.slice(-5);

    // Check if the secret word was typed
    if (typedKeys.toLowerCase() === "admin") {
        revealCatalog(); // Triggers the roll-up animation
        console.log("Admin override active.");
        typedKeys = ""; // Reset so it can be typed again
    }
});


function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    // Toggle a class that changes the left/right position
    sidebar.classList.toggle('active');
}

function copyToClipboard(sNo, event) {
    // Add to list
    if (!selectedItems.includes(sNo)) {
        selectedItems.push(sNo);
        updateSidebar();
    }

    // Copy to clipboard
    const text = "Yo! I want to order S.No: " + sNo;
    navigator.clipboard.writeText(text);
}

function togglePatchNotes() {
    const content = document.getElementById('patch-content');
    const arrow = document.getElementById('patch-arrow');
    
    content.classList.toggle('active');
    arrow.classList.toggle('rotated');
}

function updateSidebar() {
    const itemsList = document.getElementById('cart-items');
    itemsList.innerHTML = selectedItems.map(item => `<div>S.NO // ${item}</div>`).join('');
    document.getElementById('cart-count').innerText = selectedItems.length;
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
    // Adding 'cart-item-entry' for the script to find
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

    // Clear inputs
    document.getElementById('customFileLink').value = '';
    document.getElementById('customDetails').value = '';
}

function submitOrder() {
    const name = document.getElementById('orderName').value;
    const sClass = document.getElementById('orderClass').value;
    const sSection = document.getElementById('orderSection').value;
    const shawarmaFund = document.getElementById('shawarmaCheck').checked;

    // Tactical Fix: Select all child divs in the cart regardless of text
    const cartEntries = document.querySelectorAll('#cart-items .cart-item-entry');
    let itemDetails = [];
    
    cartEntries.forEach(entry => {
        // This captures whatever text is inside the entry
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
    const email = "toetangle67@gmail.com";
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

function toggleGuide() {
    const guide = document.getElementById('guide-box');
    guide.classList.toggle('active');
    
    // Auto-scroll to show the guide if it's opened on small screens
    if(guide.classList.contains('active')) {
        setTimeout(() => {
            guide.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
}

function addCustomToLog() {
    const fileLink = document.getElementById('customFileLink').value;
    const details = document.getElementById('customDetails').value;
    const cartItems = document.getElementById('cart-items');
    
    if(!fileLink && !details) {
        alert("ERROR: NO DATA DETECTED IN UPLOAD FIELDS.");
        return;
    }

    const customEntry = document.createElement('div');
    customEntry.className = 'cart-item-entry'; // Uses your existing styling
    customEntry.innerHTML = `
        <p><strong>CUSTOM:</strong> ${fileLink || "No Link"}</p>
        <p style="font-size: 0.7rem; opacity: 0.7;">Note: ${details || "No details"}</p>
        <hr style="border: 0.5px solid rgba(255,255,255,0.1)">
    `;
    
    cartItems.appendChild(customEntry);
    updateCartCount(); // Updates the "X Items" button
    
    // Clear fields
    document.getElementById('customFileLink').value = '';
    document.getElementById('customDetails').value = '';
}
