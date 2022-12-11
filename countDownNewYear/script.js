const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');


const currentYear = new Date().getFullYear();

/* const newYearTime = new Date('January 01 2023 00:00:00'); */
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

/* set backgorund year */
year.innerHTML = currentYear + 1;

function updateCountDown()
{
	const currentTime = new Date();
	const difference = newYearTime - currentTime;

	const diff_days = Math.floor(difference / 1000 / 60 / 60 / 24);
	const diff_hours= Math.floor(difference / 1000 / 60 / 60) % 24;
	const diff_minutes = Math.floor(difference / 1000 / 60) % 60;
	const diff_seconds = Math.floor(difference / 1000) % 60;
	
	//console.log(diff_seconds);

	days.innerHTML = diff_days;
	hours.innerHTML = diff_hours < 10 ? '0' + diff_hours : diff_hours;
	minutes.innerHTML = diff_minutes < 10 ? '0' + diff_minutes : diff_minutes;
	seconds.innerHTML = diff_seconds < 10 ? '0' + diff_seconds : diff_seconds;

}

/* show spinner before countdown
	setTimeOut() method sets a timer which executes a func. once the timer expires
	so loading is set and with remove() everything is removed from the DOM for 1 second
*/
setTimeout( () => {
	loading.remove();
	countdown.style.display = 'flex';
}, 1000);


/* takes in a func. & run it at every .. seconds / 1000 ms */
setInterval(updateCountDown, 1000);


