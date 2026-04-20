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
    document.getElementById('summary-sidebar').classList.toggle('active');
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

function sendEmailOrder() {
    if (selectedItems.length === 0) {
        alert("Your list is empty! Copy some S.Nos first.");
        return;
    }

    const email = "toetangle67@gmail.com";
    const subject = encodeURIComponent("New 3D Print Order Request");
    
    // Format the list with line breaks (%0D%0A is the code for a new line in email)
    const itemList = selectedItems.map(item => `• S.NO // ${item}`).join('%0D%0A');
    const body = encodeURIComponent(`Yo! I want to order the following prints:`) + `%0D%0A%0D%0A${itemList}%0D%0A%0D%0AConfirm the price with me in school!`;

    // Open the user's email client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

