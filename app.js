const express = require('express');
const { dbConnection } = require('./db/config');
const cors = require('cors');
const routes = require('./routes/ghRoutes');
const { PORT } = require('./config')

require ("dotenv").config();



dbConnection();

const app = express();
app.use( express.json());
app.use( cors() );
app.use( express.urlencoded({extended:true}));
app.use('/', routes());




app.listen(PORT, () => {
    console.log("app in port", PORT)
});
// ++++++++++++++++++++++++  APP NODE +++++++++++++++++++++++++++++++++
//----------------------------------------------------------------------------

















































 //++++++++++++++++ APP LIVE SERVER +++++++++++++++++++++++++++++++++
//  ___________________________________________________________________________________
// let pagina = 1;
// const btnAnterior = document.getElementById('btnAnterior')
// const btnSiguiente = document.getElementById('btnSiguiente')

// btnSiguiente.addEventListener('click', () => {
// 	if (pagina < 1000) {
// 		pagina += 1;
// 		cargarRepos();
// 	}
// });
// btnAnterior.addEventListener('click', () => {
// 	if (pagina > 1) {
// 		pagina -= 1;
// 		cargarRepos();
// 	}
// });
// const form = document.querySelector('#form');
// const bar = document.querySelector('#search');

// window.addEventListener('load', () => {
// 	form.addEventListener('submit', buscarRepos);
// })


// function buscarRepos(e) {
// 	e.preventDefault();

// 	// const barValue = document.querySelector('#search').value;

// 	cargarRepos(bar)
// }


// const cargarRepos = async () => {
	
// 	try {
// 		const respuesta = await fetch(`https://api.github.com/users/${bar.value}/repos?page=${pagina}&per_page=4`);

// 		const data = await respuesta.json();
// 		console.log(data);
// 		let repos = ``;
// 		let user = ``
		
// 		user = `
// 		<img class="avatar inside" src="${datos[0].owner.avatar_url}">
// 		<h3 class="inside"> <strong> Id: </strong> ${datos[0].owner.id}</h3>
// 		<h3 class="inside"> <strong> Name: </strong> ${datos[0].owner.login}</h3>
// 		<a href="${datos[0].owner.html_url} " class="inside">Github link </a>
// 	`;

		
// 		datos.forEach(repo => {


// 			repos += `
	
// 			<div class="repo">
// 				<h3 class="inside"> <strong> Id: </strong> ${repo.id}</h3>
// 				<h3 class="inside"> <strong> Name: </strong> ${repo.name}</h3>
// 			<p class=""> <strong> Description: </strong> ${repo.description}</p>
// 			<p class="inside"> <strong> Language: </strong> ${repo.language}</p>
// 			<p class="inside"> <strong> Pushed_At: </strong> ${repo.pushed_at}</p>
// 			<p class="inside"> <strong> Created_At: </strong> ${repo.created_at}</p>
// 			<p class="inside"> <strong> Updated_At: </strong> ${repo.update_at}</p>
// 			<a href="${repo.html_url}" class="inside"> Github link </a>
// 			<a href="${repo.url}" class="inside"> Repo info </a>
// 			// <a href="${repo.events_url} " class="inside">Events repo </a>
// 			// <a href="${repo.commits_url}" class="inside">Commits info, </a>
// 			// <a href="${repo.pulls_url}" class="inside"> Pulls info </a>
// 			<a href="${repo.merges_url} " class="inside">Merges info </a>
// 			</div>
// 			`;

			
// 		});
// 		document.getElementById('userContainer').innerHTML = user;

// 		document.getElementById('contenedor').innerHTML = repos;


// 	}catch(error){
// 		console.log(error);
// 	}
// }

// cargarRepos();