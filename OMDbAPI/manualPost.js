const e = require('cors');

const fs = require('fs').promises;
const movies = ["avatar", "avengers: endgame", "avatar: the way of water", "titanic", "star wars: episode VII - the force awakens"]; //this could be a config var

async function manualPost(){

    for (i = 0; i < movies.length; i++){
        movieName = movies[i];
        try{
            const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=17e7d0ae`);
            const data = await response.json();
            console.log(data);

            //add data to movieDB.json
            try {
                let existingData = [];

                try {
                    //let existingData = [];
                    const fileContent = await fs.readFile('movieDB.json', 'utf-8');
                    if (fileContent.trim() !== '') {
                        existingData = JSON.parse(fileContent);
                    }
                    
                } catch (error) {
                    // If the file doesn't exist or cannot be read, ignore the error
                    console.error('Error reading data file:', error);
                }
        
                let newData = existingData.concat(data);

                await fs.writeFile('movieDB.json', JSON.stringify(newData, null, 2));
                console.log('Data added to movieDB.json');
            } catch(error) {
                console.error('Error writing to movieDB.json:', error);
            }

        } catch(error) {
            console.error('Error fetching data:', error);
        }

    }

}

//manualPost();
module.exports = {
    manualPost
  };