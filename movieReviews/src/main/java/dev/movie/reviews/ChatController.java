package dev.movie.reviews;

import org.springframework.ai.chat.ChatClient;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

//    public String getSynopsisForMovie(String movieTitle) {
//        // Call AI to get synopsis for the movie title
//        return chatClient.call("Give me a synopsis of the movie" + movieTitle);
//    }

    public String getReviewsForMovie(String movieTitle) {
        // Call AI to get critic reviews for the movie title
        return chatClient.call("Give me critic reviews of the movie" + movieTitle);
    }
}