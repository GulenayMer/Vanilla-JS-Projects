// select the movies from selector and calculate the price id = total
// choose seats and calculate the number of seats id = count
// seats are choosen needs to change color to .seat selected 

// ------------------------ Variables --------------------//

// will grab all the seats on the row that are not occupied
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
// const secondContainer = document.querySelector(".second-container");

// seat counting
const seatCount = document.querySelector("#count");
// movie price
const movieSelect = document.getElementById("movie");
// + sign makes it number or parseInt()
let ticketPrice = +movieSelect.value;
// total price
const total = document.querySelector("#total");

populateUI();
totalSeatsPrice();

// ---------------------- Functions ------------------- //

// add total price and seat numbers
function totalSeatsPrice(){
    // selected seats 
    const seatSelected = document.querySelectorAll(".row .seat.selected");

// here comes local storage for the seats selected: [...seatSelected] will convert the node lists into an array
// higher order array method map, 
// we return the indexes of the seats that are selected
    const seatsIndex = [...seatSelected].map(function(seat){
     return [...seats].indexOf(seat);
      });
 // Saving as an array with JSON.stringfy into the local storage
     localStorage.setItem("seatSelected", JSON.stringify(seatsIndex));

 //

    const selectedSeatsCount = seatSelected.length;
    seatCount.textContent = selectedSeatsCount; // or innerText
    // total price
    const totalPrice = ticketPrice * selectedSeatsCount;
    total.textContent = totalPrice;
};



// local stroge function for movie and price 
function setMovieData(movieIndex, moviePrice){
 localStorage.setItem("selectedMovieIndex", movieIndex);
localStorage.setItem("selectedMoviePrice", moviePrice);
     };

// populateUI
     function populateUI(){
        const seatSelected = JSON.parse(localStorage.getItem("seatSelected"));
         
        // check if anything in the selected seats
        if(seatSelected !== null && seatSelected.length > 0){
         // loop through all of the seats
         seats.forEach((seat, index) => {
             if(seatSelected.indexOf(index) > -1) {
                   seat.classList.add("selected");
             }
         });
      };
     
      // to save selected movie index
      const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
     
      if(selectedMovieIndex !== null) {
          movieSelect.selectedIndex = selectedMovieIndex;
      };
     
     };



// ---------------------- Event Listeners -------------------------- //

// Seat click event
// need to loop through as we have many seats
seats.forEach(function(seatItem){
    seatItem.addEventListener("click", function(e){
        if(e.target.classList.contains("seat") && !e.target.classList.contains("seat occupied")){
            // toggle adds and removes the class (add or remove could be used too)
            e.target.classList.toggle("selected");
            
            // 
            totalSeatsPrice();
        }
    })
});

// Movie click event
// The change event is fired for <input>, <select>, and <textarea> elements
movieSelect.addEventListener("change", function(e){
    ticketPrice = +e.target.value;
    totalSeatsPrice();

    // to save the price and movie selected into the local storage
    setMovieData(e.target.selectedIndex, e.target.value);
});

// or this way also works for Seat event listener : 
        // secondContainer.addEventListener("click", function(e){
        //     if(e.target.classList.contains("seat") && !e.target.classList.contains("seat occupied")){
        //        // toogle adds and removes the class (add or remove could be used too)
        //         e.target.classList.toggle("selected");
        //     }
        // });



// --------------------------- Local Storage and UI -------------------------//


  // Step1 --  Save seats selected -- index --- done above
  // Step2 -- Save selected movie index and price---done above


 // Step3 -- Get data from local storage and populate UI 
 // pull out the selected seats from the local stroge
 // pull out the selected movie and price from the local storage
//  function populateUI(){
//    const seatSelected = JSON.parse(localStorage.getItem("seatSelected"));
    
//    // check if anything in the selected seats
//    if(seatSelected !== null && seatSelected.length > 0){
//     // loop through all of the seats
//     seats.forEach((seat, index) => {
//         if(seatSelected.indexOf(index) > -1) {
//               seat.classList.add("selected");
//         }
//     });
//  };

//  // to save selected movie index
//  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

//  if(selectedMovieIndex !== null) {
//      movieSelect.selectedIndex = selectedMovieIndex;
//  };

// };



// in the function : 
 // how to store the seats selected to the local storage so that when we reload the page data does not be lost
    // Copy selected seats into Array
    // Map through Array
    // Return a new array indexes
//  const seatsIndex = [...seatSelected].map(function(seat){
//      return [...seats].indexOf(seat);
//   }) // ... spread operator
// // arrow function-- [...seatSelected].map(seat =>[...seats].indexOf(seat));
   


//    localStorage.setItem("seatSelected", JSON.stringify(seatsIndex));

   // Get data from localstorage and populate UI
// function populateUI(){
// const seatSelected = localStorage.getItem("seatSelected")

// if(seatSelected !== null && seatSelected.length > 0){
//     seats.forEach()
// }
// };


    
