const btnSearch = document.querySelector('#btn-search');

btnSearch.addEventListener('click', function(event) {
    const departureValue = document.querySelector('#departure').value.trim();
    const arrivalValue = document.querySelector('#arrival').value.trim();
    const dateValue = document.querySelector('#date').value.trim();

    console.log('departure: ', departureValue);
    console.log('arrival: ' , arrivalValue);
    console.log('date:  ', dateValue);
    fetch('http://localhost:3000/trips', {
        method: 'POST',
        'Content-Type' : 'application/json',
        body: JSON.stringify({
            departure: departureValue,
            arrival : arrivalValue,
            date : dateValue
        })
    }) .then(response => response.json())
    .then(data => {
        const resultContainer = document.querySelector('#result-container');

        if(data.result) {

        } else {
            const imgResult = document.querySelector('#result-img');
            const textResult = document.querySelector('#result-text');
            imgResult.src = './images/notfound.png';
            textResult.textContent = "No trip found.";
        }
    });
});