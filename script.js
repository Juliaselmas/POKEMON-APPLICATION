/* NOTES:
-Oavgjort om 4-4 i jämförelse?
-Spara i localStorage?
-Möjligheten att ta bort en pokemon?
-Maxantal 2?
*/

let dropDownChoice = document.querySelector("#pokemon-dropdown");
let getCharacterBtn = document.querySelector("#get-character");
let pokemonContainer = document.querySelector("#show-pokemon-container");
let compareBtn = document.getElementById('compare-button');
let restartBtn = document.getElementById('restart-button');
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
        this.stats = stats; // Nu en objekt istället för en sträng
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
    
                    // Jämför HP-värdena och utför lämplig åtgärd baserat på resultatet
                    let weightValue1 = parseInt(pokemon1.weight);
                    let weightValue2 = parseInt(pokemon2.weight);
                    let heightValue1 = parseInt(pokemon1.height);
                    let heightValue2 = parseInt(pokemon2.height);
                    let hpValue1 = parseInt(pokemon1.stats.hp);
                    let hpValue2 = parseInt(pokemon2.stats.hp);
                    let attackValue1 = parseInt(pokemon1.stats.attack);
                    let attackValue2 = parseInt(pokemon2.stats.attack);
                    let defenseValue1 = parseInt(pokemon1.stats.defense);
                    let defenseValue2 = parseInt(pokemon2.stats.defense);
                    let specAttackValue1 = parseInt(pokemon1.stats.specialattack);
                    let specAttackValue2 = parseInt(pokemon2.stats.specialattack);
                    let specDefenseValue1 = parseInt(pokemon1.stats.specialdefense);
                    let specDefenseValue2 = parseInt(pokemon2.stats.specialdefense);
                    let speedValue1 = parseInt(pokemon1.stats.speed);
                    let speedValue2 = parseInt(pokemon2.stats.speed);
    
                    if (weightValue1 > weightValue2) {
                        pokemon1Wins++; // Gör något om Pokemon 1 har högre HP än Pokemon 2
                    } else if (weightValue1 < weightValue2) {
                        pokemon2Wins++; // Gör något om Pokemon 2 har högre HP än Pokemon 1
                    }
                    if (heightValue1 > heightValue2) {
                        pokemon1Wins++; // Gör något om Pokemon 1 har högre HP än Pokemon 2
                    } else if (heightValue1 < heightValue2) {
                        pokemon2Wins++; // Gör något om Pokemon 2 har högre HP än Pokemon 1
                    }
                    if (hpValue1 > hpValue2) {
                        pokemon1Wins++; // Gör något om Pokemon 1 har högre HP än Pokemon 2
                    } else if (hpValue1 < hpValue2) {
                        pokemon2Wins++; // Gör något om Pokemon 2 har högre HP än Pokemon 1
                    }
                    if (attackValue1 > attackValue2) {
                        pokemon1Wins++; // Gör något om Pokemon 1 har högre HP än Pokemon 2
                    } else if (attackValue1 < attackValue2) {
                        pokemon2Wins++; // Gör något om Pokemon 2 har högre HP än Pokemon 1
                    }
                    if (defenseValue1 > defenseValue2) {
                        pokemon1Wins++; // Gör något om Pokemon 1 har högre HP än Pokemon 2
                    } else if (defenseValue1 < defenseValue2) {
                        pokemon2Wins++; // Gör något om Pokemon 2 har högre HP än Pokemon 1
                    }
                    if (specAttackValue1 > specAttackValue2) {
                        pokemon1Wins++; // Gör något om Pokemon 1 har högre HP än Pokemon 2
                    } else if (specAttackValue1 < specAttackValue2) {
                        pokemon2Wins++; // Gör något om Pokemon 2 har högre HP än Pokemon 1
                    }
                    if (specDefenseValue1 > specDefenseValue2) {
                        pokemon1Wins++; // Gör något om Pokemon 1 har högre HP än Pokemon 2
                    } else if (specDefenseValue1 < specDefenseValue2) {
                        pokemon2Wins++; // Gör något om Pokemon 2 har högre HP än Pokemon 1
                    }
                    if (speedValue1 > speedValue2) {
                        pokemon1Wins++; // Gör något om Pokemon 1 har högre HP än Pokemon 2
                    } else if (speedValue1 < speedValue2) {
                        pokemon2Wins++; // Gör något om Pokemon 2 har högre HP än Pokemon 1
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

        pokemonCardDiv.innerHTML = `
        <img src="${this.imgUrl}" alt="${this.name}">
        <h3>${this.name.toUpperCase()}</h3>
        <p>Types: ${this.types}</p>
        <p>Weight: ${this.weight} hg</p>
        <p>Height: ${this.height} dm</p>
        <h4>Stats:</h4><p>${selectedPokemon.stats}</p>
        `;
        
        /*
        if (this.winner) {
            pokemonCardDiv.innerHTML += `<h3 class="winner-text">WINNER!</h3>`;
        }
        */
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
        <h2>${selectedPokemon.name.toUpperCase()}</h2>
        <img src="${selectedPokemon.imgUrl}" alt="${selectedPokemon.name}">
        <p><b>Types:</b> ${selectedPokemon.types}</p>
        <p><b>Weight:</b> ${selectedPokemon.weight} hg</p>
        <p><b>Height:</b> ${selectedPokemon.height} dm</p>
        <h3>Stats:</h3><p>${selectedPokemon.stats}</p>
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
        // Aktivera knappen för jämförelse om det finns minst två Pokemon-kort
        if (pokemonCards.length + 1 >= 2) {
            restartBtn.removeAttribute('disabled');
        } else {
           restartBtn.setAttribute('disabled', true);
        }
    } else {
        alert(`Unable to find information about ${selectedPokemonName}`);
    }
});

restartBtn.addEventListener("click", () => {
    pokemonContainer.innerHTML = "";
    getCharacterBtn.removeAttribute('disabled');
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

