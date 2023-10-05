// Función para buscar por nombre de personaje
const searchCharacter = () => {
  const characterName = document.querySelector("#searchInput").value; // Obtiene el valor del campo de búsqueda
  fetchCharacter(characterName);
}

// Agregar un evento click al botón de búsqueda
document.querySelector("#searchButton").addEventListener("click", searchCharacter);

// Función para obtener datos de la API
const fetchCharacter = (characterName) => {
  fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=15&character=ho //Devolvería hasta 15 citas de Homer y Milhouse
  `)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const filteredData = data.filter((item) => item.character === characterName);
      createCharacterCards(filteredData);
    });
}

// Función para crear las tarjetas de personajes
const createCharacterCards = (data) => {
  let cards = "";
  const grid = document.querySelector(".grid");

  data.forEach((item) => {
    cards += `
      <div class="section_personajed">
        <div class="section_tarjeta">
          <img src="${item.image}">
          <div class="info_section">
            <h4 class="section_nombre">${item.character}</h4>
            <small>${item.character} Dice: </small>
            <p>${item.quote}</p>
          </div>
        </div>
      </div>`;
  });

  grid.innerHTML = cards;
};
