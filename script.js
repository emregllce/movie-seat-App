
const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".container .seat")
const movie = document.getElementById("movie");
let count = document.getElementById("count");
let film = document.getElementById("film");
const total = document.getElementById("total");
const mySet = new Set()
const selectedArray = Array.from(mySet);
let counter = 0;


let currentMovieIndex = localStorage.getItem("selectedMovieIndex") 
?localStorage.getItem("selectedMovieIndex") 
:movie.selectedIndex

let currentMoviePrice = localStorage.getItem("selectedMoviePrice")
?localStorage.getItem("selectedMoviePrice")
:movie.options[movie.selectedIndex].value;


window.onload = ()=>{
    displaySeats()
    updateMovieInfo()
}


container.addEventListener("click", e => {
    if (!e.target.classList.contains("selected")  // toggle also could be used
    && !e.target.classList.contains("occupied")
    && e.target.classList.contains("seat")){
        e.target.classList.toggle("selected");
    
        updateMovieInfo()
        
    }
    else if (e.target.classList.contains("selected")){
        e.target.className = "seat";
        
        updateMovieInfo()
    }
    
    
})


movie.addEventListener("change", (e)=>{
    
    let ticketPrice = e.target.value;
    let movieIndex = e.target.selectedIndex;
    setMovieDataToLocalStorage(movieIndex, ticketPrice); 
    updateMovieInfo()
})

const setMovieDataToLocalStorage = (movieIndex,ticketPrice) => {
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setItem("selectedMoviePrice", ticketPrice)
    
}

const updateMovieInfo = () => {
    film.innerText = (movie[movie.selectedIndex].innerText.split("(")[0]);
    let selectedSeats = container.querySelectorAll(".row .seat.selected");
    let selectedSeatsArray = [...selectedSeats].map(seat => [...allSeats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsArray))
    console.log(selectedSeatsArray);
    count.innerText = selectedSeatsArray.length.toString().padStart(2, "0")
    total.innerText = (movie[movie.selectedIndex].value) * selectedSeatsArray.length;  
    
}

const displaySeats = () => {
    movie.selectedIndex = currentMovieIndex;
    movie.options[movie.selectedIndex].value=currentMoviePrice
    let selectedSeatsFromStorage = JSON.parse(localStorage.getItem("selectedSeats"))
    // console.log(selectedSeatsFromStorage);
    if (selectedSeatsFromStorage.length > 0){
        for (let i = 0; i < selectedSeatsFromStorage.length; i++) {
            
            [...allSeats][selectedSeatsFromStorage[i]].classList.add("selected")
            
        }
    }
}

