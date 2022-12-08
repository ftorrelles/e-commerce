const iconMenu = document.querySelector(".bx-grid-alt");
const menuNav = document.querySelector(".menu_nav");

iconMenu.addEventListener("click", function () {
    iconMenu.classList.toggle("bx-x");
    menuNav.classList.toggle("menu_nav-show");
});

const Cerrar = document.querySelectorAll('.menu_nav a[href^="#"]');

Cerrar.forEach((cerrar) => {
    cerrar.addEventListener("click", function () {
        iconMenu.classList.toggle("bx-x");
        menuNav.classList.remove("menu_nav-show");
    });
});
/////////////////////////////////////////////////////////

/////Base de datos ropa///////////////
let clothingDataBase = [
    {
        id: 1,
        name: "Hoodies",
        urlImage: "./src/img/Hoodies.png",
        price: 14.0,
        stock: 9,
        line: "hoodies",
    },
    {
        id: 2,
        name: "Shirts",
        urlImage: "./src/img/Shirts.png",
        price: 24.0,
        stock: 14,
        line: "shirts",
    },
    {
        id: 3,
        name: "Sweatshirts",
        urlImage: "./src/img/Sweatshirts.png",
        price: 24.0,
        stock: 19,
        line: "sweatshirts",
    },
];

///////document.querySelector/////////
const productsCards = document.querySelector(".products-cards");
const icomShoppingBag = document.querySelector(".bx-shopping-bag");
const contentBagShop = document.querySelector(".content-bag-shop");
const icomShoppingX = document.querySelector(".bx-x");
const contentBagShopItems = document.querySelector(".content-bag-shop_items");
const contentBagShopTotal = document.querySelector(".content-bag-shop_total");
const amountBag = document.querySelector(".count_bag");
////////funciones de pintar////////////
let ObjetBagShop = {};

function printCards() {
    let html = "";

    clothingDataBase.forEach(({ id, name, urlImage, price, stock, line }) => {
        //agregar bt cuando se agota
        const btBuy = stock
            ? `<button class="card-bt" id="${id}">+</button>`
            : `<button class="btNotAvailable">Agotado</button>`;
        html += `
        <div class="product-card ${line}">
            <div class="card-img">
                <img src="${urlImage}" alt="${name}">
            </div>
            ${btBuy}
            <div class="card-inf">                                                
                <div class="card_price-stock">
                    <span><b class="price">$${price.toFixed(
                        2
                    )}</b> | Stock: ${stock}</span>
                </div>
                <h3>${name}</h3>
            </div>
        </div>
    `;
    });
    productsCards.innerHTML = html;
    printTotal();
}

function printBagShop() {
    let html = "";

    const arrayBagShop = Object.values(ObjetBagShop);

    arrayBagShop.forEach(({ id, name, urlImage, price, amount, stock }) => {
        html += `
        <div class="product-card-bag">
            <div class="card-bag-img">
                <img src="${urlImage}" alt="${name}">
            </div>            
            <div class="card-bag-inf">
                <h3>${name}</h3>
                <span>Stock: ${stock}</span>                                              
                <p class="card-bag-price">Price: $ ${price.toFixed(2)}</p>
                <div class="card-bag-bt">
                    <button class="bag-bt less" id="${id}">-</button>
                    <span><strong>${amount} units</strong></span>
                    <button class="bag-bt add" id="${id}">+</button>
                    <i class='bx bx-trash-alt' id="${id}"></i>
                </div> 
            </div>
        </div>
    `;
    });
    contentBagShopItems.innerHTML = html;
    printTotal();
}

function printTotal() {
    const newArraySum = Object.values(ObjetBagShop);

    if (!newArraySum.length) {
        contentBagShopItems.innerHTML = `<img class="empty" src="./src/img/empty-cart.png" alt="Carrito vacio">`;
        contentBagShopTotal.innerHTML = `<h3>Bolsa Vacia</h3>`;
    } else {
        let total = newArraySum.reduce((acum, curr) => {
            acum += curr.price * curr.amount;
            return acum;
        }, 0);
        contentBagShopTotal.innerHTML = `
    <h3>Total: $${total.toFixed(2)}</h3>
    <button class="bt buy">Comprar</button>
    `;
    }

    if (!newArraySum.length) {
        amountBag.innerHTML = `<span>0</span>`;
    } else {
        let totalAmount = newArraySum.reduce((acum, curr) => {
            acum += curr.amount;
            return acum;
        }, 0);
        amountBag.innerHTML = `
    <span>${totalAmount}</span>
    `;
    }
}

printCards();

//////evento para agregar a la bolsa de compra////////
productsCards.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-bt")) {
        const idClothing = Number(e.target.id);

        const currentClothing = clothingDataBase.find(
            (clothing) => clothing.id === idClothing
        );

        if (ObjetBagShop[currentClothing.id]) {
            if (currentClothing.stock === ObjetBagShop[idClothing].amount)
                return alert("No hay mas disponibilidad en el carrito");
            ObjetBagShop[currentClothing.id].amount++;
        } else {
            ObjetBagShop[currentClothing.id] = { ...currentClothing };
            ObjetBagShop[currentClothing.id].amount = 1;
        }
        printBagShop();
    }
});
/////evento para sumar, restar y eliminar en la bolsa/////

contentBagShop.addEventListener("click", (e) => {
    if (e.target.classList.contains("less")) {
        const idClothing = Number(e.target.id);
        if (ObjetBagShop[idClothing].amount === 1) {
            const op = confirm("Seguro quieres eliminar");
            if (op) {
                delete ObjetBagShop[idClothing];
            }
        } else {
            ObjetBagShop[idClothing].amount--;
        }
    }
    if (e.target.classList.contains("add")) {
        const idClothing = Number(e.target.id);
        const currentClothing = clothingDataBase.find(
            (clothing) => clothing.id === idClothing
        );
        if (currentClothing.stock === ObjetBagShop[idClothing].amount)
            return alert("No hay mas disponibilidad en el carrito");
        ObjetBagShop[idClothing].amount++;
    }
    if (e.target.classList.contains("bx-trash-alt")) {
        const idClothing = Number(e.target.id);
        const op = confirm("Seguro quieres eliminar");
        if (op) {
            delete ObjetBagShop[idClothing];
        }
    }

    printBagShop();
});

///////eventos para abrir y cerrar la bolsa de compra/////////

icomShoppingBag.addEventListener("click", () => {
    contentBagShop.classList.toggle("content-bag-shop_show");
});

icomShoppingX.addEventListener("click", () => {
    contentBagShop.classList.toggle("content-bag-shop_show");
});

///////eventos para restar del stock (DB) cuando se compra y vaciar el carrito/////////

contentBagShopTotal.addEventListener("click", (e) => {
    if (e.target.classList.contains("buy")) {
        const op = confirm("Estas seguro que deseas comprar?");

        if (op) {
            clothingDataBase = clothingDataBase.map((clothingDataBase) => {
                if (
                    ObjetBagShop[clothingDataBase.id]?.id ===
                    clothingDataBase.id
                ) {
                    return {
                        ...clothingDataBase,
                        stock:
                            clothingDataBase.stock -
                            ObjetBagShop[clothingDataBase.id].amount,
                    };
                } else {
                    return clothingDataBase;
                }
            });
            ObjetBagShop = {};
            printCards();
            printBagShop();
        }
    }
});
// console.log(ObjetBagShop);

//////////libreria de filtro/////////////////////

mixitup(".products-cards", {
    selectors: { target: ".product-card" },
    animation: { duration: 300 },
}).filter("all");
