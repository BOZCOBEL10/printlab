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

function submitOrder() {
    // 1. Grab User Details
    const name = document.getElementById('orderName').value;
    const sClass = document.getElementById('orderClass').value;
    const sSection = document.getElementById('orderSection').value;

    // 2. Grab ALL Serial Numbers from the sidebar
    // This finds every element containing "S.NO" inside the cart-items container
    const cartEntries = document.querySelectorAll('.cart-items div, .cart-items p');
    let itemIds = [];
    
    cartEntries.forEach(entry => {
        if(entry.innerText.includes('S.NO')) {
            itemIds.push(entry.innerText.trim());
        }
    });

    // 3. Validation Logic
    if(!name || !sClass || !sSection) {
        alert("CRITICAL: OPERATOR DATA INCOMPLETE.");
        return;
    }
    if(itemIds.length === 0) {
        alert("ERROR: NO ITEMS DETECTED IN DEPLOYMENT LOG.");
        return;
    }

    // 4. Format and Send
    const productList = itemIds.join('\n- ');
    const email = "toetangle67@gmail.com";
    const subject = `PrintLab Order: ${name} (${sClass}-${sSection})`;
    const body = `Yo I wanna order some stuff!\n\nI'm ${name}\nCLASS: ${sClass}\nSECTION: ${sSection}\n\nITEMS REQUESTED:\n- ${productList}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
