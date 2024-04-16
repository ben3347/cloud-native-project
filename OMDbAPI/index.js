// fetch("https://www.omdbapi.com/?t=titanic&apikey=17e7d0ae")
//     .then(response => {

//         if(!response.ok){
//             throw new Error();
//         }
//         return response.json;
//     })
//     .then(data => console.log(data))
//     .catch(error => console.log(error));


async function fetchData(){

    try{
        const movieName = document.getElementById("movieName").value.toLowerCase();
        const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=17e7d0ae`);

        
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);
    }
    catch(error){
        console.error(error);
    }

}