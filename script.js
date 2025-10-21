//get items using the the defined id in html file
const bgm = document.getElementById('backgroundmusic');
const button = document.getElementById('switch-button');
const gameThumbnails = document.getElementById('game-thumb');

let gamesData = []; // store fetched data

// will only fetch once when the page loads
async function fetchGames() {
    try {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const apiUrl = 'https://www.freetogame.com/api/games';
        const res = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        //output messages to rule out network issues
        if (!res.ok) throw new Error('Network response not ok');
        //store all fetched game data in local array
        gamesData = await res.json();
    } catch (err) {
        console.error('Failed to fetch game data:', err);
    }
}

fetchGames();

// Pick random game on button click
button.addEventListener('click', () => {
    if (gamesData.length === 0) {
        console.error('Game data not loaded yet!');
        return;
    }

    //uses button to activate bgm playing
    if (bgm.paused) {
        bgm.play().catch(err => console.log('Autoplay blocked:', err));
    }

    //randomly get a random thumbnailsfrom the store local array gamesData
    const random = gamesData[Math.floor(Math.random() * gamesData.length)];
    gameThumbnails.src = random.thumbnail;
    gameThumbnails.alt = random.title || 'Random Game Thumbnail';
});