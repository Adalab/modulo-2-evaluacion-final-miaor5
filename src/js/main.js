'use strict';

const inputText = document.querySelector('.js_input_text');
const buttonSearch = document.querySelector('.js_button_search');
const buttonReset = document.querySelector('.js_button_reset');
const listDrink = document.querySelector('.js_list_drink');
const listFavorite = document.querySelector('.js_list_favorite');
let drinks = [];

// Funcion Manejadora

function handleClickCoctel(event) {
  event.preventDefault();
  //lo de la izquierda es el contenedor (const o variable)y lo de la derecha del = es lo que lo quiero meter dentro del contenedor, el valor
  listFavorite.innerHTML = event.currentTarget.html; //es el elmento donde se origino el evento, en este caso es el li.
}

function listenerCocteles() {
  //aqui escucha cuando hay un click en alguno de las bebidas
  const liDrinks = document.querySelectorAll('.js_drink');
  for (const item of liDrinks) {
    item.addEventListener('click', handleClickCoctel);
  }
}

function paintCocteles() {
  //renderizar HTML y la funcion de listenerCocteles
  let html = '';

  for (const coctel of drinks) {
    html += `<li class='drink  js_drink' id='${coctel.idDrink}'>`;
    html += `<div class='js_set'>`;
    html += `<img  class='js_photo' src='${coctel.strDrinkThumb}'>`;
    html += `<h2>${coctel.strDrink}</h2>`;
    html += `</div>`;
    html += `</li>`;
  }
  listDrink.innerHTML = html;
  listenerCocteles();
}
function handleSearch() {
  if (inputText.value !== '') {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        drinks = data.drinks;
        //renderizar HTML
        paintCocteles();
      });
  } else {
    listDrink.innerHTML = '';
  }
}
buttonSearch.addEventListener('click', handleSearch);
