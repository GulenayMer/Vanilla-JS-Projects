const	rulesBtn = document.getElementById('rules-btn');
const	closeBtn = document.getElementById('close-btn');
const	rules = document.getElementById('rules');

/*  show -- close the rules when the button is clicked */
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));


/*  --- CANVAS CONTEXT  --  */
const	canvas = document.getElementById('canvas');
const	ctx = canvas.getContext('2d'); // if (ctx.getContext)
let		score = 0;
const	brickRowCount = 9;
const	brickColumnCount = 5;

/* creates a ball object  */
const	ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	size: 10,
	speed: 4,
	dx: 4, //direction x & y
	dy: -4
}

/* creates a paddle object  */
const	paddle = {
	x: canvas.width / 2 - 40, // total width 80
	y: canvas.height - 20,
	width: 80,
	height: 10,
	speed: 8,
	dx: 4, 
}

/* creates brick object */
const brickProps = {
	width: 70,
	height: 20,
	padding: 20,
	offsetX: 45, // position of the brick on the x-axis
	offsetY: 60,
	visible: true
}

/* draws the ball on canvas with path :
	++ a path is a list of points, connected by segments of lines
	that can be of different shapes..
*/
function drawBall()
{
	ctx.beginPath(); // creates a new path
	//ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // draws a circle
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	ctx.fillStyle = '#50c2b9';
	ctx.fill();
	ctx.closePath();
}

/* draw paddle on the canvas : */
function drawPaddle()
{
	ctx.beginPath(); // creates a new path
	ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
	ctx.fillStyle = '#50c2b9';
	ctx.fill();
	ctx.closePath();
}

/* create bricks  */
const bricks = []; // creates an arr. of columns with breaks inside
for (let j = 0; j < brickRowCount; j++)
{
	bricks[j] = []; // for each row an array is created 
	for (let i = 0; i < brickColumnCount; i++)
	{
		const x = j * (brickProps.width + brickProps.padding) + brickProps.offsetX;
		const y = i * (brickProps.height + brickProps. padding) + brickProps.offsetY;
		bricks[j][i] = { x, y, ...brickProps}; // spread operator creates the enumerable probs of an obj to create a clone of it
	}
}



function getScore()
{
	ctx.font = '20px Arial';
	ctx.fillText(`Score :  ${score}`, canvas.width - 150, 40);
}

function drawBricks()
{
	bricks.forEach(column => {
		column.forEach(brick => {
			ctx.beginPath();
			ctx.rect(brick.x, brick.y, brick.width, brick.height);
			ctx.fillStyle = brick.visible ? '#50c2b9' : 'transparent';
			ctx.fill();
			ctx.closePath();
		})
	})
}

function movePaddle()
{
	paddle.x += paddle.dx;

	// wall detection
	if (paddle.x + paddle.width > canvas.width)
	{
		paddle.x = canvas.width - paddle.width;
	}

	if (paddle.x < 0)
	{
		paddle.x = 0;
	}

}

function showAllBricks()
{
	bricks.forEach(column => {
		column.forEach(brick => {
			brick.visible = true;
		});
	});
}


function increaseScore()
{
	score += 1;

	if (score % (brickRowCount * brickRowCount) === 0)
	{
		showAllBricks();
	}
}

function moveBall()
{
	/* direction */
	ball.x += ball.dx;
	ball.y += ball.dy;

	/* right & left wall collision */
	if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0)
		ball.dx *= -1;
	/* top & bottom wall collision */
	if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0)
		ball.dy *= -1;
	
	// console.log(ball.x, ball.y);

/* 	paddle collision */
	if (ball.x - ball.size > paddle.x 
		&& ball.x + ball.size < paddle.x + paddle.width
		&& ball.y + ball.size > paddle.y)
	{
		ball.dy = -ball.speed;
	}

	/* bricks collision */
	bricks.forEach(column => {
		column.forEach(brick => {
			if (brick.visible)
			{
				if (ball.x - ball.size > brick.x // left side of the brick
					&& ball.x + ball.size < brick.x + brick.width // right side of the brick
					&& ball.y + ball.size > brick.y // top side of the brick
					&& ball.y - ball.size < brick.y + brick.height) // bottom side of the brick
				{
					ball.dy *= -1;
					brick.visible = false;
					increaseScore();
				}
			}
		});
	});

	/* hit bottom but not the paddle, then reset */
	if (ball.y + ball.size > canvas.height)
	{
		showAllBricks();
		score = 0;
	}
}


function drawAll()
{
	//clear canvas -- to rerender
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall();
	drawPaddle();
	getScore();
	drawBricks();
}

function keyDown(e) 
{
	if (e.key === 'Right' || e.key === 'ArrowRight')
	{
		paddle.dx = paddle.speed;
	}
	else if (e.key === 'Left' || e.key === 'ArrowLeft')
	{
		paddle.dx = -paddle.speed;
	}
}

function keyUp(e) 
{
	if (e.key === 'Right' || e.key === 'ArrowRight'
		|| e.key === 'Left' || e.key === 'ArrowLeft')
	{
		paddle.dx = 0;
	}
}


/* keyboard event handlers */
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function update()
{
	movePaddle();
	moveBall();

	drawAll();

	requestAnimationFrame(update);

}

update();

/* The window.requestAnimationFrame() method tells the browser that
	we wish to perform an animation and requests that the browser calls a 
	specified func. to update an animation before the next repaint. 
	The method takes a callback as an argument to be invoked before the repaint 
*/


	//console.log(bricks);

/*
	1) create canvas object
	2) create & draw ball
	3) create & draw paddle
	4) draw score
	5) create bricks
	6) add update() to animate (redras the canvas with requestAnimationFrame(cb))
	7) move the paddle
	8) keyboard event handlers to move paddle
	9) move the ball
	10) add wall boundaries
	11) increase the score when a brick breaks
	12) lose -- redraw the bricks & reset the score
*/