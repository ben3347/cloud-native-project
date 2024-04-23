const fs = require('fs').promises;

const movieList = ["Star Wars: Episode VII - The Force Awakens", "Avengers: Infinity War", "Spider-Man: No Way Home", "Jurassic World", "The Lion King", "The Avengers", "Furious 7", "Top Gun: Maverick", "Frozen II", "Barbie", "Avengers: Age of Ultron", "Frozen", "The Super Mario Bros. Movie", "Harry Potter and the Deathly Hallows: Part 2", "Black Panther", "Star Wars: Episode VIII - The Last Jedi", "Jurassic World: Fallen Kingdom", "Beauty and the Beast", "Incredibles 2", "The Fate of the Furious", "Iron Man 3", "Minions", "The Lord of the Rings: The Return of the King", "Captain America: Civil War", "Aquaman", "Skyfall", "Spider-Man: Far from Home", "Captain Marvel", "Transformers: Dark of the Moon", "Jurassic Park", "Transformers: Age of Extinction", "The Dark Knight Rises", "Joker", "Star Wars: Episode IX - The Rise of Skywalker", "Toy Story 4", "Toy Story 3", "Pirates of the Caribbean: Dead Man's Chest", "Rogue One: A Star Wars Story", "Aladdin", "Pirates of the Caribbean: On Stranger Tides", "Despicable Me 3", "Finding Dory", "Star Wars: Episode I - The Phantom Menace", "Zootopia", "Alice in Wonderland", "Harry Potter and the Sorcerer's Stone"];

var usedMovies = [];
let movieName = "";

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

async function fetchData(){
    try{
 
        while(true){
            index = getRandomIntInclusive(0, 45)
            if (!usedMovies.includes(movieList[index])) {
                movieName = movieList[index];
                usedMovies.push(movieName);
                break;
            }
        }

        const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=17e7d0ae`);
        const data = await response.json();
        console.log(data);

        try {
            let existingData = [];

            try {
                const fileContent = await fs.readFile('movieDB.json', 'utf-8');
                if (fileContent.trim() !== '') {
                    existingData = JSON.parse(fileContent);
                }
            } catch (error) {
                // If the file doesn't exist or cannot be read, ignore the error
                console.error('Error reading data file:', error);
            }

            const newData = existingData.concat(data);

            await fs.writeFile('movieDB.json', JSON.stringify(newData, null, 2));
            console.log('Data added to movieDB.json');
        } catch(error) {
            console.error('Error writing to movieDB.json:', error);
        }

        usedMovies.push(movieName);

    }
    catch(error){
        console.error('Error fetching data:', error);
    }

}

fetchData();