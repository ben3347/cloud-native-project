# Movie Reviews Application

## Overview

The Movie Reviews Application is a Spring Boot service designed to generate movie reviews using AI and post them to a specified microservice. It utilizes OpenAI's API to create reviews and interacts with an external reviews microservice to post these reviews.

### Features

* AI-Generated Reviews: Uses OpenAI's GPT-3.5 Turbo model to generate critical reviews of movies.
* RESTful API: Provides an API endpoint to receive movie titles, generate reviews, and post them to a review microservice.
* Docker Integration: Includes Docker configuration for easy deployment and scaling.

### Prerequisites

Before you start, make sure you have the following installed:

Java 17
Maven
Docker (for containerization)
Configuration

The application requires the following environment variables to be set:

OPENAI_API_KEY: Your OpenAI API key for accessing AI services.
movie.review.post.url: URL of the review microservice where the reviews will be posted.
These can be set in your application.properties or passed as command line arguments.

### Running the Application

Locally
To run the application locally, follow these steps:

Clone the repository and navigate to the directory.
Build the project using Maven:

mvn clean install

Run the application:

java -jar target/reviews-0.0.1-SNAPSHOT.jar

Using Docker
To run the application using Docker, you can build a Docker image and run it as a container:

Build the Docker image:

docker build -t movie-reviews .

Run the container:

docker run -p 8086:8086 movie-reviews

Once running locally this is the command I use to call the MovieController and get the reviews of the movie locally.
You can just run this command in your terminal in the home directory.

http :8086/movie/{movie-title-of-your-choice}/reviews                   
