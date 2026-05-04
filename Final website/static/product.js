document.addEventListener("DOMContentLoaded", () => { //Sørger for at HTML er fuldt loaded
    document.querySelectorAll(".ticket-card").forEach(card => { //For hvert card vælger den input, .plus og .minus
        const input = card.querySelector("input");
        const plus = card.querySelector(".plus");
        const minus = card.querySelector(".minus");

        plus.addEventListener("click", () => { //Den lytter til et klik på +'et. Hvis der klikkes, tager den værdien er inputtet og lægger 1 til
            input.value = Number(input.value) + 1;
        });

        minus.addEventListener("click", () => { //Den lytter til et klik på -'et. Hvis der klikkes, tager den værdien er inputtet og trækker 1 fra
            if (input.value > 0) { //kun hvis værdien er større end 1, kan den trække 1 fra
                input.value = Number(input.value) - 1;
            }
        });
    });

    // konverter nummer "4.100,00 kr." -> 4100
    function convertPrice(amount) {
        let clean = amount.replace(/[^0-9.,]/g, ""); //beholder kun tal, punktum og komma og erstatter alt andet med intet: 4.100,00
        clean = clean.replace(/\./g, ""); //fjerner punktum i clean-strengen: 4100,00
        clean = clean.replace(",", "."); //danske kommaer til punktummer: 4100.00
        return Number(clean); //konverterer til nummer: 4100
    }

    //konverter 4100 -> "4.100,00kr."
    function formatPrice(num) {
        return num.toLocaleString("da-DK", { //konverterer tal til en streng på danske konventioner
            minimumFractionDigits: 2 //der vises 2 decimater ",00"
        }) + " kr."; //tilføjer " kr." til slutningen af den formaterede streng
    }

    const cartItemsContainer = document.querySelector(".cart-items"); //henter elementerne i .cart-items og .cart-total
    const cartTotal = document.querySelector(".cart-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || []; //Henter data fra localstorage under "cart", || = findes der ikke noget i hukommelse, returneres et tomt array
    updateCart();

    document.querySelectorAll(".ticket-card").forEach(card => { //returnerer statisk NodeList der repræsenterer en lidt af doc'ets elementer der mathcer gruppen af selectors
        const buyBtn = card.querySelector(".buy-btn");
        const input = card.querySelector("input");
        const title = card.querySelector("h3").innerText;
        const priceText = card.querySelector(".price").innerText;

        const price = convertPrice(priceText); //definerer const price som den konverterede text i priceText, som er indholdet i klassen .price

        buyBtn.addEventListener("click", () => { //lytter til klik
            const qnty = Number(input.value); //tager værdien af inputet (antallet af billetter)
            if (qnty < 1) return; //hvis mængden er mindre end 1, bliver intet tilføjet

            let existing = cart.find(i => i.title === title); //tjekker om titlen på varen allerede eksisterer i kurven

            if (existing) { //hvis den eksisterer
                existing.qnty += qnty //tilføjer til eksisterende antal
            } else {
                cart.push({ title, qnty, price }); //hvis ikke den eksisterer, tilføjes varen på ny linje med tite, antal og pris
            }

            updateCart(); //viser inholdet i updateCart, som er totalprisen (se nedenfor)
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = ""; //tømmer indhold i kurv når den opdateres

        let total = 0; //starter totalen på 0

        cart.forEach(item => { //går igennem ALLE varer i cart array
            const div = document.createElement("div"); //laver nyt <div> element til én vare i kurv
            div.classList.add("cart-item"); //giver det klassen .cart-item
            div.innerHTML = ` 
                <div class="cart-line">
                    <span class="cart-title">${item.title} x ${item.qnty}</span>  
                    <span class="cart-price">${formatPrice(item.price * item.qnty)}</span>
                    <button class="remove-one">&times;</button>
                </div>
            `; //div.innerHTML: skriver HTMl ind i div'en -- første <p>: viser navn og antal, fx. COMFORT CAMPING - STOR x 2. -- Anden <p> viser: 4100 * 2 = 8200 og formatPrice() konverterer det til 8.200,00kr.
            cartItemsContainer.appendChild(div); //lægger den nye div ind i kurven

            const removeBtn = div.querySelector(".remove-one");

            removeBtn.addEventListener("click", () => {
                if (item.qnty > 1) {
                    item.qnty--; //fjern 1
                } else {
                    cart = cart.filter(i => i.title !== item.title); //fjerner produkt
                }
                updateCart(); //redraw cart
            })

            total += item.price * item.qnty; //lægger varens pris til totalen
        });

        cartTotal.innerText = `Total: ${formatPrice(total)}`; //formaterer prisen til 8.200,00 kr. fra 8200 - dansk prisformat
        localStorage.setItem("cart", JSON.stringify(cart)); //Gemmer kurv efter opdatering
    }

    const checkoutBtn = document.querySelector(".checkout-btn") //definerer checkoutBtn som elementet .checkout-btn i HTML

    checkoutBtn.addEventListener("click", () => { //lytter til klik
        alert("Her var du blevet viderestillet til betalingen"); //ved klik, vises denne besked
    });


    document.querySelector(".clear-cart").addEventListener("click", () => {
        cart = [];              // tømmer kurv array'en
        localStorage.removeItem("cart");
        updateCart();           // omtegner den tomme kurv
    });
});