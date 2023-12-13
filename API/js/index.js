const grid = document.querySelector(".grid");

const fetchCharacters = (quantity) => {
  fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${quantity}`)
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      createCharacterCards(data);
    });
};

const createCharacterCards = (data) => {
  let cards = "";
  data.forEach(item => {
    // Extract character data
    const name = item.character;
    const quote = item.quote;
    const imageURL = item.image;

    // Generate the HTML card
    cards += `
      <div class="character_card">
        <div class="character_car">
          <div class="img_container">
            <img class="character_img" src="${imageURL}" alt="">
          </div>
          <div class="info_character">
            <h4 class="character_name">${item.character}</h4>
            <small> ${item.character} dice </small>
            <p>${item.quote}</p>
          </div>
        </div>
      </div>
    `;
  });
  grid.innerHTML = cards;
};

fetchCharacters(10);

const search_btn = document.querySelector(".search_btn");
const search_input = document.querySelector(".search_input");

function fetchCharactersByName() {
  const searchTerm = search_input.value;

  fetch (`https://thesimpsonsquoteapi.glitch.me/quotes?character=${searchTerm}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      // Mostrar un mensaje de error
      console.error(response.statusText);
    }
  })
  .then(data => {
    // Procesar los datos y crear las tarjetas de personajes
    createCharacterCards(data);
  })
  .catch(error => {
    console.error(error);
  });
}

function createCharacterCards(data) {
  // Implementar la lógica para crear las tarjetas de personajes
  // utilizando los datos recibidos de la API
  // ...

  // Ejemplo de cómo crear una tarjeta de personaje
  const characterCard = document.createElement("div");
  characterCard.classList.add("character-card");

  const characterImage = document.createElement("img");
  characterImage.src = data.image;

  const characterName = document.createElement("h2");
  characterName.textContent = data.name;

  characterCard.appendChild(characterImage);
  characterCard.appendChild(characterName);

  // ...

  // Agregar la tarjeta de personaje al DOM
  const charactersContainer = document.querySelector(".characters-container");
  charactersContainer.appendChild(characterCard);
}

// Invocar la función cuando el usuario presiona Enter
search_input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    fetchCharactersByName();
  }
});

// Invocar la función cuando el usuario hace clic en el botón
search_btn.addEventListener("click", fetchCharactersByName);




}
 