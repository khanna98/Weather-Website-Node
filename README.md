# Weather-Website-Node
This is a Live Weather Project hosted on heroku. 

This is made using the following technologies:
1. Node.js
2. Express.js
3. Handlebars
4. Postman

This was deployed using Jenkins - which is running in a Docker Container deployed in a Kubernetes Cluster. I know this can sound confusing but the truth is it is.

Here are a few technologies that were used in order to implement Continuos Integrationa and Continuous Deployment:
1. Jekins
2. Docker
3. Kubernetes
4. Google Cloud Platform

Here is link to the other repository consisiting of the Docker Image that has Jenkins running and is deployed on a GKE Cluster in GCP _(Google Cloud Platform)_ - [Jenkins-Docker](https://github.com/khanna98/jenkins-docker)

The details for that project are available in the Presentation.md file in that repository.

As of this project, it is equipped with the Github webhooks and Jenkins. So whenever a code is pushed or pulled from this repository, not only does it deploy and update the Github but also the Heroku app where it is hosted.

1. Adding Webhook in Github Settings
2. Configuring Jenkins Pipeline and updating it to run when github webhook post request is recieved.

