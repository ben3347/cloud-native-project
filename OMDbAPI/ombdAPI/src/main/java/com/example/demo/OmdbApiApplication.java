package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class OmdbApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(OmdbApiApplication.class, args);

		String url = "https://www.omdbapi.com/?t=titanic&apikey=17e7d0ae";

	}

}
