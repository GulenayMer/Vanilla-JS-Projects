// Choose to currency and choose/write the amounts to be converted ınto the selected currency
// Swap button wıll help to swıtch the currencıes


//----------- DOM Elements that we need------------
const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rateElement = document.getElementById('rate');


//------------------------Functions------------------------

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
     .then(res => res.json())
     .then(data => {
         //console.log(data)
       // "rates" property is given this API data
         const rate = data.rates[currency_two]
        
      // 
      rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
    
      // toFixed(2) for two decimal points
      amountTwo.value = (amountOne.value * rate).toFixed(2); 


    } )

}

calculate();





//-------------------- Event Listeners-----------------------------
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener("click", () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value =temp;

    calculate();

})
