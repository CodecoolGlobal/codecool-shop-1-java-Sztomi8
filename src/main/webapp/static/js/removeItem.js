
export function removeItemExport() {removeItem()}

function removeItem() {
    const removeButtons = document.getElementsByClassName('remove-item-from-cart');
    const cartItemContainer = document.getElementById("current-item-container");
    for (const removeButton of removeButtons) {
        removeButton.addEventListener('click', () => {
            fetch(`/api/session/remove?item=${removeButton.id}`)
                .then(response => response.json())
                .then(data => {
                    let newContent = "";
                    for (let product of data) {
                        newContent += `  
                    <div class="media mb-3">
                      <img class="d-flex z-depth-1 rounded mr-3" width="64px"
                           src='/static/img/product_${product.id}.jpg' alt="Sample">
                      <div class="media-body">
                        <h5>${product.name}</h5>
                        <p class="mb-0"><span><strong>${product.defaultPrice} ${product.defaultCurrency}</strong></span></p>
                      </div>
                      <img id="${product.name}" class="d-flex z-depth-1 rounded mr-3 remove-item-from-cart" width="24px"
                           src='/static/img/red_x.png' alt="Red X">
                    </div>
                `
                    }
                    if (newContent === "") {
                        cartItemContainer.innerHTML = "No item selected yet!";
                    } else {
                        cartItemContainer.innerHTML = newContent;
                    }
                    removeItem();
                })
        })
    }
}