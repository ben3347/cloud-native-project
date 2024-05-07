FROM openjdk:17
WORKDIR /app
COPY ./target/reviews-0.0.1-SNAPSHOT.jar spring.jar
EXPOSE 8086
CMD ["java", "-jar", "spring.jar"]