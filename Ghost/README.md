# GHOST API Microservice

The cluster Ghost service was supplied on the URL *http://34.49.160.195/*. 

First, the docker image was built and then pushed to a repository/DockerHub.

```
docker build -t <repo>/ghost-poster:version .
docker push <repo>/ghost-poster:version
```

After pushing the image, environment attributes were defined in **configmap.yaml**. The URL is at *ghost.blog* for simplicity in accessing Ghost, and the port is *2368*. That configmap should then be applied using the following line:

```
kubectl apply -f configmap.yaml
```

Then create the deployment and service. The files create both in the namespace of ***omd-ghost***, as ***omd-ghost-poster***. The image used in **deployment.yaml** should be the same as the pushed Docker image.

```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```
The port 4000 is now exposed to accept POST calls. However, an ingress is required for the service to be communicated with. That is defined in **ingress.yaml**.

```
kubectl apply -f omd-ingress.yaml
```
The Ghost posting can be tested using a curl POST command

```
curl -X POST \
  http://35.227.228.210/post \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "My Blog Post Title 2",
    "html": "<p>This is the content of my blog post.</p>",
    "excerpt": "This is a short excerpt of my blog post."
}'
  ```

Now, a generated post can be successfully posted, through the POSTMAN/curl commands.
