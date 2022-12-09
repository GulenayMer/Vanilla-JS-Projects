const container = document.getElementById("container");
const text = document.getElementById("text");

// total time it takes -- breathe in/out & hold -- 7,5s : 7500 ms
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2; // 3s for each breath time
const holdTime = totalTime / 5; // 1.5s for hold

//console.log(breatheTime, holdTime);

breatheAnimation();

function breatheAnimation()
{
	text.innerText = "Breathe in!";
	container.className = 'container grow';

	setTimeout( () => {
		text.innerText = "Hold!";

		setTimeout( () => {
			text.innerText = "Breathe out!";
			container.className = 'container shrink';
		}, holdTime)
		
	}, breatheTime);
}

setInterval(breatheAnimation, totalTime);