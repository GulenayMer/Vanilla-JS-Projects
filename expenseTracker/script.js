const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

/* const dummyTransactions =
[
	{ id: 1, text: 'Bag', amount: -20 },
	{ id: 2, text: 'Book', amount: -10 },
	{ id: 3, text: 'Salary', amount: 4000 },
	{ id: 4, text: 'Camera', amount: -200 },
]; */

//let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null 
					? localStorageTransactions : []

/* add transaction */
function addTransaction(e)
{
	e.preventDefault();

	if (text.value.trim() === '' || amount.value.trim() === '')
	{
		alert('Please add a text and amount');
	}
	else
	{
		const newTransaction = {
			id: generateID(),
			text: text.value,
			amount: +amount.value
		}
		//console.log(newTransaction);
		transactions.push(newTransaction);
		addTransactionDOM(newTransaction);
		updateValues();
		updateLocalStorage();
		text.value = '';
		amount.value = '';
	}
}

/* generate random id */
function generateID()
{
	return Math.floor(Math.random() * 100);
}

/* add transactions to dom list */
function addTransactionDOM(transaction)
{
	const sign = transaction.amount > 0 ? '+' : '-'; 
	const item = document.createElement('li');

	// add class based on value
	item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

	item.innerHTML = `
		${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
		<button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
	`;

	list.appendChild(item);
}


/* update the balance, income & expense */
function updateValues()
{
	const amounts = transactions.map(transaction =>
		transaction.amount);

	const total = amounts.reduce( (sum, item) => 
				(sum += item), 0 )
				.toFixed(2);

	const income = amounts
					.filter(item => item > 0)
					.reduce( (sum, item) => (sum += item), 0)
					.toFixed(2);
	
	const expense = amounts
					.filter(item => item < 0)
					.reduce( (sum, item) => (sum += item), 0) * -1
					.toFixed(2);

	//console.log(expense);
	balance.innerText = `$${total}`;
	moneyPlus.innerText = `$${income}`;
	moneyMinus.innerText = `$${expense}`;
}

/* remove a transaction by id */
function removeTransaction(id)
{
	transactions = transactions.filter(transaction => transaction.id !== id);

	init();
	updateLocalStorage();
}

/* update local storage transaction */
function updateLocalStorage()
{
	localStorage.setItem('transactions', JSON.stringify(transactions));
}

/* init app */
function init()
{
	list.innerHTML = ' ';
	transactions.forEach(addTransactionDOM);
	updateValues();
}


init();

form.addEventListener('submit', addTransaction);