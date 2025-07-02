let tripsContainer = document.querySelector('.trips-container');
    

fetch('http://localhost:3000/carts/booking/trips')
    .then(response => response.json())
    .then(data => {
        if( data.result) {
            tripsContainer.innerHTML = "";
            tripsContainer.innerHTML += `<div id='booking-title'>My bookings</div>
                <div id='booking-list'></div>`;
            let listElem = document.querySelector('#booking-list');
            for(let trip of data.booked) {
                let date = moment(trip.trips.date);
                let now = moment();
                let duration = moment.duration(date.diff(now));
                let hours = Math.floor(duration.asHours());
                let minutes = duration.minutes();
                let time;
                if( hours > 0) {
                    time = `<p>Departure in ${hours} hours and ${minutes} min</p>`;
                } else {
                    time = `<p>Departure in ${minutes} min</p>`;
                }
                if(minutes < 0){
                    time = `<span class="icon"><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - 
                    https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7
                    24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></span>` 
                    +time;
                }
                listElem.innerHTML += `<div class='booking-item'>
                    <div class='booking-trip'>${trip.trips.departure} > ${trip.trips.arrival}</div>
                    <div class='booking-time'>${date.format('HH:mm')}</div>
                    <div class='booking-price'>${trip.trips.price} €</div>
                    <div class='booking-remainder'>${time}</div>
                `;
            }

            tripsContainer.innerHTML += `<div class="divider-small"></div>
                <p id="booking-text">Enjoy your travels with Tickethack!</p>
                `;
        }
    });