Learning how to build kubernetes user-defined health checks by example.

## Background Info

##### Navigating the Code:

* `example-services` - example services are located here for demonstration purposes. Your own product's services 
are likely in their own dedicated repositories. I've included an example `nodejs-server` here for demo purposes.
* `k8s` - this is where all kubernetes-related files are kept, such as `Deployment` and `Service` files.

##### Environment Setup:

This setup uses `minikube` to run a local kubernetes cluster. You can install minikube for your distro here: https://kubernetes.io/docs/tasks/tools/install-minikube

## Getting Started

To start, we'll focus on running just one service inside our k8s cluster: a barebones NodeJS express server.

Since k8s uses Docker images for building/deploying containers, we'll need to build a Docker image for
our NodeJS service.

To do this, follow these steps:

1. Run `eval $(minikube docker-env)` - this allows us to use our local Docker image instead of images stored in the cloud,
i.e. in Google Container Registry (GCR).

2. From `example-services/nodejs-server`, run `docker build -t node-express-server .` This will build the Docker image
for our NodeJS server.

3. You can verify your `node-express-server` image was built by running `docker images`. You'll also notice k8s related
images (more on those later).

Great! Note that we haven't actually deployed anything yet. You can verify this by running `kubectl get pods`
and/or `kubectl get svc` among other commands.
 
Let's start building the k8s cluster. From the base directory, run `kubectl apply -f k8s`. This will deploy all related
files in the `k8s` directory.

In this case, we deployed one Pod and a Service. You can verify these are in our k8s cluster by running `kubectl get pods`
and `kubectl get svc`.

Now let's test out our simple NodeJS server. Run `minikube service my-app`. This will open up your browser to the service's
URL. The service includes a `/heatlh` endpoint that should return "I'm alive!"

**(TODO) Next steps:**

* Setup liveness + readiness probes
* Add a few example dependencies to the NodeJS example server, i.e. Postgres + Redis


## Cleanup:

Once you're done, clean up your k8s cluster by running `kubectl delete -f k8s`. This will remove any deployed Pods, Services, etc.
as defined in the `k8s` directory.

You can then run `minikube delete` to destory your local k8s cluster.
