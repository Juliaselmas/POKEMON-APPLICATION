/* NOTES:
-Oavgjort om 4-4 i jämförelse?
-Spara i localStorage?
-Möjligheten att ta bort en pokemon?
*/

/* NOTES:
-Oavgjort om 4-4 i jämförelse?
-Spara i localStorage?
-Möjligheten att ta bort en pokemon?
-Maxantal 2?
*/

let dropDownChoice = document.querySelector('#pokemon-dropdown');
let getCharacterBtn = document.querySelector('#get-character');
let pokemonContainer = document.querySelector('#show-pokemon-container');
let resultContainer = document.querySelector('#result-container');
let resultH3 = document.querySelector('#result-h3');
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
        
        // Lägg till klassen 'winner' om kortet är vinnaren
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


        // Lägg till "WINNER!" till det vinnande Pokémon-kortet
        winner.classList.add('winner');
    }
});
    


window.addEventListener('DOMContentLoaded', (event) => {
    importToDropdown();
});

/*
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
    console.log(data);
    return data;
  };

  let createPokemonCollection = async () => {
    let pokemonData = await getPokemonData();
    pokemonArray = [];
    //console.log(pokemonData);

    //loppar igenom varje pokemon i datan och skapar ett objekt av pokemon-klassen
    for (let pokemon of pokemonData.results) {
        let pokemonInfo = await getPokemonDetails(pokemon.url);
        console.log(pokemonInfo);
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
   let data = details.data; // Uppdatera för att hämta 'data' från detaljobjektet

    let name = details.name;
    let imgUrl = details.sprites.front_default;
    let types = details.types.map(typeInfo => typeInfo.type.name);
    let weight = details.weight;
    let height = details.height;
    let stats = {
        hp: details.stats[0].base_stat,
        attack: details.stats[1].base_stat,
        specialAttack: details.stats[2].base_stat,
        defense: details.stats[3].base_stat,
        specialDefense: details.stats[4].base_stat,
        speed: details.stats[5].base_stat
    };

    return new Pokemon(name, imgUrl, types, weight, height, stats);
}


createPokemonCollection().then(pokemonArray => {
    pokemonArray.forEach(pokemonCard => {
        let option = document.createElement("option");
        option.value = pokemonCard.data.name;
        option.text = pokemonCard.data.name.charAt(0).toUpperCase() + pokemonCard.data.name.slice(1);
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
    constructor(name, imgUrl, types, weight, height, data) {
        this.name = name;
    this.imgUrl = imgUrl;
    this.types = types;
    this.weight = weight;
    this.height = height;
        this.stats = {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            specialAttack: data.stats[2].base_stat,
            defense: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat
        };
    }

    static comparePokemon() {
        let pokemonCards = document.querySelectorAll(".pokemon-card");
    
        if (pokemonCards.length >= 2) {
            let maxWins = 0; // Max antal vinster
            let winnerIndex = -1; // Index för vinnande Pokémon-kort
    
            // Loopa igenom alla kombinationer av Pokemon-kort och jämför dem
            for (let i = 0; i < pokemonCards.length; i++) {
                for (let j = i + 1; j < pokemonCards.length; j++) {
                    let pokemon1 = pokemonCards[i].pokemon; // Hämta Pokémon-objektet från kortet
                    let pokemon2 = pokemonCards[j].pokemon; // Hämta Pokémon-objektet från kortet
    
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
                    }
    
                    // Uppdatera max antal vinster och index för vinnande kort
                    if (pokemon1Wins > pokemon2Wins && pokemon1Wins > maxWins) {
                        maxWins = pokemon1Wins;
                        winnerIndex = i;
                    } else if (pokemon2Wins > pokemon1Wins && pokemon2Wins > maxWins) {
                        maxWins = pokemon2Wins;
                        winnerIndex = j;
                    }
                }
            }
    
            // Hämta det vinnande Pokémon-kortet
            let winnerPokemonCard = pokemonCards[winnerIndex];
    
            // Returnera det vinnande pokemon-kortet
            return winnerPokemonCard;
        } else {
            return null;
    }
}
};

class PokemonCard extends Pokemon {
    constructor(data) {
        super(data); // Anropa superkonstruktören med data-objektet
        this.winner = false; // Ange initialt att kortet inte är vinnaren
    }

    // Metod för att rendera Pokemon-kortet och lägga till vinnarmeddelandet om det är vinnaren
    render() {
        let pokemonCardDiv = document.createElement("div");
        pokemonCardDiv.classList.add("pokemon-card");
    
        pokemonCardDiv.innerHTML = `
            <img src="${this.imgUrl}" alt="${this.name}">
            <h3>${this.name.toUpperCase()}</h3>
            <p>Types: ${this.types.join(", ")}</p>
            <p>Weight: ${this.weight} hg</p>
            <p>Height: ${this.height} dm</p>
            <h4>Stats:</h4>
            <p>HP: ${this.stats.hp}</p>
            <p>Attack: ${this.stats.attack}</p>
            <p>Defense: ${this.stats.defense}</p>
            <p>Special Attack: ${this.stats.specialAttack}</p>
            <p>Special Defense: ${this.stats.specialDefense}</p>
            <p>Speed: ${this.stats.speed}</p>
        `;
    
        if (this.winner) {
            pokemonCardDiv.innerHTML += `<h3 class="winner-text">WINNER!</h3>`;
        }
        return pokemonCardDiv;
    }
};


getCharacterBtn.addEventListener("click", async () => {
    let selectedPokemonName = dropDownChoice.value;
    let selectedPokemon = pokemonArray.find(pokemon => pokemon.data.name === selectedPokemonName);
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
        <h3>${selectedPokemon.data.name.toUpperCase()}</h3>
        <p>Types: ${selectedPokemon.data.types.join(", ")}</p>
        <p>Weight: ${selectedPokemon.data.weight} hg</p>
        <p>Height: ${selectedPokemon.data.height} dm</p>
        <h4>Stats:</h4>
        <p>HP: ${selectedPokemon.stats.hp}</p>
        <p>Attack: ${selectedPokemon.stats.attack}</p>
        <p>Defense: ${selectedPokemon.stats.defense}</p>
        <p>Special Attack: ${selectedPokemon.stats.specialAttack}</p>
        <p>Special Defense: ${selectedPokemon.stats.specialDefense}</p>
        <p>Speed: ${selectedPokemon.stats.speed}</p>
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

*/




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