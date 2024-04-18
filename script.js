/* NOTES:
-Oavgjort om 4-4 i jämförelse?
-Spara i localStorage?
-Möjligheten att ta bort en pokemon?
*/

let dropDownChoice = document.querySelector('#pokemon-dropdown');
let getCharacterBtn = document.querySelector('#get-character');
let pokemonContainer = document.querySelector('#show-pokemon-container');
let resultContainer = document.querySelector('#result-container');
let winnerH3 = document.querySelector('#winner-h3');
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
        //formaterar nyckel-värdepar för varje statistik
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
            //array för att lagra antalet vinster för varje pokemon
            let pokemonWins = Array(pokemonCards.length).fill(0); 
            let maxWins = 0; 
    
            //loopar igenom alla kombinationer av Pokemon-kort och jämför dem
            for (let i = 0; i < pokemonCards.length; i++) {
                for (let j = i + 1; j < pokemonCards.length; j++) {
                    let pokemon1 = pokemonArray.find(pokemon => pokemon.name === pokemonCards[i].querySelector("h2").textContent.toLowerCase());
                    let pokemon2 = pokemonArray.find(pokemon => pokemon.name === pokemonCards[j].querySelector("h2").textContent.toLowerCase());
                
                    //kontrollerar om båda pokemons är giltiga
                    if (!pokemon1 || !pokemon2) {
                        continue;
                    }
    
                    //räknar antalet vinster för varje statistik
                    let pokemon1Wins = 0;
                    let pokemon2Wins = 0;

    
                    //jämför alla värden
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
                        pokemon1Wins++; 
                    } else if (weightValue1 < weightValue2) {
                        pokemon2Wins++; 
                    }
                    if (heightValue1 > heightValue2) {
                        pokemon1Wins++; 
                    } else if (heightValue1 < heightValue2) {
                        pokemon2Wins++; 
                    }
                    if (hpValue1 > hpValue2) {
                        pokemon1Wins++; 
                    } else if (hpValue1 < hpValue2) {
                        pokemon2Wins++; 
                    }
                    if (attackValue1 > attackValue2) {
                        pokemon1Wins++; 
                    } else if (attackValue1 < attackValue2) {
                        pokemon2Wins++; 
                    }
                    if (defenseValue1 > defenseValue2) {
                        pokemon1Wins++; 
                    } else if (defenseValue1 < defenseValue2) {
                        pokemon2Wins++; 
                    }
                    if (specAttackValue1 > specAttackValue2) {
                        pokemon1Wins++; 
                    } else if (specAttackValue1 < specAttackValue2) {
                        pokemon2Wins++; 
                    }
                    if (specDefenseValue1 > specDefenseValue2) {
                        pokemon1Wins++; 
                    } else if (specDefenseValue1 < specDefenseValue2) {
                        pokemon2Wins++; 
                    }
                    if (speedValue1 > speedValue2) {
                        pokemon1Wins++; 
                    } else if (speedValue1 < speedValue2) {
                        pokemon2Wins++; 
                    }
                    
    
                    //uppdaterar antalet vinster för varje pokemon
                    pokemonWins[i] += pokemon1Wins;
                    pokemonWins[j] += pokemon2Wins;
                    
                   
    
                    //uppdaterar antal vinster
                    maxWins = Math.max(maxWins, pokemonWins[i], pokemonWins[j]);
                }
            }
    
            //hittar vinnaren med flest vinster
            let winnerIndex = pokemonWins.indexOf(maxWins);
            let winnerPokemonCard = pokemonCards[winnerIndex];
    
            //returnerar det vinnande pokemon-kortet
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

    //metod för att rendera Pokemon-kortet och lägga till vinnarmeddelandet om det är vinnaren
    render() {
        let pokemonCardDiv = document.createElement("div");
        pokemonCardDiv.classList.add("pokemon-card");

        pokemonCardDiv.innerHTML = `
        <img src="${this.imgUrl}" alt="${this.name}">
        <h2>${this.name.toUpperCase()}</h2>
        <p>Types: ${this.types}</p>
        <p>Weight: ${this.weight} hg</p>
        <p>Height: ${this.height} dm</p>
        <h3>Stats:</h3><p>${selectedPokemon.stats}</p>
        `;
        
        //lägger till klassen 'winner' om kortet är vinnaren
        if (this.winner) {
            pokemonCardDiv.classList.add('winner');
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

        //kontrollerar om det redan finns två pokemon-kort i DOM
        if (pokemonCards.length >= 2) {
            alert("You can only select up to two pokémons.");
            return; 
        }

        let pokemonCardDiv = document.createElement("div");
        pokemonCardDiv.classList.add("pokemon-card");

        pokemonCardDiv.innerHTML = `
        <h2>${selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h2>
        <img src="${selectedPokemon.imgUrl}" alt="${selectedPokemon.name}">
        <p><b>Types:</b> ${selectedPokemon.types}</p>
        <p><b>Weight:</b> ${selectedPokemon.weight} hg</p>
        <p><b>Height:</b> ${selectedPokemon.height} dm</p>
        <h3>Stats:</h3><p>${selectedPokemon.stats}</p>
        `;

        pokemonContainer.appendChild(pokemonCardDiv);

        //återställer dropdown-listans val till placeholder
        dropDownChoice.selectedIndex = 0;

        //kontrollerar antalet Pokemon-kort och inaktiverar knappen för att hämta fler karaktärer om det redan visas två Pokemon-kort
        if (pokemonCards.length + 1 >= 2) {
            getCharacterBtn.setAttribute('disabled', true);
        }

        //aktivera knappen för jämförelse om det finns minst två Pokemon-kort
        if (pokemonCards.length + 1 >= 2) {
            compareBtn.removeAttribute('disabled');
        } else {
            compareBtn.setAttribute('disabled', true);
        }
        //aktiverar knappen för restart om det finns minst två Pokemon-kort
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
    winnerH3.innerHTML = "";
});

compareBtn.addEventListener("click", () => {
    console.log("button is responding");

    let winner = Pokemon.comparePokemon();
    console.log(winner);
    if (winner) {
        winner.classList.add('winner');
        let winnerName = winner.querySelector("h2").textContent;
        winnerName = winnerName.charAt(0).toUpperCase() + winnerName.slice(1).toLowerCase();
        winnerH3.textContent = `${winnerName} wins!`;
    }
});
    


window.addEventListener('DOMContentLoaded', (event) => {
    importToDropdown();
});