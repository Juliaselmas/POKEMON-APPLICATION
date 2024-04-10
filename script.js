/* NOTES:
-Hur når jag stats?
-Skapa knapp för comparePokemon IFsats: det finns mer än en pokemon i DOM
*/

let dropDownChoice = document.querySelector("#pokemon-dropdown");
let getCharacterBtn = document.querySelector("#get-caracter");
let pokemonContainer = document.querySelector("#show-pokemon-container");
let statsUl = document.querySelector("ul");
let compareBtn = document.getElementById('compare-button');
let pokemonArray = [];


let getPokemonData = async () => {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    let data = await response.json();
    return data;
  };

let createPokemonCollection = async () => {
    let pokemonData = await getPokemonData();
    pokemonArray = [];

    //loppar igenom varje pokemon i datan och skapar ett objekt av pokemon-klassen
    for (let pokemon of pokemonData.results) {
        let pokemonInfo = await getPokemonDetails(pokemon.url);
        let pokemonCard = createPokemonCard(pokemonInfo);
        pokemonArray.push(pokemonCard);
    };

    return pokemonArray;
};  

//hämtar ytterligare info till varje pokemon
async function getPokemonDetails(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
};

function createPokemonCard(details) {
    let name = details.name;
    let imgUrl = details.sprites.front_default;
    let types = details.types.map(type => type.type.name);
    let weight = details.weight;
    let height = details.height;
    let stats = {};
    for (let stat of details.stats) {
        stats[stat.stat.name] = stat.base_stat;
    }

    return new Pokemon(name, imgUrl, types, weight, height, stats);
};


createPokemonCollection().then(pokemonArray => {
    pokemonArray.forEach(pokemonCard => {
        //console.log(pokemonCard);
        //console.log(pokemonArray);
});
});

async function importToDropdown() {
    let dropdown = document.getElementById("pokemon-dropdown");
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    let data = await response.json();

    for (let pokemon of data.results) {
        //loopar igenom varje pokemon
        let pokemonDetailsResponse = await fetch(pokemon.url);
        let pokemonDetails = await pokemonDetailsResponse.json();

        //skapar ett pokemoncard för varje pokemon
        let option = document.createElement("option");
        option.value = pokemonDetails.name;
        option.text = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1); //gör första bokstaven till en versal
        dropdown.appendChild(option);
    }; 
    
};

const comparePokemonGlobal = {
    comparePokemon: null
};

class Pokemon {
    constructor(name, imgUrl, types, weight, height, stats) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.types = types;
    this.weight = weight;
    this.height = height;
    this.stats = stats;
}

comparePokemon() {
    //sätt funktionalitet här!
    let pokemonCards = document.querySelectorAll(".pokemon-card");

    if (pokemonCards.length >= 2) {
        let pokemon1 = pokemonArray.find(pokemon => pokemon.name === pokemonCards[0].querySelector("h3").textContent.toLowerCase());
        let pokemon2 = pokemonArray.find(pokemon => pokemon.name === pokemonCards[1].querySelector("h3").textContent.toLowerCase());
    
        let compareResult = document.createElement("div");
        compareResult.classList.add("compare-result-container");
        compareResult.innerHTML = `
        <h2>Comparison Results:</h2>
        <p>${pokemon1.name} vs ${pokemon2.name}</p>
        <p>Stats:</p>
        <ul>
            <li>Weight: ${pokemon1.weight} vs ${pokemon2.weight}</li>
            <li>Height: ${pokemon1.height} vs ${pokemon2.height}</li>
        </ul>    
        `;

        pokemonContainer.appendChild(compareResult);
    } else {
        alert("Unable to compare your selected Pokemons. Please try again!");
    };
    
}

//alternativ till funktion? sparas just in case
//compare(pokemon){}
};

getCharacterBtn.addEventListener("click", async () => {
    let pokemonCardDiv = document.createElement("div");
    pokemonCardDiv.classList.add("pokemon-card");

    let selectedPokemonName = dropDownChoice.value;
    console.log(selectedPokemonName);

    let selectedPokemon = pokemonArray.find(pokemon => pokemon.name === selectedPokemonName);


    //let data = await getPokemonData('https://pokeapi.co/api/v2/pokemon?limit=151' + selectedPokemon);

    //append to DOM
    if (selectedPokemon) {
        pokemonCardDiv.innerHTML = `
        <img src="${selectedPokemon.imgUrl}" alt="${selectedPokemon.name}">
        <h3>${selectedPokemon.name.toUpperCase()}</h3>
        <p>Types: ${selectedPokemon.types}</p>
        <p>Weight: ${selectedPokemon.weight} hg</p>
        <p>Height: ${selectedPokemon.height} dm</p>
        <p>Stats: ${JSON.stringify(selectedPokemon.stats)}</p>
        `;
        
        /* försök till att få stats listade som li istället för p:
        statsUl.innerHTML = "";

        for (let stat in selectedPokemon.stats) {
            let li = document.createElement("li");
            li.textContent = `${stat}: ${selectedPokemon.stats[stat]}`;
            statsUl.appendChild(li);
        };
        */

    } else {
        pokemonCardDiv.innerHTML = `<p>Unable to find information about ${selectedPokemonName}</p>`;
    } 
    
    pokemonContainer.appendChild(pokemonCardDiv);
    //createPokemonCard();

    //kontrollerar antalet Pokemon-kort och aktiverar knappen för jämförelse om det finns minst två Pokemon-kort
    let pokemonCards = document.querySelectorAll('.pokemon-card');
    
    if (pokemonCards.length >= 2) {
        compareBtn.removeAttribute('disabled');
    } else {
        compareBtn.setAttribute('disabled', true);
    }
 
});

compareBtn.addEventListener("click", () => {
    comparePokemon();
});

window.addEventListener('DOMContentLoaded', (event) => {
    importToDropdown();
});






/*
ARKIVERAD KOD:

tamagotchi kod:
createAnimalBtn.addEventListener("click", () => {

    let myPet = new Pet(nameInput, selectedType, 50, 50, 50, 50);

    const individualPetDiv = document.createElement("div");
    individualPetDiv.classList.add("indivdualPetDiv");
    const individualPet = renderPet(myPet, individualPetDiv);
    petDiv.appendChild(individualPet);

    //Adoption message
  updateMessage(
    `congratulations! you've adopted the ${typeInput} ${nameInput}!`
  );

  //e.preventDefault();

});


TEST FETCH:
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
.then(res => res.json())
.then(data => console.log(data));
//console.log(fetch('https://pokeapi.co/api/v2/pokemon?limit=151'));
*/