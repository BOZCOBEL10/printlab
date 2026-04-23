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
    const name = document.getElementById('orderName').value;
    const sClass = document.getElementById('orderClass').value;
    const sSection = document.getElementById('orderSection').value;
    const shawarmaFund = document.getElementById('shawarmaCheck').checked; // Detect the checkbox

    const cartEntries = document.querySelectorAll('.cart-items div, .cart-items p');
    let itemIds = [];
    cartEntries.forEach(entry => {
        if(entry.innerText.includes('S.NO')) {
            itemIds.push(entry.innerText.trim());
        }
    });

    if(!name || !sClass || !sSection) {
        alert("CRITICAL: OPERATOR DATA INCOMPLETE.");
        return;
    }
    if(itemIds.length === 0) {
        alert("ERROR: NO ITEMS DETECTED IN DEPLOYMENT LOG.");
        return;
    }

    // TACTICAL ADDITION: Shawarma Logic
    let shawarmaLine = "";
    if (shawarmaFund) {
        shawarmaLine = "\nAdd 300 baiza to this order as a tip!\n";
    }

    const productList = itemIds.join('\n- ');
    const email = "toetangle67@gmail.com";
    const subject = `PrintLab Order: ${name} (${sClass}-${sSection})`;
    
    const body = `TACTICAL ORDER DEPLOYED\n\nOPERATOR: ${name}\nCLASS: ${sClass}\nSECTION: ${sSection}\n${shawarmaLine}\nITEMS REQUESTED:\n- ${productList} \n--------------------------
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
