/* NOTES:
-Oavgjort om 4-4 i jämförelse?
-Spara i localStorage?
-Möjligheten att ta bort en pokemon?
-Maxantal 2?
*/

let dropDownChoice = document.querySelector("#pokemon-dropdown");
let getCharacterBtn = document.querySelector("#get-character");
let pokemonContainer = document.querySelector("#show-pokemon-container");
let resultContainer = document.querySelector("#show-result-container");
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

    let statsString = "";
    for (let stat in stats) {
        // Formatera nyckel-värdepar för varje statistik
        statsString += `<p>${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${stats[stat]}</p>`;
    }

    return new Pokemon(name, imgUrl, types, weight, height, statsString);
};


createPokemonCollection().then(pokemonArray => {
    pokemonArray.forEach(pokemonCard => {
        let option = document.createElement("option");
        option.value = pokemonCard.name;
        option.text = pokemonCard.name.charAt(0).toUpperCase() + pokemonCard.name.slice(1);
        dropDownChoice.appendChild(option);
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


class Pokemon {
    constructor(name, imgUrl, types, weight, height, stats) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.types = types;
    this.weight = weight;
    this.height = height;
    this.stats = stats;
}

static comparePokemon() {
    let pokemonCards = document.querySelectorAll(".pokemon-card");

    if (pokemonCards.length >= 2) {
        let pokemonWins = Array(pokemonCards.length).fill(0); // Array för att lagra antalet vinster för varje pokemon
        let maxWins = 0; // Max antal vinster

        // Loopa igenom alla kombinationer av Pokemon-kort och jämför dem
        for (let i = 0; i < pokemonCards.length; i++) {
            for (let j = i + 1; j < pokemonCards.length; j++) {
                let pokemon1 = pokemonArray.find(pokemon => pokemon.name === pokemonCards[i].querySelector("h3").textContent.toLowerCase());
                let pokemon2 = pokemonArray.find(pokemon => pokemon.name === pokemonCards[j].querySelector("h3").textContent.toLowerCase());

                // Kontrollera om båda pokemons är giltiga
                if (!pokemon1 || !pokemon2) {
                    continue;
                }

                // Räkna antalet vinster för varje statistik
                let pokemon1Wins = 0;
                let pokemon2Wins = 0;

                for (let stat in pokemon1.stats) {
                    let statValue1 = pokemon1.stats[stat];
                    let statValue2 = pokemon2.stats[stat];
                    

                    if (parseInt(statValue1) > parseInt(statValue2)) {
                        pokemon1Wins++;
                    } else if (parseInt(statValue1) < parseInt(statValue2)) {
                        pokemon2Wins++;
                    }
                    console.log(statValue1);
                    console.log(statValue2);
                }

                // Uppdatera antalet vinster för varje pokemon
                pokemonWins[i] += pokemon1Wins;
                pokemonWins[j] += pokemon2Wins;

                // Uppdatera max antal vinster
                maxWins = Math.max(maxWins, pokemonWins[i], pokemonWins[j]);
            }
        }

        // Hitta vinnaren med flest vinster
        let winnerIndex = pokemonWins.indexOf(maxWins);
        let winnerPokemonCard = pokemonCards[winnerIndex];

        // Returnera det vinnande pokemon-kortet
        return winnerPokemonCard;
    } else {
        return null;
    }
}
};

class PokemonCard extends Pokemon {
    constructor(name, imgUrl, types, weight, height, stats) {
        super(name, imgUrl, types, weight, height, stats);
        this.winner = false; // Ange initialt att kortet inte är vinnaren
    }

    // Metod för att rendera Pokemon-kortet och lägga till vinnarmeddelandet om det är vinnaren
    render() {
        let pokemonCardDiv = document.createElement("div");
        pokemonCardDiv.classList.add("pokemon-card");

        // Kontrollera vilka värden som är högre och lägre för att lägga till klasser för färg
        let statsHtml = "";
        for (let stat in this.stats) {
            let statValue = this.stats[stat];
            let statClass = parseInt(statValue) > 80 ? 'high-stat' : (parseInt(statValue) < 60 ? 'low-stat' : ''); // Anpassa dessa tröskelvärden efter önskemål
            statsHtml += `<p class="${statClass}">${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${statValue}</p>`;
        }

        pokemonCardDiv.innerHTML = `
    <img src="${this.imgUrl}" alt="${this.name}">
    <h3>${this.name.toUpperCase()}</h3>
    <p>Types: ${this.types}</p>
    <p>Weight: ${this.weight} hg</p>
    <p>Height: ${this.height} dm</p>
    <h4>Stats:</h4><p>${selectedPokemon.stats}</p>
`;
        if (this.winner) {
            pokemonCardDiv.innerHTML += `<h3 class="winner-text">WINNER!</h3>`;
        }
        return pokemonCardDiv;
    }
};


getCharacterBtn.addEventListener("click", async () => {
    let selectedPokemonName = dropDownChoice.value;
    let selectedPokemon = pokemonArray.find(pokemon => pokemon.name === selectedPokemonName);
    console.log(selectedPokemonName);

    if (selectedPokemon) {
        let pokemonCards = document.querySelectorAll('.pokemon-card');

        // Kontrollera om det redan finns två pokemon-kort i DOM
        if (pokemonCards.length >= 2) {
            alert("You can only select up to two pokémons.");
            return; // Avsluta funktionen om det redan finns två pokemon-kort
        }

        let pokemonCardDiv = document.createElement("div");
        pokemonCardDiv.classList.add("pokemon-card");

        pokemonCardDiv.innerHTML = `
        <img src="${selectedPokemon.imgUrl}" alt="${selectedPokemon.name}">
        <h3>${selectedPokemon.name.toUpperCase()}</h3>
        <p>Types: ${selectedPokemon.types}</p>
        <p>Weight: ${selectedPokemon.weight} hg</p>
        <p>Height: ${selectedPokemon.height} dm</p>
        <h4>Stats:</h4><p>${selectedPokemon.stats}</p>
        `;

        pokemonContainer.appendChild(pokemonCardDiv);

        // Kontrollera antalet Pokemon-kort och inaktivera knappen för att hämta fler karaktärer om det redan visas två Pokemon-kort
        if (pokemonCards.length + 1 >= 2) {
            getCharacterBtn.setAttribute('disabled', true);
        }

        // Aktivera knappen för jämförelse om det finns minst två Pokemon-kort
        if (pokemonCards.length + 1 >= 2) {
            compareBtn.removeAttribute('disabled');
        } else {
            compareBtn.setAttribute('disabled', true);
        }
    } else {
        alert(`Unable to find information about ${selectedPokemonName}`);
    }
});


compareBtn.addEventListener("click", () => {
    console.log("button is responding");

    let winner = Pokemon.comparePokemon();
    console.log(winner);
    if (winner) {
        // Ta bort befintliga "WINNER!"-meddelanden
        let winnerText = document.querySelectorAll('.winner-text');
        winnerText.forEach(text => text.remove());

        // Lägg till "WINNER!" till det vinnande Pokémon-kortet
        winner.classList.add('winner');
    }
});
    


window.addEventListener('DOMContentLoaded', (event) => {
    importToDropdown();
});






/*
ARKIVERAD KOD:

comparePokemon funktion: 
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

    const comparePokemonGlobal = {
    comparePokemon: null
};


let compareResult = document.createElement("div");
        compareResult.classList.add("compare-result");
        compareResult.innerHTML = `
            <h2>Comparison Results:</h2>
            <p>${pokemon1.name} vs ${pokemon2.name}</p>
            <p>Stats:</p>
            <ul>
                <li>Weight: ${pokemon1.weight} vs ${pokemon2.weight}</li>
                <li>Height: ${pokemon1.height} vs ${pokemon2.height}</li>
            </ul>    
        `;

        resultContainer.appendChild(compareResult);
    } else {
        alert("Unable to compare your selected Pokemons. Please try again!");
    }

static comparePokemon() {
    let pokemonCards = document.querySelectorAll(".pokemon-card");

    if (pokemonCards.length >= 2) {
        let pokemon1 = pokemonArray.find(pokemon => pokemon.name === pokemonCards[0].querySelector("h3").textContent.toLowerCase());
        let pokemon2 = pokemonArray.find(pokemon => pokemon.name === pokemonCards[1].querySelector("h3").textContent.toLowerCase());
    
        let winner = null;
        let pokemon1Wins = 0;
        let pokemon2Wins = 0;

        // Loopa igenom och jämför numeriska värden för varje statistik
        for (let stat in pokemon1.stats) {
            let statValue1 = pokemon1.stats[stat];
            let statValue2 = pokemon2.stats[stat];

            if (parseInt(statValue1) > parseInt(statValue2)) {
                pokemon1Wins++;
            } else if (parseInt(statValue1) < parseInt(statValue2)) {
                pokemon2Wins++;
            }
        }

        // Jämför antalet vinster för att avgöra vinnaren
        if (pokemon1Wins > pokemon2Wins) {
            winner = pokemon1;
        } else if (pokemon1Wins < pokemon2Wins) {
            winner = pokemon2;
        }

        // Markera vinnaren i gränssnittet
        if (winner) {
            let winningCardDiv = pokemonCards[0].querySelector("h3").textContent.toLowerCase() === winner.name.toLowerCase() ? pokemonCards[0] : pokemonCards[1];
            winningCardDiv.innerHTML += `<h3 class="winner-text">WINNER!</h3>`;
        } else {
            alert("Unable to compare your selected Pokemons. Please try again!");
        }
    }
}
};

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