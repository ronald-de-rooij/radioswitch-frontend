# Radio-Switch Frontend

Contains the RadioSwitch Frontend

# How to run the project locally for development

### Non-docker development setup

Make sure node is installed. The project is being developed on Node 18 LTS. You can download it here https://nodejs.org/en/.

### Docker development setup

#### Docker installation

Follow the installation instructions from https://docs.docker.com/engine/install/. For macOS and Windows running WSL is recommended.

#### Windows

On windows using the Windows Subsystem for Linux (WSL) makes doing docker things quite a bit easier. It is not needed but for more complex systems simplifies things a lot (e.g. make files can be used).

To install it please follow the instructions from https://docs.microsoft.com/en-us/windows/wsl/install-win10#manual-installation-steps
make sure you pick the WSL2 setup.

From here on all the commands issued should be inputted into the WSL2 container (or whatever you choose to use).

## How to run after initial setup

### Non-docker development setup

Go into the root folder and run the following commands:

- `pnpm install`
- `pnpm dev`

The `pnpm install` command will install all the needed packages for the project to run. This only needs to be done the
first time the project is used _or_ when an updated is released which uses new packages.

### Docker development setup

It is possible to use docker during development. For Git Bash (for Windows), omit `sudo`.

Then, execute the following commands:

- `sudo docker network create nginx-proxy`
- `sudo docker-compose -f docker/docker-compose-local.yml up`

Adding the `-d` flag will run it in detached mode which is not recommended for debugging purposes.

## Deploying the project

### Docker setup

If docker is not installed please refer to the previous section for instructions on how to install docker.

### Docker setup preparation

Create the docker network and start up the reverse proxy.

First, navigate to the correct directory. For Git Bash (for Windows), omit `sudo`.

These steps should only be executed once to create the docker network.

Then, execute the following commands:

- `sudo docker network create nginx-proxy`
- `sudo docker-compose -f proxy/docker-compose.yml up -d`

### Deploy locally

Assumptions:

- your current directory contains the repository
- you have a working (root) `.env` file, with a minimum of:
  - Database configuration
  - `FRONTEND_HOSTNAME` set to the wanted local URL
- URL points to local machine in browser. Otherwise add URL to your hosts file (for windows
  `C:/Windows/System32/drivers/etc/hosts` (e.g `127.0.0.1      radio-switch.test`)).

* `cd docker`
* `sudo docker-compose --env-file ../.env up -d`

## Manually deploy on staging/production

- SSH onto desired server
- `cd sites/frontend`
- `git pull`
- `cd docker`
- `sudo docker-compose --env-file ../src/.env up -d`

## Docker configuration

For the frontend application we use one docker-compose file. It generates the Nuxt static files and sets up a NGINX instance that serves the static files.

### Nginx Reverse Proxy

The docker configuration for the proxy can be found in the `/proxy` folder.
For this container no specific build steps are required. It contains two images.

#### jwilder/nginx-proxy

This image handles the traffic rerouting. All traffic that arrived on port 80,443, passes through this image.
It also allows for SSL configuration as can be seen in the volumes that it uses.
The SSL setup and certificate installation/renewal is handled by [jrcs/letsencrypt-nginx-proxy-companion](#jrcs/letsencrypt-nginx-proxy-companion)

To map a domain name to a specific docker you only have to include the following environment fields in the docker-compose of the application that has to handle the traffic.

```environment:
VIRTUAL_HOST: 'radio-switch.nl'
# Only needed if SSL should be configured
LETSENCRYPT_HOST: 'radio-switch.nl'
```

This piece of code is included in the backend docker-compose file from the RadioSwitch backend project.
The rest is automatically handled by this docker image.

Details and more options can be found at the [Github page](https://github.com/nginx-proxy/nginx-proxy)

#### jrcs/letsencrypt-nginx-proxy-companion

This image is responsible for dynamically obtaining the SSL certificate from LetsEncrypt.
Furthermore it handles the SSL certificate renewal.

It requires two variables:

```
LETSENCRYPT_HOST: 'radio-switch.nl'
DEFAULT_EMAIL=info@radio-switch.nl
```

Default email is the address that will be notified on important news regarding this certificate.
This could be an expiring certificate or some security issues.

Details and more options can be found at the [Github page](https://github.com/nginx-proxy/docker-letsencrypt-nginx-proxy-companion)
