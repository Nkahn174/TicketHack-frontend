let total = 0;

function recalculateTotal() {
  let elem = document.querySelectorAll('.prix');
  let newPrice = 0;
  elem.forEach(e => {
    let price = parseFloat(e.textContent.replace('€', '').trim());
    newPrice += price;
  });
  document.querySelector('#total').textContent = newPrice;
}

function deleteATrip(buttonelement, id) {
  buttonelement.addEventListener("click", function () {
    fetch("http://localhost:3000/carts/trips", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(response => response.json())
    .then(data => {
      if(data.result) {
        this.parentNode.parentNode.remove();
        recalculateTotal();
      }
    });
  });
}

function fillCart() {
  fetch("http://localhost:3000/carts/trips")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      // console.log(data.cart)
      if (data.cart.length > 0) {
        document.querySelector(".trips-container").innerHTML = `<div id="Cart">
            <div id="cartContent">
                <p id="myCartTitle">My Cart</p>
                <ul id="tripsInCart">
                    
                </ul>
            <div>    
            <div id="cartBottom">
                    <p>Total : <span id="total"></span> €</p>
                    <button id="purchase">Purchase</button>
            </div>
        </div>
            `; //possible de changer ".trips-container" en id?
        for (let each in data.cart) {
          const dataObject = data.cart[each].trips;
          // console.log(dataObject)
          if (data.cart[each].booking === false) {
            const date = new Date(dataObject.date);
            const heureLocale = date.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
            //console.log(data.cart[each]._id)
            document.querySelector("#tripsInCart").innerHTML += `
            <li class="trip" data-id=${data.cart[each]._id}>
            <span>${dataObject.departure} > ${dataObject.arrival}</span>
            <span class='heure'>${heureLocale}</span>
            <span class='prix'>${dataObject.price}€</span>
            <span>
                <button class="delete-button" data-id=${data.cart[each]._id}>X</button>
            </span>
            </li>
            `;
            total += Number(dataObject.price);
          }
        }
        document.querySelector('#total').textContent = total;

        for(let btnDelete of document.querySelectorAll(".delete-button")){
          const id = btnDelete.getAttribute("data-id");
          deleteATrip(btnDelete, id);
        };
        let purchase = document.querySelector('#purchase');
        if (purchase) addToBookings(purchase);
      }
    });
}

function addToBookings() {
  purchase.addEventListener("click", function () {
    const trips = document.querySelectorAll(".trip");
    let promises = [];
    for (let i = 0; i < trips.length; i++) {
      const tripElement = trips[i];
      const tripId = tripElement.getAttribute("data-id");

      // On stocke chaque fetch dans un tableau de promesses
      promises.push(
        fetch(`http://localhost:3000/carts/booking/trips/${tripId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        })
      );
    }
    // Quand toutes les requêtes sont terminées, on redirige
    Promise.all(promises)
      .then(() => {
        window.location.href = "bookings.html";
      })
      .catch((err) => console.error("Error updating booking:", err));
  });
}

fillCart();
//addToBookings();

