const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

/* fetch posts from API  */
async function getPost()
{
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
	const data = await res.json();
	return data;
}

/* show post in dom */
async function showPosts()
{
	const posts = await getPost();
	//console.log(posts);
	posts.forEach(post => {
		const postElement = document.createElement('div');
		postElement.classList.add('post');
		postElement.innerHTML = `
		<div class="number">${post.id}</div>
		<div class="post-info">
			<h2 class="post-title">${post.title}</h2>
			<p class="post-body">${post.body}</p>
		</div> `;

		postContainer.appendChild(postElement);
	});
}

function showLoader()
{
	loader.classList.add('show');

	setTimeout( () => {
		loader.classList.remove('show');

		setTimeout( () => {
			page += 1;
			showPosts();
		}, 300);
	}, 1000);
}

function filterPosts(e)
{
	//console.log(e.target.value);
	const search = e.target.value.toUpperCase();
	const posts = document.querySelectorAll('.post');

	posts.forEach( post => {
		const title = post.querySelector('.post-title').innerText.toUpperCase();
		const body = post.querySelector('.post-body').innerText.toUpperCase();

		if (title.indexOf(search) >= 0 || body.indexOf(search) >= 0)
		{
			post.style.display = 'flex';
		}
		else
		{
			post.style.display = 'none';
		}

	});
}

showPosts();


window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	if (scrollTop + clientHeight >= scrollHeight - 5)
	{
		//console.log(12);
		showLoader();
	}
});


filter.addEventListener('input', filterPosts);