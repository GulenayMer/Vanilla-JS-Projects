// Geenrate Random Users --- Fetch / Async / Awat
// Output Users -- forEach
// Double Money -- map()
// Sort by Richest -- sort()
// Show Millionaires -- filter()
// Calculate Wealth -- reduce()


// select data we need
const addingUser = document.getElementById("add_user");
const double = document.getElementById("double");
const showingMill = document.getElementById("show_millionaires");
const sortingUser = document.getElementById("sort");
const wealth = document.getElementById("calculate_wealth");

const main = document.getElementById("main");

// create an array to store random users
let dataAll = [];

// ----------------- Functions ----------------------

getRandomUser();
getRandomUser();
getRandomUser();

//                1)  Fetch random user and add money

// new way doing it without .then -- async and await
async function getRandomUser(){
      const res = await fetch("https://randomuser.me/api");
      const data = await res.json();
    
      const user = data.results[0];  //user variable will be stored with the data selected
      // from API  -- results key with the index of 0 (includes the info we need)

      const newUser = {
          name: `${user.name.first} ${user.name.last}`,
          money: Math.floor(Math.random() * 1000000)

      }; //newUser variable, object which brings us the data we want -- first name, last name
      // and we add money key which is created randomly
      // console.log(data) -- we get data (first name, last name and money randomly)

      addData(newUser);
};


// Add the new object to dataAll array
function addData(obj){
         dataAll.push(obj);
         console.log(dataAll);

         updateDOM();
};


// Update DOM
// providedData = data -- means if nothing else passed in updateDOM() function, just use the dataAll array
function updateDOM(providedData = dataAll){
   // clear main div
   main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

   providedData.forEach(item => {
       const element = document.createElement("div");
       element.classList.add("person");
       element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
       main.appendChild(element);
   });

};

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};


//    2) Double money by using map() method
function doubleMoney() {
   dataAll = dataAll.map(item => {
    return {...item, money: item.money * 2}
})

updateDOM();

};


// 3) Sort by the richest by using sort() method

function sortByRichest(){
   dataAll = dataAll.sort((a,b) => b.money - a.money);

   updateDOM();
};


// 4) Show only millioners by using filter() method
function showMill(){
    dataAll = dataAll.filter(item => item.money > 1000000 );

   updateDOM();
    
};


// 5) Show total waelth by using reduce()
function calculateWealth() {
     const wealth =  dataAll.reduce((acc, item) => (acc += item.money), 0);
     //console.log(formatMoney(wealth));  

     const wealthElement = document.createElement("div");
     wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
     main.appendChild(wealthElement);
     

}; 

//---------- ---- Event Listeners ---------------------

addingUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
sortingUser.addEventListener("click", sortByRichest);
showingMill.addEventListener("click", showMill);
wealth.addEventListener("click", calculateWealth);