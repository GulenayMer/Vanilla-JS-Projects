const	musicContainer = document.getElementById("music-container");
const	title = document.getElementById("title");
const	progressContainer = document.getElementById("progress-container");
const	progress = document.getElementById("progress");
const	audio = document.getElementById("audio");
const	cover = document.getElementById("cover");
const	prevBtn = document.getElementById("prevBtn");
const	playBtn = document.getElementById("playBtn");
const	nextBtn = document.getElementById("nextBtn");

const	songs = ['hey', 'summer', 'ukulele'];
let		songIdx = 1;


/* update song details according to the index */ 
function loadSong(song)
{
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

/* load song details to DOM */
loadSong(songs[songIdx]);

function playSong()
{
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	audio.play();
}
function pauseSong()
{
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	audio.pause();

}

function getPrevSong()
{
	songIdx -= 1;

	if (songIdx < 0)
	{
		songIdx = songs.length - 1;
	}
	loadSong(songs[songIdx]);
	playSong();
}

function getNextSong()
{
	songIdx += 1;

	if (songIdx > songs.length - 1)
	{
		songIdx = 0;
	}
	loadSong(songs[songIdx]);
	playSong();
}

function updateProgress(e)
{
	const { duration, currentTime } = e.srcElement;
	//console.log(duration, currentTime);
	const progressPercent = (currentTime / duration) * 100;
	//console.log(progressPercent);
	progress.style.width = `${progressPercent}%`;
}

function setProgress(e)
{
	const width = this.clientWidth;
	clickX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying)
	{
		pauseSong();
	}
	else
	{
		playSong();
	}
});


prevBtn.addEventListener('click', getPrevSong);
nextBtn.addEventListener('click', getNextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', getNextSong);