// {
//   /* <div id="myCart">
//   <ul id="tripsInCart">
//     <li class="tripChoosen"></li>
//   </ul>
//   <div id="cartBottom">
//     <p id="total"></p>
//     <button id="purchase"></button>
//   </div>
// </div>; */
// }
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
        </div>;
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
            // console.log(data.cart[each]._id)
            document.querySelector("#tripsInCart").innerHTML += `
            <li class="trip">
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
        document.querySelectorAll('.delete-button').forEach(button => {
        const id = button.getAttribute('data-id');
        deleteATrip(button, id);
        });
        
        document.querySelector('#total').textContent = total;
      }
    });
}

// function addToBookings() {}

fillCart();
