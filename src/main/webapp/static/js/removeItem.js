
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
                      <div class=”counter” style="width: 15%; display: flex; justify-content: space-between;align-items: center">
                            <div class="add-button" style="color:#202020;font-size:20px;width:40px;height:40px;border-radius:50%;background-color:#d9d9d9;
                             display:flex;justify-content:center;align-items:center;font-weight:300;cursor:pointer">+</div>
                             
                            <div class=”count” style="font-size: 20px; font-weight: 300; color: #202020">1</div>
                            
                            <div class="minus-button" style="color:#202020;font-size:20px;width:40px;height:40px;border-radius:50%;background-color:#d9d9d9;
                             display:flex;justify-content:center;align-items:center;font-weight:300;cursor:pointer">-</div>
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