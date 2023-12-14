const grid = document.querySelector(".grid");
const searchInput = document.querySelector(".search_input");
let searchTimeout;

const searchCharacters = (searchText) => {
  fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=80`)
    .then((response) => response.json())
    .then(data => {
      const filteredData = data.filter(item => {
        return item.character.toLowerCase().includes(searchText.toLowerCase()) ||
               item.quote.toLowerCase().includes(searchText.toLowerCase());
      });

      createCharacterCard(filteredData[0]); // Mostrar solo la primera coincidencia
    });
};

const handleSearch = () => {
  clearTimeout(searchTimeout);
  const searchText = searchInput.value.trim();

  searchTimeout = setTimeout(() => {
    if (searchText !== "") {
      searchCharacters(searchText);
    } else {
      fetchCharacters(20);
    }
  }, 500);
};

searchInput.addEventListener("input", handleSearch);

const fetchCharacters = (quantity) => {
  fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${quantity}`)
    .then((response) => response.json())
    .then(data => {
      createCharacterCards(data);
    });
};

const createCharacterCards = (data) => {
  let cards = "";
  data.forEach(item => {
    const name = item.character;
    const quote = item.quote;
    const imageURL = item.image;

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

const createCharacterCard = (item) => {
  if (item) {
    const name = item.character;
    const quote = item.quote;
    const imageURL = item.image;

    const card = `
      <div class="character_card">
        <div class="character_car">
          <div class="img_container">
            <img class="character_img" src="${imageURL}" alt="">
          </div>
          <div class="info_character">
            <h4 class="character_name">${name}</h4>
            <small> ${name} dice </small>
            <p>${quote}</p>
          </div>
        </div>
      </div>
    `;
    grid.innerHTML = card;
  } else {
    grid.innerHTML = "<p>No se encontraron resultados</p>";
  }
};

fetchCharacters(20);
