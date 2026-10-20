import { StoreCatalog } from "./src/store.js";

// Initialize our core store logic module instance
var store = new StoreCatalog();

function setup() {
    var mainContainer = document.getElementById("mainContainer");
    if (mainContainer) {
        renderCatalog(store, mainContainer);
    }
}

// Ensure the page layouts completely load before running DOM modifications
document.addEventListener("DOMContentLoaded", setup);

// Generates product cards inside the catalog panel layout grid
function renderCatalog(storeInstance, container) {
    container.innerHTML = "";   
    
    for (const item of storeInstance.products) {
        const card = document.createElement("div");
        card.classList.add("productCard");

        // Set up interior child nodes structure 
        const nameEl = document.createElement("div");
        nameEl.classList.add("productName");
        nameEl.innerHTML = item.name;

        const priceEl = document.createElement("div");
        priceEl.classList.add("productPrice");
        priceEl.innerHTML = `$${item.price}`;

        const addBtn = document.createElement("button");
        addBtn.classList.add("addBtn");
        addBtn.innerHTML = "Add to Cart";
        
        // Handle selection event bindings
        addBtn.onclick = () => {
            storeInstance.addProductToCart(item);
            updateCartUI(storeInstance);
        };

        card.appendChild(nameEl);
        card.appendChild(priceEl);
        card.appendChild(addBtn);
        
        container.appendChild(card);
    }
}

// Safely updates tracking summaries inside our sidebar panel 
function updateCartUI(storeInstance) {
    const cartListContainer = document.getElementById("selectedProductsElement");
    const totalDisplayElement = document.getElementById("totalElement");
    
    if (!cartListContainer || !totalDisplayElement) return;
    
    cartListContainer.innerHTML = "";
    
    // Explicit manual array loop to append row blocks matching professor's preferences
    for (const item of storeInstance.cart) {
        const row = document.createElement("div");
        row.classList.add("cartItemRow");

        const label = document.createElement("span");
        label.innerHTML = `${item.product.name} - $${item.product.price}`;

        const controls = document.createElement("div");
        controls.classList.add("quantityControls");

        // Decrement step trigger button
        const minusBtn = document.createElement("button");
        minusBtn.classList.add("qtyBtn");
        minusBtn.innerHTML = "-";
        minusBtn.onclick = () => {
            storeInstance.changeQuantity(item.product.id, -1);
            updateCartUI(storeInstance);
        };

        const qtyValue = document.createElement("span");
        qtyValue.innerHTML = item.quantity;

        // Increment step trigger button
        const plusBtn = document.createElement("button");
        plusBtn.classList.add("qtyBtn");
        plusBtn.innerHTML = "+";
        plusBtn.onclick = () => {
            storeInstance.changeQuantity(item.product.id, 1);
            updateCartUI(storeInstance);
        };

        controls.appendChild(minusBtn);
        controls.appendChild(qtyValue);
        controls.appendChild(plusBtn);

        row.appendChild(label);
        row.appendChild(controls);
        
        cartListContainer.appendChild(row);
    }
    
    // Calculate and apply mathematical sums onto output labels
    const exactSumValue = storeInstance.getCartTotal();
    totalDisplayElement.innerHTML = `$${exactSumValue}`;
}

