# GHOST API

The ghost site was built up using WK 5 instructions, on localhost:8080.
The hosting Ghost Blog MS runs by running the follwing in the same directory of the docker-compose.yaml file:

```
docker compuse build
docker compose up -d
```
After logging into the site at localhost:8080/ghost, you are at the admin portal for a website.

"server.js" connects to the Ghost API using keys/custom integration (my key for my site is already in there, but it can change accordingly).

After running 'node server.js', open another terminal and run a curl command like such:

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
        "title": "Your Post Title",
        "html": "<p>Your post content goes here</p>",
        "excerpt": "Your post excerpt",
        "tags": ["tag1", "tag2"]
      }' \
  http://localhost:4000/post
  ```

Now, a generated post cand be successfully posted, through Docker.
