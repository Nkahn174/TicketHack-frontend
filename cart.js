{
  /* <div id="myCart">
  <ul id="tripsInCart">
    <li class="tripChoosen"></li>
  </ul>
  <div id="cartBottom">
    <p id="total"></p>
    <button id="purchase"></button>
  </div>
</div>; */
}
function deleteATrip(buttonElement, id) {

  buttonElement.addEventListener("click", function () {
    fetch("http://localhost:3000/carts/trips", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Suppression :", data))
      .then(() => {
        // Remove the trip from the cart display
        const tripElement = buttonElement.closest(".trip");
        if (tripElement) {
          tripElement.remove();
        }
        // Optionally, you can update the total price here
        // totalPrice();
      })
      .catch((err) => console.error("Erreur :", err));
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
            <li class="trip" data-id=${each._id}>
            <span>${dataObject.departure} > ${dataObject.arrival}</span>
            <span class='heure'>${heureLocale}</span>
            <span class='prix'>${dataObject.price}€</span>
            <span>
                <button class="delete-button" data-id=${each._id}></button>
            </span>
            </li>
            `;
            total += Number(dataObject.price);
          }
        }
      }
    });
    for(let i=0; i<document.querySelectorAll(".delete-button").length; i++){
    console.log('hello')
    const id = button.getAttribute("data-id");
    const button = document.querySelectorAll(".delete-button")[i];
    deleteATrip(button, id);
  };
}

function addToBookings() {
  document.querySelector("#purchase").addEventListener("click", function () {
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
        window.location.href = "booking.html";
      })
      .catch((err) => console.error("Error updating booking:", err));
  });
}

fillCart();
addToBookings();

