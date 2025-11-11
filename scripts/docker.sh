#!/bin/bash

docker build -t registry-template-docker .

# Optional: Tag the image and push it to the Docker Hub
# docker tag registry-template-docker marvinseason1999/registry-template-docker

# Optional: Push the image to the Docker Hub
# docker push marvinseason1999/registry-template-docker