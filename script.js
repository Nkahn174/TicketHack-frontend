const resultContainer = document.querySelector('#result-container');

function createListTrips(trip) {
    const date = moment(trip.date);
    let newLi = document.createElement('li');
    newLi.classList.add('item-trip');
    let newTrips = document.createElement('div');
    let newContentText = document.createTextNode(`${trip.departure} > ${trip.arrival} ${date.format('hh:mm')} ${trip.price}`);
    newTrips.appendChild(newContentText);
    let newBtnBookDiv = document.createElement('div');
    let newBtn = document.createElement('button');
    newBtn.classList.add('btn-book');
    newBtn.textContent = "Book";
    newBtnBookDiv.appendChild(newBtn);
    newLi.append(newTrips, newBtnBookDiv);
    return newLi;
}

const btnSearch = document.querySelector('#btn-search');

btnSearch.addEventListener('click', function(event) {
    const departureValue = document.querySelector('#departure').value.trim();
    const arrivalValue = document.querySelector('#arrival').value.trim();
    const dateValue = document.querySelector('#date').value.trim();

    // console.log('departure: ', departureValue);
    // console.log('arrival: ' , arrivalValue);
    // console.log('date:  ', dateValue);
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
            console.log(data);

        } else {
            const imgResult = document.querySelector('#result-img');
            const textResult = document.querySelector('#result-text');
            imgResult.src = './images/notfound.png';
            textResult.textContent = "No trip found.";
        }
    });
});