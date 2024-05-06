package dev.movie.reviews;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/movie")
public class MovieController {

    private final MovieReviewService movieReviewService;

    @Autowired
    public MovieController(MovieReviewService movieReviewService) {
        this.movieReviewService = movieReviewService;
    }

    // Endpoint to receive a movie title via POST
    @PostMapping("/title")
    public ResponseEntity<?> receiveMovieTitle(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        if (title == null || title.isEmpty()) {
            return ResponseEntity.badRequest().body("Title is missing");
        }

        // Use the received title to get movie reviews
        String reviews = movieReviewService.getAICriticsReviewsForMovie(title);
        if (reviews == null || reviews.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No reviews found for the movie.");
        }

        return ResponseEntity.ok(reviews);
    }
}




















//public class MovieController {
//
//    private final MovieReviewService movieReviewService;
//
//    @Autowired
//    public MovieController(MovieReviewService movieReviewService) {
//        this.movieReviewService = movieReviewService;
//    }
//
//    @GetMapping("/{id}/reviews")
//    public ResponseEntity<?> getReviewsById(@PathVariable String id) {
//        String title = movieReviewService.getMovieTitleById(id);  // Fetch the movie title from external service
//        if (title.equals("Movie title not found.")) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(title);
//        }
//
//        String reviews = movieReviewService.getAICriticsReviewsForMovie(title);  // Fetch AI-generated reviews using the title
//        if (reviews.equals("Critic reviews not available for movie: " + title)) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(reviews);
//        }
//        return ResponseEntity.ok(reviews);
//    }
//}
//
//




















































//package dev.movie.reviews;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/movie")
//public class MovieController {
//
//    private final ChatController chatController;
//
//    @Autowired
//    public MovieController(ChatController chatController) {
//        this.chatController = chatController;
//    }
//
////    @GetMapping("/{title}")
////    public ResponseEntity<?> getMovieByTitle(@PathVariable String title) {
////        String lowercaseTitle = title.toLowerCase();
////
////        // Call ChatController to get synopsis
////        String synopsis = chatController.getSynopsisForMovie(lowercaseTitle);
////
////        if (synopsis == null) {
////            // If synopsis is not available, return 404 Not Found
////            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Synopsis not available for movie: " + title);
////        }
////
////        // Return synopsis to client
////        return ResponseEntity.ok(synopsis);
////    }
//
//    @GetMapping("/{title}/reviews")
//    public ResponseEntity<?> geReviewsByTitle(@PathVariable String title) {
//        String lowercaseTitle = title.toLowerCase();
//
//        // Call ChatController to get critic reviews
//        String criticReviews = chatController.getReviewsForMovie(lowercaseTitle);
//
//        if (criticReviews == null) {
//            // If critic reviews are not available, return 404 Not Found
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Critic reviews not available for movie: " + title);
//        }
//
//        // Return critic reviews to client
//        return ResponseEntity.ok(criticReviews);
//    }
//}


