document.addEventListener('DOMContentLoaded', () => {
    const pokedexList = document.getElementById('pokedex-list'); // Seleziona l'elemento HTML con id 'pokedex-list' dove saranno mostrati i Pokémon.

    // Funzione per caricare i Pokémon dal localStorage
    const loadMyPokemon = () => {
        const savedPokemon = localStorage.getItem('myPokemon'); // Recupera i dati dei Pokémon salvati nel localStorage.
        console.log("Caricamento Pokémon dal localStorage:", savedPokemon); // Logga i dati caricati in console per debug.
        return savedPokemon ? JSON.parse(savedPokemon) : []; // Restituisce un array di Pokémon o un array vuoto se non ci sono dati.
    };

    // Funzione per rimuovere un Pokémon dal Pokédex
    const removePokemon = (pokemonToRemove) => {
        let myPokemon = loadMyPokemon(); // Carica i Pokémon attualmente salvati.
        myPokemon = myPokemon.filter(pokemon => pokemon.name !== pokemonToRemove.name); // Filtra per rimuovere il Pokémon con il nome specificato.
        localStorage.setItem('myPokemon', JSON.stringify(myPokemon)); // Aggiorna il localStorage con i Pokémon rimanenti.
        displayPokedex(); // Ricarica la lista aggiornata del Pokédex.
    };

    const displayPokedex = () => {
        const myPokemon = loadMyPokemon(); // Carica i Pokémon salvati nel localStorage.
        console.log("Pokémon nel Pokédex:", myPokemon); // Logga i Pokémon caricati per debug.
    
        pokedexList.innerHTML = ''; // Pulisce il contenuto della lista nel DOM.
    
        if (myPokemon.length === 0) { // Controlla se non ci sono Pokémon salvati.
            pokedexList.innerHTML = '<p>Non hai ancora catturato nessun Pokémon!</p>'; // Mostra un messaggio se il Pokédex è vuoto.
            return;
        }
    
        myPokemon.forEach(pokemon => { // Itera su ogni Pokémon salvato.
            if (!pokemon || !pokemon.name || !pokemon.sprite) { // Controlla se il Pokémon ha dati incompleti.
                console.warn("Pokémon con dati incompleti trovato:", pokemon); // Logga un avviso per Pokémon con dati incompleti.
                return;
            }
    
            const card = document.createElement('div'); // Crea un contenitore per la card del Pokémon.
            card.classList.add('card'); // Aggiunge la classe CSS 'card' per lo stile.
    
            const img = document.createElement('img'); // Crea un elemento immagine per mostrare lo sprite del Pokémon.
            img.src = pokemon.sprite; // Imposta la sorgente dell'immagine allo sprite del Pokémon.
    
            const name = document.createElement('h3'); // Crea un elemento <h3> per il nome del Pokémon.
            name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Imposta il nome del Pokémon con la prima lettera maiuscola.
    
            // Pulsante per visualizzare le informazioni
            const infoButton = document.createElement('button'); // Crea un pulsante per mostrare informazioni dettagliate.
            infoButton.textContent = 'Information'; // Imposta il testo del pulsante.
            infoButton.addEventListener('click', () => {
                localStorage.setItem('selectedPokemon', JSON.stringify(pokemon)); // Salva il Pokémon selezionato nel localStorage.
                window.location.href = 'pokemon-info.html'; // Reindirizza alla pagina delle informazioni del Pokémon.
            });
    
            // Pulsante per liberare il Pokémon
            const freeButton = document.createElement('button'); // Crea un pulsante per liberare il Pokémon.
            freeButton.textContent = 'Free Pokemon'; // Imposta il testo del pulsante.
            freeButton.addEventListener('click', () => removePokemon(pokemon)); // Aggiunge un evento per rimuovere il Pokémon dal Pokédex.
    
            card.appendChild(img); // Aggiunge l'immagine alla card.
            card.appendChild(name); // Aggiunge il nome alla card.
            card.appendChild(infoButton); // Aggiunge il pulsante "Informazioni" alla card.
            card.appendChild(freeButton); // Aggiunge il pulsante "Libera" alla card.
            pokedexList.appendChild(card); // Aggiunge la card del Pokémon alla lista nel DOM.
        });
    };
    
    displayPokedex(); // Mostra la lista dei Pokémon nel Pokédex all'avvio della pagina.
});
