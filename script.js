const buttonSound = document.getElementById('buttonSound'); // Seleziona l'elemento audio con l'id 'buttonSound'.

const generateButton = document.getElementById('generatePokemon'); // Seleziona il pulsante con id 'generatePokemon'.
const pokemonSprite = document.getElementById('pokemonSprite'); // Seleziona l'elemento immagine del Pokémon.
const pokemonName = document.getElementById('pokemonName'); // Seleziona l'elemento per visualizzare il nome del Pokémon.
const catchButton = document.getElementById('catch'); // Seleziona il pulsante per catturare il Pokémon.
const viewPokedexButton = document.getElementById('viewPokedex'); // Seleziona il pulsante per visualizzare il Pokédex.

const runButton = document.getElementById('run'); // Seleziona il pulsante con id 'run'.

// Aggiunge un evento "click" al pulsante 'run'.
runButton.addEventListener('click', function() {
    playButtonSound(); // Riproduce il suono del pulsante.
    setTimeout(() => {
        window.location.href = "index.html"; // Dopo 500 ms, reindirizza alla pagina index.html.
    }, 500); // Ritardo per consentire la riproduzione del suono.
});

// Funzione per riprodurre il suono del pulsante.
function playButtonSound() {
    buttonSound.play(); // Avvia la riproduzione dell'elemento audio 'buttonSound'.
}

async function generateRandomPokemon() {
    generateButton.disabled = true; // Disabilita il pulsante "Genera Pokémon".
    playButtonSound(); // Riproduce il suono del pulsante.

    const maxPokemonId = 1010; // Numero massimo di Pokémon disponibili.
    const randomId = Math.floor(Math.random() * maxPokemonId) + 1; // Genera un ID casuale per il Pokémon.
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}/`; // Costruisce l'URL dell'API con l'ID casuale.

    try {
        const response = await fetch(apiUrl); // Effettua una richiesta all'API.

        if (!response.ok) {
            throw new Error("Errore nella risposta dell'API"); // Lancia un errore se la risposta non è valida.
        }

        const data = await response.json(); // Converte la risposta in JSON.
        const spriteUrl = data.sprites.front_default; // Ottiene l'immagine del Pokémon.
        const name = data.name; // Ottiene il nome del Pokémon.
        const types = data.types.map(typeInfo => typeInfo.type.name).join(', '); // Ottiene i tipi del Pokémon.
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '); // Ottiene le abilità.
        const stats = data.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join(', '); // Ottiene le statistiche.

        pokemonSprite.src = spriteUrl; // Imposta l'immagine del Pokémon.
        pokemonSprite.style.display = 'block'; // Rende visibile l'immagine.
        pokemonName.textContent = `${name.charAt(0).toUpperCase() + name.slice(1)}`; // Imposta il nome con la prima lettera maiuscola.
        pokemonSprite.dataset.types = types; // Salva i tipi nei dati dell'immagine.
        pokemonSprite.dataset.abilities = abilities; // Salva le abilità nei dati.
        pokemonSprite.dataset.stats = stats; // Salva le statistiche nei dati.

        pokemonName.style.display = 'block'; // Rende visibile il nome.
        catchButton.style.display = 'inline-block'; // Rende visibile il pulsante "Cattura".

    } catch (error) {
        console.error("Si è verificato un errore:", error); // Stampa l'errore in console.
    } finally {
        setTimeout(() => {
            generateButton.disabled = false; // Riabilita il pulsante "Genera Pokémon" dopo 800 ms.
        }, 800);
    }
}

function catchPokemon() {
    if (!pokemonName.textContent || !pokemonSprite.src || pokemonSprite.src === window.location.href) {
        alert("Non c'è nessun Pokémon da catturare! Genera prima un Pokémon."); // Mostra un avviso se non c'è un Pokémon.
        return;
    }

    const pokeballAnimation = document.getElementById('pokeballAnimation'); // Seleziona l'elemento per l'animazione della Pokéball.

    pokeballAnimation.style.display = 'block'; // Mostra l'animazione della Pokéball.
    pokeballAnimation.style.animation = 'throwPokeball 3s ease-in-out forwards'; // Avvia l'animazione.

    const pokemonNameValue = pokemonName.textContent.trim(); // Salva il nome del Pokémon.
    const pokemonSpriteUrl = pokemonSprite.src; // Salva l'immagine del Pokémon.
    const pokemonTypes = pokemonSprite.dataset.types; // Salva i tipi.
    const pokemonAbilities = pokemonSprite.dataset.abilities; // Salva le abilità.
    const pokemonStats = pokemonSprite.dataset.stats; // Salva le statistiche.

    setTimeout(() => {
        pokemonSprite.style.display = 'none'; // Nasconde l'immagine del Pokémon.
        pokemonName.style.display = 'none'; // Nasconde il nome.

        const pokemon = { // Crea un oggetto con i dati del Pokémon.
            name: pokemonNameValue.toLowerCase(),
            sprite: pokemonSpriteUrl,
            types: pokemonTypes,
            abilities: pokemonAbilities,
            stats: pokemonStats
        };

        const myPokemon = loadMyPokemon(); // Carica i Pokémon catturati dal localStorage.
        myPokemon.push(pokemon); // Aggiunge il nuovo Pokémon.
        saveMyPokemon(myPokemon); // Salva i Pokémon aggiornati nel localStorage.

        setTimeout(() => {
            pokeballAnimation.style.display = 'none'; // Nasconde l'animazione della Pokéball.
            catchButton.style.display = 'none'; // Nasconde il pulsante "Cattura".
            generateButton.disabled = false; // Riabilita il pulsante "Genera Pokémon".
        }, 3000); // Dopo 3 secondi.
    }, 2000); // Dopo 2 secondi.
}

function loadMyPokemon() {
    const savedPokemon = localStorage.getItem('myPokemon'); // Recupera i Pokémon salvati dal localStorage.
    return savedPokemon ? JSON.parse(savedPokemon) : []; // Restituisce l'array dei Pokémon o un array vuoto.
}

function saveMyPokemon(pokemon) {
    localStorage.setItem('myPokemon', JSON.stringify(pokemon)); // Salva i Pokémon nel localStorage.
}

generateButton.addEventListener('click', function() {
    playButtonSound(); // Riproduce il suono.
    generateRandomPokemon(); // Genera un Pokémon casuale.
});

catchButton.addEventListener('click', function() {
    playButtonSound(); // Riproduce il suono.
    catchPokemon(); // Cattura il Pokémon.
});

viewPokedexButton.addEventListener('click', function(event) {
    playButtonSound(); // Riproduce il suono.
    event.preventDefault(); // Previene il comportamento predefinito.
    setTimeout(function() {
        window.location.href = "pokedex.html"; // Reindirizza al Pokédex.
    }, 1000); // Dopo 1 secondo.
});

document.addEventListener('DOMContentLoaded', () => {
    generateRandomPokemon(); // Genera automaticamente un Pokémon all'avvio della pagina.
});
