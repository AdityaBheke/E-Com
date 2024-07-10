// Products Page
const productListContainer = document.getElementById('products-list');

async function fetchProducts() {
    try {
      const url = 'https://fakestoreapi.com/products';
      // const url = "./products.json";
      const response = await fetch(url);
      const result = await response.json();
      result.forEach(product => {
        const colContainer = document.createElement('div');
        colContainer.classList.add('col-lg-3', 'col-md-4', 'col-sm-6');
        colContainer.innerHTML = `<div class="card mb-3">
                        <img src="${product.image}" class="card-img-top" style="width:100%; height:250px" alt="...">
                        <div class="card-body">
                            <h5 class="card-title" style="height:4em; overflow:hidden">${product.title}</h5>
                            <p class="card-text" style="height:10.5em; overflow:hidden">${product.description}</p>
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
