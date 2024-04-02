<!-- # cloud-native-project
The nature of this application will be to provide users with a quick and easy way to read reviews, and synopses of movies. This is similar to the application Letterbox, but a more simplified version.

The estimated modules will be a synopsis of the movie, the ratings based on different websites reviews, the runtime of the movie, and the page that shows the movie in question. 

As of right now I am unsure what the languages and frameworks will look like. 

The primary actions will be the picking of a movie, and the returning of the movie name, synopsis, runtime and numerical ratings it received
-->

# Cloud Native Movie Review App


# Project team members
    - Ben Bejoian 
    - Eleanor Burke 
    - Sean Okpoebo
# Full description of the project, design, and architecture.
This project aims to provide users with a convenient platform to access movie reviews and statistics. Think of it as a simplified version of Letterbox. With AI-generated reviews and data pulled from an external API, users can quickly find the information they need about their favorite movies. Data will be combined into a blog post like UI 

* **Review Microservice (Container 1)**: Requests information from an AI to create a movie review from online ratings and summaries of the requested movie. The movie review will be added to a DB. 

* **Search Microservice (Container 2)**: Search bar for users to search for movie reviews. A search will return the list of reviews (or the one page review) of that moive from the DB 

* **Database (Container 3)**: The Database will contain the movie review generated by the AI and information gathered about the movie from an API (e.g., release date, bugdet, awards, etc).

* **API**: Hosts the API responsible for fetching movie information. We're using OMDB API to get movie statistics. 

* **AI**: Integrates OpenAI for generating AI-driven movie reviews.

# A list of features covering the Minimum Viable Product (MVP) goals
* User-friendly search interface
* AI-generated movie reviews
* Access to movie statistics via an external API
* Blog post-like UI for combining data
# Full build, run, deployment instructions
# Full application usage instructions.
Once the application is deployed, users can:

1. Access the search interface.
2. Enter the name of the movie they want to review.
3. View the generated movie review along with relevant statistics.
# Diagram showing the component and service relationships.
![Diagram of component and service relationships](/img/MovieReviewDesign.png)
# screenshots or animated gifs of working features
# A listing of all dependencies including components, languages, frameworks, and libraries
* **Node.js**
* **Docker**
* **OpenAI**
* **OMDB API**: https://www.omdbapi.com/ --> key: &apikey=17e7d0ae
 <!-- key/link for API? https://www.omdbapi.com/?t=titanic&apikey=17e7d0ae -->

# Citations from where you copied and gathered ideas or artifacts from. This includes articles, books, repositories, and generative AI tools.
    - https://technologyadvice.com/blog/information-technology/how-to-use-an-api/ 
