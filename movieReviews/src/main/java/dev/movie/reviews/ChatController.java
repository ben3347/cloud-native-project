package dev.movie.reviews;

import org.springframework.ai.chat.ChatClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ChatController {

    private final ChatClient chatClient;
    private final String[] movieTitles = {
            "Avatar",
            "Avengers: Endgame",
            "Avatar: The Way of Water",
            "Titanic",
            "Star Wars: Episode VII - The Force Awakens"
    };

    public ChatController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @GetMapping("/reviews")
    public List<String> getReviews() {
        List<String> reviews = new ArrayList<>();
        for (String movieTitle : movieTitles) {
            String review = chatClient.call("Give me a synopsis of " + movieTitle);
            reviews.add("Review for " + movieTitle + ": " + review);
        }
        return reviews;
    }
}