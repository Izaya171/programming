const container = document.querySelector('.container'); // would only select first one
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = documen.getElementById('total');
const movieSelect = document.getElementById('movie');
const ticketPrice = +movieSelect.value;



// Event Listener
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        console.log(e.target);
    }
});