package dev.movie.reviews;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.ai.chat.ChatClient;

import java.util.HashMap;
import java.util.Map;

@Service
public class MovieReviewService {

    private final ChatClient chatClient;
    private final RestTemplate restTemplate;

    @Value("${movie.review.base-url}")
    private String baseUrl;

    @Autowired
    public MovieReviewService(ChatClient chatClient, RestTemplate restTemplate) {
        this.chatClient = chatClient;
        this.restTemplate = restTemplate;
    }

    public String getMovieTitle(String title) {
        String url = "http://localhost:8080/api/movie/titles/" + title;  // Adjust the URL as needed
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();  // Returns the movie title
        } else {
            return "Movie title not found.";  // Error handling
        }
    }

    // Fetch AI-generated critic reviews
    public String getAICriticsReviewsForMovie(String movieTitle) {
        return chatClient.call("Give me critic reviews of the movie " + movieTitle);
    }


    // Method to send the AI-generated review back to the microservice
    public void sendReviewBackToMicroservice(String movieId, String review) {
        String url = "http://localhost:8080/api/movie/reviews";  // Adjust the URL as needed
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("movieId", movieId);
        requestBody.put("review", review);

        restTemplate.postForEntity(url, requestBody, Void.class);
    }

}
