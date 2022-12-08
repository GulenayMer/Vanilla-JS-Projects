const search = document.getElementById('search'),
      submit = document.getElementById('submit'),
      random = document.getElementById('randomBtn'),
      mealsElm = document.getElementById('meals'),
      SingleMealElm = document.getElementById('single-meal'),
      resultHeading = document.getElementById('result-heading');

// Search meal and fetch from API
function searchMeal(e){
e.preventDefault(); // prevent to submit the form


// clear single meal
SingleMealElm.innerHTML = '';

// get search term

const term = search.value;

// check for empty
if(term.trim()){
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
.then(res => res.json())
.then(data => {
console.log(data);
resultHeading.innerHTML =`<h2>Search results for '${term}':</h2>` 

if(data.meals === null){
    resultHeading.innerHTML =`<p>There is no search results. Try again.</p>`    
} else{
mealsElm.innerHTML = data.meals.map(meal =>
    `<div class='meal'>
    <img src='${meal.strMealThumb}' alt='${meal.strMeal}'>
    <div class='meal-info' data-MealID='${meal.idMeal}'>
    <h3>${meal.strMeal}</h3>
    </div>
    </div>` 
    ).join('');
}
})

// clear the search text
search.value = '';

} else {
    alert('please enter a search term')
}

} 


// fetch meal by id
function getMealById(mealID){
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
.then(res => res.json())
.then(data => {
    const meal = data.meals[0];
    addMealstoDom(meal);
})

}

// add meal to dom
function addMealstoDom(meal){
   const ingredients = [];

   for(let i = 1; i<=20; i++){
       if(meal[`strIngredient${i}`]){
           ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
       } else{
       break;
    }
   } 

SingleMealElm.innerHTML = `
<div class='single-meal'>
<h1>${meal.strMeal}</h1>
<img src='${meal.strMealThumb}' alt='${meal.strMeal}'>

<div class='single-meal-info'>
${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
</div>

<div class='main'>
<p>${meal.strInstructions}</p>
<h2>Ingredients</h2>
<ol>
${ingredients.map(ing =>`<li>${ing}</li>`).join('')}
</ol>
</div>

</div>
`;
}



// fetch random meal from API

function getRandomMeal(){
// clear meals and heading
mealsElm.innerHTML = '';
resultHeading.innerHTML = '';

fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
.then(res => res.json())
.then(data => {
    const meal = data.meals[0];
    addMealstoDom(meal);
})


}

      // Event listener
      submit.addEventListener('submit', searchMeal);

      mealsElm.addEventListener('click', e => {
          const mealInfo = e.path.find(item =>{
           if(item.classList){
               return item.classList.contains('meal-info');
           } else {
               return false;
           }
 });

 if(mealInfo) {
     const mealID = mealInfo.getAttribute('data-mealID')
getMealById(mealID);
    }

      })


     random.addEventListener('click', getRandomMeal);