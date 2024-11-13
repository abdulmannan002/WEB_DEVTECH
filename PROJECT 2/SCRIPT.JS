const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row.seat:not(.occuipied)');
const count = document.getElementById("count");
const total = document.getElementById('total');
const movieselect = document.getElementById('movie');


populateUI();

let ticketprize = +movieselect.value;

function setmoviedata(movieindex,movieprize) {
    localStorage.setItem('selectmovieIndex',movieindex);
    localStorage.setItem('selectMoviePrize',movieprize);
}

function updateselectedcount(){
    const selectedseats = document.querySelectorAll('.row .seat.selected')
    const seatindex =[...selectedseats].map(seat => [...seats].indexOf(seat));
    const seatscount = selectedseats.length;
    count.innerText = seatscount;
    total.innerText = seatscount * ticketprize; 
    localStorage.setItem('selectedseats',JSON.stringify(seatindex));
}

function populateUI (){
    const selectedseats = JSON.parse(localStorage.getItem('selectedseats'));
    if (selectedseats !== null && selectedseats.length > 0 ) {
        seats.forEach((seat,index)=> {
            if (selectedseats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    const selectmovieIndex = localStorage.getItem('selectedmovieIndex');
    if (selectmovieIndex !== null){
        movieselect.selectedIndex= selectmovieIndex;
    }
}



container.addEventListener('click',(e)=>{
    if (e.target.classList.contains('seat') && 
    !e.target.classList.contains('occuipied')){
        e.target.classList.toggle('selected');
        updateselectedcount();
    }
    
})

movieselect.addEventListener('change',(e) =>{
    ticketprize = e.target.value;
    setmoviedata(e.target.selectedIndex, e.target.value);
    updateselectedcount();
})
