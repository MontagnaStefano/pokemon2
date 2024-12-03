document.addEventListener('DOMContentLoaded', () => {
    const pokemonSprite = document.getElementById('pokemonSprite');
    const pokemonName = document.getElementById('pokemonName');
    const typeList = document.getElementById('typeList');
    const abilityList = document.getElementById('abilityList');
    const statList = document.getElementById('statList');
    const backButton = document.getElementById('backButton');

    const playSoundAndDelay = (callback) => {
        const buttonAudio = new Audio('buttonA.mp3');
        buttonAudio.play();

        setTimeout(() => {
            callback();
        }, 800); 
    };

    // Carica il Pokémon selezionato da localStorage
    const selectedPokemon = JSON.parse(localStorage.getItem('selectedPokemon'));

    if (!selectedPokemon) {
        alert('Nessun Pokémon selezionato.');
        window.location.href = 'pokedex.html';
        return;
    }

    // Popola i dettagli del Pokémon
    pokemonSprite.src = selectedPokemon.sprite;
    pokemonName.textContent = selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1);

    // Mostra le immagini dei tipi
    selectedPokemon.types.split(', ').forEach(type => {
        const img = document.createElement('img');
        img.src = `Tipi/${type}.png`; // Path all'immagine corrispondente
        img.alt = type;
        img.style.width = '70px';  // Aumenta la larghezza
        img.style.height = '70px'; // Aumenta l'altezza
        img.style.marginRight = '10px'; // Spaziatura tra le immagini
        typeList.appendChild(img);
    });

    // Mostra le abilità
    selectedPokemon.abilities.split(', ').forEach(ability => {
        const li = document.createElement('li');
        li.textContent = ability;
        abilityList.appendChild(li);
    });

    // Mostra le statistiche
    selectedPokemon.stats.split(', ').forEach(stat => {
        const [statName, statValue] = stat.split(': ');

        // Crea l'elemento contenitore
        const statContainer = document.createElement('div');
        statContainer.classList.add('stat-container');

        // Nome della statistica
        const statLabel = document.createElement('span');
        statLabel.classList.add('stat-label');
        statLabel.textContent = statName;

        // Barra di progresso
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        const progressFill = document.createElement('div');
        progressFill.classList.add('progress-fill');
        progressFill.style.width = `${statValue / 2}%`; // Adatta il valore massimo
        progressFill.textContent = statValue;

        // Assembla tutto
        progressBar.appendChild(progressFill);
        statContainer.appendChild(statLabel);
        statContainer.appendChild(progressBar);
        statList.appendChild(statContainer);
    });

    // Pulsante per tornare al Pokédex
    backButton.addEventListener('click', () => {
        playSoundAndDelay(() => {
            window.location.href = 'pokedex.html';
        });
    });
});
