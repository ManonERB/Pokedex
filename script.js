let indexDepart = 1;
let indexFin = 15;
const existingPokemonCards = []; // Tableau pour stocker les cartes Pokémon actuelles

function replaceTypeWithFrenchName(type) {
  // Mapping des types en français
  const typeMappings = {
    "fire": "feu",
    "grass": "végétal",
    "electric": "électrique",
    "water": "aquatique",
    "psychic": "psy",
    "ghost": "fantôme",
    "ground": "sol",
    "rock": "roche",
    "fairy": "féérique",
    "bug": "insecte",
    "fighting": "combat",
    "ice": "glace"
  };

  return typeMappings[type] || type;
}

function createPokemonCard(data) {
  const type = replaceTypeWithFrenchName(data.types[0].type.name);
  const firstLetterUppercase = data.name[0].toUpperCase() + data.name.slice(1).toLowerCase();

  const pokemonCard = document.createElement("div");
  pokemonCard.className = `pokemon ${data.types[0].type.name}`;

  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `
    <h3 class="name">${firstLetterUppercase}</h3>
    <div class="imgContainer">
      <img src="${data.sprites.front_default}" alt="${firstLetterUppercase}" />
    </div>
    <div class="pokemonNumber">N° ${data.id}</div>
  `;

  const typeElement = document.createElement("div");
  typeElement.className = "type";
  typeElement.innerHTML = `Type: <span>${type}</span>`;

  pokemonCard.appendChild(info);
  pokemonCard.appendChild(typeElement);

  return pokemonCard;
}

function fetchAndDisplayPokemon(indexStart, indexEnd) {
  for (let i = indexStart; i <= indexEnd; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonCard = createPokemonCard(data);
        existingPokemonCards.push(pokemonCard); // Ajoutez la nouvelle carte au tableau
        updateDisplay();
      });
  }
}

function updateDisplay() {
  const pokemonContainer = document.querySelector("#pokemonContainer");
  pokemonContainer.innerHTML = ""; // Vide le contenu actuel de #pokemonContainer

  // Affiche toutes les cartes Pokémon actuelles
  existingPokemonCards.forEach((card) => {
    pokemonContainer.appendChild(card);
  });
}

document.querySelector("#next").addEventListener("click", function () {
  indexDepart = indexFin + 1;
  indexFin += 15;
  fetchAndDisplayPokemon(indexDepart, indexFin);
});

// Chargement initial
fetchAndDisplayPokemon(indexDepart, indexFin);