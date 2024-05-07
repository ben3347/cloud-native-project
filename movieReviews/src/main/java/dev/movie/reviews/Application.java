package dev.movie.reviews;

import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Application {

	@RequestMapping("/")
	public String home() {
		return "Dockerizing Spring Boot Application";
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}