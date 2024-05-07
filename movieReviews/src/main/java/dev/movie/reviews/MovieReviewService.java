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

    @Value("${movie.review.post.url}")
    private String reviewPostUrl;

    @Autowired
    public MovieReviewService(ChatClient chatClient, RestTemplate restTemplate) {
        this.chatClient = chatClient;
        this.restTemplate = restTemplate;
    }

    public String getAICriticsReviewsForMovie(String movieTitle) {
        return chatClient.call("Give me critic reviews of the movie " + movieTitle);
    }

    public ResponseEntity<String> postReviewToMicroservice(String review) {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("review", review);

        ResponseEntity<String> response = restTemplate.postForEntity(reviewPostUrl, requestBody, String.class);
        return response;
    }
}