'use strict';

const inputText = document.querySelector('.js_input_text');
const buttonSearch = document.querySelector('.js_button_search');
const buttonReset = document.querySelector('.js_button_reset');
const listDrink = document.querySelector('.js_list_drink');
const listFavorite = document.querySelector('.js_list_favorite');

let drinks = [];
let favorites = [];

// Funcion Manejadora

function paintFavoriteCocteles() {
  let html = '';

  for (const coctel of favorites) {
    //AQUI he creado un variable para decir qie si el li(coctel) no tiene url (osea si ees igual a null) que ponga una foto que yo he creado y sino que ponga ña que tiene
    let imagenUrl = '';
    if (coctel.strDrinkThumb === null) {
      imagenUrl =
        'https://via.placeholder.com/210x295/FF0000/FFFFFF%20C/O%20https://placeholder.com//?text=Cocteles';
    } else {
      imagenUrl = coctel.strDrinkThumb;
    }

    html += `<li class='drink_fav js_drink-fav js_drink' id='${coctel.idDrink}'>`;
    html += `<div class=' js_set-fav set_fav'>`;
    html += `<img  class='js_photo-fav' src='${imagenUrl}'>`;
    html += `<h2 class="name_drink-fav">${coctel.strDrink}</h2>`;
    html += `<button class="js_delete" id="borrar">X</button>`;
    html += `</div>`;
    html += `</li>`;
  }
  listFavorite.innerHTML = html;
}

function paintCocteles() {
  //renderizar HTML y la funcion de listenerCocteles
  let html = '';

  for (const coctel of drinks) {
    //AQUI he creado un variable para decir qie si el li(coctel) no tiene url (osea si ees igual a null) que ponga una foto que yo he creado y sino que ponga ña que tiene
    let imagenUrl = '';
    if (coctel.strDrinkThumb === null) {
      imagenUrl =
        'https://via.placeholder.com/210x295/FF0000/FFFFFF%20C/O%20https://placeholder.com//?text=Cocteles';
    } else {
      imagenUrl = coctel.strDrinkThumb;
    }
    //AQUI HE AÑADIDO UNA CLASE PARA AQUELLAS LI (COCTEL.IDDRINK) ESTEN EN FAVORITOS
    let classFavorite = '';
    //esto me dice que si id de los favoritos coincide con el id de la bebida
    const coctelFoundIndex = favorites.findIndex((fav) => {
      return fav.idDrink === coctel.idDrink;
    });
    // si la constante devuelve !-1 significa que si es favorito por lo que hay que añadirle una clase
    if (coctelFoundIndex !== -1) {
      classFavorite = 'click_favorite';
    } else {
      classFavorite = '';
    }

    html += `<li class='drink ${classFavorite} js_drink' id='${coctel.idDrink}'>`;
    html += `<div class='js_set'>`;
    html += `<img  class='js_photo' src='${imagenUrl}'>`;
    html += `<h2 class="name_drink">${coctel.strDrink}</h2>`;
    html += `</div>`;
    html += `</li>`;
  }

  listDrink.innerHTML = html;
  listenerCocteles();
}

function handleClickCoctel(event) {
  event.preventDefault();
  //  lo de la izquierda es el contenedor (const o variable)y lo de la derecha del = es lo que lo quiero meter dentro del contenedor, el valor

  //AQUI ESTAMOS AÑADIENDO UN LI A LA LISTA DE FAVORITOS, PERO ANTES TENEMOS QUE SABER SI ESTA O NO EN LA LISTA DE FAVORITOS

  const idCoctelSelected = event.currentTarget.id;
  console.log(idCoctelSelected);
  //Primero miramos si esta en la lista de favoritos
  const coctelFound = drinks.find((fav) => {
    return fav.idDrink === idCoctelSelected;
  });

  //usamos el findIndex para que nos de el -1 sino esta en la lista de favoritos
  const coctelFoundIndex = favorites.findIndex((fav) => {
    return fav.idDrink === idCoctelSelected;
  });
  // aqui ya ponemos el condicional. si no esta en la lista lo anadiños a la lista de favoritos mediante un push y si ya esta en la lista, cuando hagamos el click lo eliminaremos de la lista usando un slice.
  if (coctelFoundIndex === -1) {
    favorites.push(coctelFound);
  } else {
    favorites.splice(coctelFoundIndex, 1);
  }

  ///// guardo la lista de favorites en el ls
  localStorage.setItem('listFavorites', JSON.stringify(favorites));

  // click.classList.add('click_favorite');//seria para ponerle clase cuando le den click
  paintCocteles();
  paintFavoriteCocteles();

  listenerX();
}

function listenerCocteles() {
  //aqui escucha cuando hay un click en alguno de las bebidas
  const liDrinks = document.querySelectorAll('.js_drink');
  for (const item of liDrinks) {
    item.addEventListener('click', handleClickCoctel);
  }
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

// //GUARDAR LOS LISTA DE FAVORITOS EN EL LOCAL STORAGE
// const listOfFavoritesStorage = JSON.parse(
//   localStorage.getItem('listFavorites')
// ); //nombre con el que lo guarde

// if (listOfFavoritesStorage !== null) {
//   paintFavoriteCocteles(listOfFavoritesSorage);
// } else {
//   //Guardar la informacion en el ls
//   localStorage.setItem('listFavorites', JSON.stringify(favorites));
//   //renderizar HTML
//   paintFavoriteCocteles();
// }

//AQUI  INTENTO DE BORRA MEDIANTE LA X

function handleDelet(event) {
  const liselected = event.currentTarget.id;
  const coctelFoundIndex = favorites.findIndex((fav) => {
    return fav.idDrink === liselected;
  });

  favorites.splice(coctelFoundIndex, 1);
  paintFavoriteCocteles();
}

function listenerX() {
  //aqui escucha cuando hay un click en alguno de las bebidas
  const lifavorite = document.querySelectorAll('.js_drink-fav');
  for (const item of lifavorite) {
    item.addEventListener('click', handleDelet);
  }
}
//AQUI INTENTO HACER QUE SE HAGA RESET
function handleReset() {
  //version 1 haciendo splice
  // var favoritesDelete = favorites.splice(0, favorites.length);
  //version 2 dicienodo que el array esta vacio
  favorites = [];
  console.log(favorites);
  paintFavoriteCocteles();
}
buttonReset.addEventListener('click', handleReset);
buttonSearch.addEventListener('click', handleSearch);
