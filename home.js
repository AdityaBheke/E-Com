// Products section

document.addEventListener('DOMContentLoaded',async ()=>{
    const productsContainer = document.querySelector('#products .card-container');
    const allProducts = await fetchProducts();
    // Initial rendering
    if (allProducts.length>=8) {
        renderProducts(allProducts.slice(0,8));
    } else {
        renderProducts(allProducts);
    }
    
    // Function to render products
    function renderProducts(productsList) {
        productsContainer.innerHTML = '';
        productsList.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'card';
            productCard.innerHTML = `
                <div class="card-image-container">
                    <img src="${product.image}" alt="">
                </div>
                <p class="card-title">${product.title}</p>
                <p class="card-product-price">$${product.price}</p>
            `;
            productsContainer.appendChild(productCard);
        });
    }

})

async function fetchProducts() {
    const url = 'https://fakestoreapi.com/products';
    let productsList = [];
    try {
        const response = await fetch(url);
        productsList = await response.json();
    } catch (error) {
        console.log('Error while fetching products on home page');
    }
    return productsList;
}