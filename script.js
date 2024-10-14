const products = [
    {
        id: 1,
        name: "Sofa Dark Grey",
        price: 34852,
        image: "imges/StpSdp-blob.jfif"
    },
    {
        id: 2,
        name: "Sofa With Banquette",
        price: 22025,
        image: "imges/NTmuXV-blob.jfif"
    },
    {
        id: 3,
        name: "Sofa Black",
        price: 17584,
        image: "imges/Iqb0qA-blob.webp"
    },
    {
        id: 4,
        name: "Sofa Orange",
        price: 31850,
        image: "imges/F3nBsZ-blob.webp"
    },
    {
        id: 5,
        name: "Sofa White",
        price: 14852,
        image: "imges/7m1AvJ-blob.png"
    },
    {
        id: 6,
        name: "Chair White",
        price: 10000,
        image: "imges/images (5).jfif"
    }
];



let cartCount = 0;
const cartItems = [];

function saveCartToLocalStorage() {
    const cartData = {
        count: cartCount,
        items: cartItems
    };
    localStorage.setItem('cartData', JSON.stringify(cartData));
}

function loadCartFromLocalStorage() {
    const cartData = JSON.parse(localStorage.getItem('cartData'));
    if (cartData) {
        cartCount = cartData.count;
        cartData.items.forEach(item => {
            item.quantity = item.quantity || 1; 
            cartItems.push(item);
        });
    }
}

function addToCart(product) {
    cartCount++;
    document.getElementById('cartCount').innerText = cartCount;

    const existingItem = cartItems.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        product.quantity = 1;
        cartItems.push(product);
    }
    updateCart();
    saveCartToLocalStorage();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartItemsDiv.innerHTML = '<p>سلتك فارغة</p>';
    } else {
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('items');
            itemDiv.innerHTML = `
                <div class="cartImg"><img src="${item.image}" alt=""></div>
                <h6>${item.name}</h6>
                <span>${item.price} EGP</span>
                <button class="plus" onclick="increaseQuantity('${item.name}')">+</button>
                <span class="itmCount">${item.quantity}</span>
                <button class="minus" onclick="decreaseQuantity('${item.name}')">-</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
        const totalDiv = document.createElement('div');
        totalDiv.innerHTML = `<strong>السعر الكلي: ${totalPrice} EGP</strong>`;
        cartItemsDiv.appendChild(totalDiv);
    }
}

function increaseQuantity(name) {
    const item = cartItems.find(item => item.name === name);
    if (item) {
        item.quantity++;
        updateCart();
        saveCartToLocalStorage();
    }
}

function decreaseQuantity(name) {
    const item = cartItems.find(item => item.name === name);
    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            const index = cartItems.indexOf(item);
            cartItems.splice(index, 1);
            cartCount--;
        }
        document.getElementById('cartCount').innerText = cartCount;
        updateCart();
        saveCartToLocalStorage();
    }
}

function logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('cartData'); 
   
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const product = products.find(p => p.name === productName);
        addToCart(product);
    });
});

window.onload = function () {
    loadCartFromLocalStorage();
    updateCart();
    document.getElementById('cartCount').innerText = cartCount;
};

// login
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault(); 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    localStorage.setItem('email', email);
    localStorage.setItem('password', password); 

  
    window.location.href = 'index.html'; 
});
