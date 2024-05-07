# Cloud Native Movie Review App

## Team Members
- Ben Bejoian 
- Eleanor Burke 
- Sean Okpoebo

## Project Description
This project is designed to provide users with a user-friendly and efficient platform to access comprehensive movie reviews and information. Imagine it as a more straightforward version of Letterboxd, combining all the individual reviews into one review that acts as an "average" of online reviews. This will save users time by decreasing the number of review they need to read before making a decision. With AI-generated reviews and data pulled from an external API, users can quickly find the information they need about their favorite movies. The information will be organized and displayed in a Ghost UI blog post.

* **Sean: UI Microservice (Container 1)**: Combines information from the Movie Information MS and the Review MS to create a single blog post. The blog post will be added to the Ghost UI. A prompt that will allow users to enter a movie title in the search bar proceed the blog posting. If the movie is available, the UI will direct to the blog post made by calling APIs in containers 2 and 3.

* **Eleanor: Movie Information Microservice (Container 2)**: This container retrieves information from OMDB API and adds it to movieDB.json which has a RESTful API associated with it so the Ghost container can access the information. For the purpose of the presentation's demonstration, there is a manual post function, which fetches information about the top 5 lifetime grossing movies and adds it to the JSON file. Further development of this MS will lead to the implementation of a chronJob, which calls the randomPost function. This function randomly adds a new movie from the top 50 lifetime grossing movies to the database, allowing users to search for movie reviews via the Ghost UI.

* **Ben: Review Microservice (Container 3)**: Requests information from Open AI to create a movie review from online ratings and summaries of the requested movie.  

<!--The Database will contain the movie review generated by the AI and information gathered about the movie from an API (e.g., release date, bugdet, awards, etc). As of right now, we will be using MySQL. 

* **AI**: Integrates OpenAI for generating AI-driven movie reviews. -->

## Minimum Viable Product Goals
* User-friendly search interface from Ghost
* AI-generated movie reviews
* Access to movie statistics via an external API
* Blog post-like UI for combining data
* Manual and Random posting 
## Full Build, Run, Deployment Instructions
### Movie Information API
* Development Run Instructions: 
    * cd OMDbAPI/ 
    * nmp run dev 
* Docker Build
    * docker build -t sokp/omdbapi:v1 . 
    * docker push sokp/omdbapi:v1
* Run on Kubernetes 
    * kubectl apply -f kubernetes 

## Usage Instructions.
Once the application is deployed, users can:

1. Access a drop down of available movies.
2. Click the name of the movie they want a review of.
3. View the generated movie review along with relevant information.
## Diagram Showing the Component and Service Relationships.
![Diagram of component and service relationships](/img/designFinal.png)
### Movie Information API 
* **randomPost.js** calls the OMDb external API to retrieve movie information (e.g., Genre, Runtime, Writers, etc.) about a randomly picked title from the top 50 all time grossing movies. The data fetched from the API is then added to movieDB.json.
* **manualPost.js** defines a function manualPost(), which is responsible for fetching movie data from the OMDB API for a predefined list of movies and adds this data to a local JSON file (movieDB.json). Error handling is implemented to manage various scenarios, such as failed API requests, file read/write errors, and JSON parsing issues. <br>
The five movies are the following...
    1. Avatar
    2. Avengers: Endgame
    3. Avatar: the Way of Water
    4. Titanic
    5. Star Wars: Episode VII - The Force Awakens
* **movieDB.json** is a local database that holds the information fetched from the OMDb API. 
* **server.js** is a RESTful API for managing the movie information stored in movieDB.json. The API provides endpoints to retrieve all movies, get the last movie, get and delete the first movie, get a specific movie by name, and add predefined or random movies (calling functions manualPost() and randomPost(), respectively), and clear the entire database. The application uses Express.js for routing and middleware, including CORS for enabling cross-origin requests. This API runs on port 3000.
    * **GET /movie/:title** is called by Ghost MS when the users selects a movie they want information about.The ':title' parameter in the route URL allows the app to specify the title of the movie they want to retrieve. This route is designed to be part of a larger movie database management system, allowing clients to retrieve specific movie details based on their titles. 
## Screenshots or Animated GIFs of Working Features
### server.js running on localhost:3000
![](/img/server.jsDemo.gif)
This gif shows the function of the '/manaulPost', '/randomPost', '/clearDB', and default routes.
![](/img/serverDemo2.gif)
This gif shows the function of the '/lastElement' and 'getAndDeleteFirstElement' routes and an invalid route catcher. 
![](/img/titleDemo.gif)
This gif shows the function of the '/movie/:title' route fetching, in order, information about "Avatar" and "Titanic" 

## Dependencies (e.g., components, languages, frameworks, and libraries)
### Movie Information API
* **Node.js:** is a JavaScript runtime environment that allows us to run server-side JavaScript applications.
    * **express:** is a Node.js web application framework that we use to build our backend API server. It simplifies the process of handling HTTP requests, defining routes, and structuring our application's logic.
    * **CORS:** is middleware in our Express.js application to enable Cross-Origin Resource Sharing (CORS). The main use of CORS in this microservice is to allow for live updating while the server was locally running, helping with debugging and development.
    * **node-fetch:** is a module that provides an interface for making HTTP requests within Node.js applications. We use node-fetch to communicate with external APIs (e.g., OMDB API).
* **Docker:** enables consistent deployment across different environments and simplifies the management of our application's infrastructure.
* **OMDB API:** is a external database of movie-related information. We utilize this API to retrieve details such as movie titles, genres, runtimes, and other metadata.
    * **OMDB API Documentation:** https://www.omdbapi.com/ 
    <!-- key: &apikey=17e7d0ae --> 

### Review Microservice
* **OpenAI**

### UI
* **Ghost**

## Future Work
* **Expand Movie Information Sources:** Include additional APIs or data sources to enhace movie data with more information like cast and crew, filming locations, or trivia.
* **Advanced Search and Filtering:** Increase search functionality with filtering options (e.g., by genre, release year, director) to help users discover movies, instead of relying on users already knowing the movie.
* **Multilingual Support:** Support multiple languages and region-specific content to cater to an international audience.

## Citations from where you copied and gathered ideas or artifacts from. This includes articles, books, repositories, and generative AI tools.
* YouTube Videos
    * How to FETCH data from an API using JavaScript: https://www.youtube.com/watch?v=37vxWr0WgQk
    * Learn Express JS In 35 Minutes: https://www.youtube.com/watch?v=SccSCuHhOw0
    * How to Build a REST API with Javascript | Node and Express JS Basics Tutorial: https://www.youtube.com/watch?v=bC5KVrX-AlA
* Articles 
    * Docker Commands and Debugging: https://docs.docker.com/reference/dockerfile/
    * Kubernetes Commands: https://kubernetes.io/docs/home/
* Generative AI tools
    * ChatGPT: Code debugging, commenting, and explaining error messages
* Books 
    * "Kubernetes: Up and Running by Brendan Burns", by Joe Beda, and Kelsey Hightower

