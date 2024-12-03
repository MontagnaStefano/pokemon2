document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');

    if (!loadingScreen) {
        console.error("Elemento #loadingScreen non trovato!");
        return;
    }

    const gifDuration = 2500; // Durata della GIF (3 secondi)
    const redirectTime = gifDuration - 100; // Reindirizzamento anticipato di mezzo secondo

    // Imposta la GIF a schermo intero
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.error("Impossibile attivare la modalità a schermo intero:", err);
        });
    }

    // Reindirizza automaticamente alla pagina index.html dopo il tempo specificato
    setTimeout(() => {
        window.location.href = 'index1.html';
    }, redirectTime);
});
