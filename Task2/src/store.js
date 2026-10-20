import { initialProducts } from "./products.js";

class StoreCatalog {
    constructor() {
        // Load the 5 university products into the store inventory state
        this.products = initialProducts;
        // Start with a completely empty shopping cart array
        this.cart = [];
    }

    // Helper method matching your professor's "checkAvailability" loop pattern
    // Loops through the cart to find if a product index position already exists
    findCartItemIndex = (productId) => {
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].product.id == productId) {
                return i; // Returns the index position (0, 1, 2...) if found
            }
        }
        return -1; // Returns -1 if the item is not inside the cart yet
    }

    // Adds a product to the cart or increments it if it already exists
    addProductToCart = (product) => {
        const existingIndex = this.findCartItemIndex(product.id);

        if (existingIndex !== -1) {
            // If it is already there, increment the quantity value by 1
            this.cart[existingIndex].quantity += 1;
        } else {
            // Otherwise, create a clean object structure for a new item row
            const cartItem = {
                product: product,
                quantity: 1
            };
            this.cart.push(cartItem);
        }
    }

    // Increments or decrements item quantities dynamically via buttons (+1 or -1)
    changeQuantity = (productId, amount) => {
        const itemIndex = this.findCartItemIndex(productId);
        
        if (itemIndex !== -1) {
            this.cart[itemIndex].quantity += amount;
            
            // If the quantity drops down to 0 or lower, erase it from the cart entirely
            if (this.cart[itemIndex].quantity <= 0) {
                this.cart.splice(itemIndex, 1);
            }
        }
    }

    // Linearly sums up total accumulated costs (Quantity multiplied by Item Price)
    getCartTotal = () => {
        let totalSum = 0;
        for (const item of this.cart) {
            totalSum += item.product.price * item.quantity;
        }
        return totalSum;
    }
}

export { StoreCatalog };

