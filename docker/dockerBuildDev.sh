# build docker image
docker build -t $DOCKER_IMAGE_TAG -f docker/Dockerfile --target dev .

# push docker image to docker hub
docker push $DOCKER_IMAGE_TAG