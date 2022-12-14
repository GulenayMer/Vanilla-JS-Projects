const apiURL = 'https://api.lyrics.ovh';
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");


async function searchSongs(term)
{
	/* fetch(`${apiURL}/suggest/${term}`)
	.then(res => res.json())
	.then(data => console.log(data)); */

	const res = await fetch(`${apiURL}/suggest/${term}`);
	const data = await res.json();
	//console.log(data);
	showData(data);
}

function showData(someData)
{

	/* 	let output = '';
	someData.data.forEach(song => {
		output += `
			<li>
			<span><strong>${song.artist.name}</strong> - ${song.title}</span>
			<button class="btn" data-artist="${song.artist.name}"
			data-songtitle="${song.title}">Get Lyrics</button>
			</li>
		`;
	});
	result.innerHTML = `
		<ul class="songs">
			${output}
		</ul>
	`; */

	result.innerHTML = `
	<ul class="songs">
		${someData.data.map(song => `
		<li>
		<span><strong>${song.artist.name}</strong> - ${song.title}</span>
		<button class="btn" data-artist="${song.artist.name}"
		data-songtitle="${song.title}">Get Lyrics</button>
		</li>
		`).join('')}
	</ul>`;


	if (someData.prev || someData.next)
	{
		more.innerHTML = `
		${someData.prev ? `<button class="btn" onclick="getMoreSongs('${someData.prev}')">Prev</button>` : ''}
		${someData.next ? `<button class="btn" onclick="getMoreSongs('${someData.next}')">Next</button>` : ''}
		`;
	}
	else
	{
		more.innerHTML = '';
	}
}

async function getMoreSongs(url)
{
	const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
	const data = await res.json();

	showData(data);
}

async function getLyrics(artist, songTitle)
{
	const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
	const data = await res.json();

	//console.log(data);

	const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

	result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
	<span>${lyrics}</span>
	`;

	more.innerHTML = '';
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const searchTerm = search.value.trim();
	//console.log(searchTerm);

	if (!searchTerm)
	{
		alert("Please type in a search term");
	}
	else
	{
		searchSongs(searchTerm);
	}
});

result.addEventListener('click', e => {
	//console.log(e.target);
	const clickedEl = e.target;

	if (clickedEl.tagName === 'BUTTON')
	{
		//console.log("123");
		const artist = clickedEl.getAttribute('data-artist');
		const songTitle = clickedEl.getAttribute('data-songtitle');

		getLyrics(artist, songTitle);
	
	}
});