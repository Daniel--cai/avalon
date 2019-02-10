# The Resistance Avalon

## Stack

_Backend_

- Golang 1.11 with go modules
- Gin

_Frontend_

- Typescript
- React

_Infrastructure_

- Event sourcing
- AWS Dynamodb

## Setup

### Kubernetes

`choco install minikube`

### Docker Toolbox

#### Virtual Box

Add to Shared Folders

`avalon: <Directory_To_Root>`

To check

```
docker-machine restart
docker-machine ssh
cd /avalon
ls -all
```

### Skaffold

`choco install skaffold`
To start up and deploy kubernetes cluster configuration

```
minikube start

@FOR /f "tokens=* delims=^L" %i IN ('minikube docker-env')DO %i

skaffold dev
```

To open Kubernetes dashboard: `minikube dashboard`

### Docker Compose

```
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up
docker-compose -f docker-compose.yml down
```
