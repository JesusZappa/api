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
