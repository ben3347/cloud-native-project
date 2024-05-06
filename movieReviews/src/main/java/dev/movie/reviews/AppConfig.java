package dev.movie.reviews;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        // Customize the RestTemplate instance if needed
        return new RestTemplate();
    }
}