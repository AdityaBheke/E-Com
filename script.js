const productListContainer = document.getElementById('products-list');

async function fetchProducts() {
    try {
      const response = await fetch("./products.json");
      const result = await response.json();
      result.forEach(product => {
        const colContainer = document.createElement('div');
        colContainer.classList.add('col-lg-3', 'col-md-4', 'col-sm-6');
        colContainer.innerHTML = `<div class="card">
                        <img src=${product.image} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><small class="text-body-secondary">$${product.price}</small></p>
                            <a href="#" class="btn btn-primary">Add to cart</a>
                        </div>
                    </div>`;
        productListContainer.append(colContainer);
    });
      console.log(result);
    } catch (error) {
        console.log('Error while fetching products');
    }
}
fetchProducts();