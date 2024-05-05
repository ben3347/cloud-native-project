const e = require('cors');

const fs = require('fs').promises;
const movies = ["avatar", "avengers: endgame", "avatar: the way of water", "titanic", "star wars: episode VII - the force awakens"]; //this could be a config var

async function manualPost() {

    for (i = 0; i < movies.length; i++) {
        let existingData = [];
        movieName = movies[i];
        console.log(i);
        try {
            const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=17e7d0ae`);
            const data = await response.json();
            console.log(data);

            try {
            
                const fileContent = await fs.readFile('movieDB.json', 'utf-8');
                if (fileContent.trim() !== '') {
                    existingData = JSON.parse(fileContent);
                }
            }
            catch (error) {
                console.error('Error reading and parsing data file:', error);
            }
    
            try {
                let newData = existingData.concat(data);
                await fs.writeFile('movieDB.json', JSON.stringify(newData, null, 2));
                console.log('Data added to movieDB.json');
            }
            catch (error) {
                console.error('Error adding new data to movieDB.json:', error);
            }
            
        }
        catch (error) {
            console.error(`Error fetching ${movieName} data:`, error);
        }

    }

}

//manualPost();
module.exports = {
    manualPost
};