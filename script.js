const resultContainer = document.querySelector('#result-container');

function createListTrips(trip) {
    const date = moment(trip.date);
    // li element
    let newLi = document.createElement('li');
    newLi.classList.add('item-trip');
    // text elements
    let newTrips = document.createElement('div');
    newTrips.classList.add('text-trips');
    newTrips.innerHTML = `<span>${trip.departure} > ${trip.arrival}</span><span>${date.format('hh:mm')}</span><span>${trip.price} €</span>`;
    // btn element
    let newBtn = document.createElement('button');
    newBtn.classList.add('btn-book');
    newBtn.textContent = "Book";
    newBtn.dataset.objId = trip._id;
    // append all element
    newLi.append(newTrips, newBtn);
    return newLi;
}

function eventListenerBook() {
    let btnsBook = document.querySelectorAll('.btn-book');
    for(let btnBook of btnsBook) {
        btnBook.addEventListener('click', function() {
            let id = this.dataset.objId;
            console.log('click => ', id);
            fetch('http://localhost:3000/carts/trips', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({
                    id
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.result) {
                    // redirect to cart.html
                    window.location.assign('cart.html');
                } else {
                    Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: `Impossible d'ajouter le trajet au panier.
                        le trajet n'est plus disponible`,
                    });
                }
            }) 
        });
    }
}

const btnSearch = document.querySelector('#btn-search');

btnSearch.addEventListener('click', function(event) {
    const departureValue = document.querySelector('#departure').value.trim();
    const arrivalValue = document.querySelector('#arrival').value.trim();
    const dateValue = document.querySelector('#date').value.trim();

    fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            departure: departureValue,
            arrival : arrivalValue,
            date : dateValue
        })
    }) .then(response => response.json())
    .then(data => {
        if(data.result) {
            let trips = data.tripsfound;
            let ulElement = document.createElement('ul');
            ulElement.classList.add('list-trips');
            for (let trip of trips) {
                let liElem = createListTrips(trip);
                ulElement.appendChild(liElem);
            }
            resultContainer.innerHTML = "";
            resultContainer.append(ulElement);
            eventListenerBook();
        } else {
            const imgResult = document.querySelector('#result-img');
            const textResult = document.querySelector('#result-text');
            imgResult.src = './images/notfound.png';
            textResult.textContent = "No trip found.";
        }
    });
});