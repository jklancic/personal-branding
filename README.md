# Personal branding

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.24.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (bundled with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:jklancic/personal-branding.git
cd personal-branding
npm install
```

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Docker

Build and run the production image locally:

```bash
docker build -t personal-branding .
docker run --rm -p 8080:80 personal-branding
```

Then open `http://localhost:8080/`.

## Deployment

On every push to `main`, [.github/workflows/docker-publish.yml](.github/workflows/docker-publish.yml) builds the
production image and publishes it to `ghcr.io/jklancic/personal-branding:latest`.

On the VPS, [docker-compose.yml](docker-compose.yml) runs the app alongside
[Watchtower](https://containrrr.dev/watchtower/), which polls GHCR every minute and redeploys the container
automatically when a new image lands — no SSH access from GitHub to the VPS is required.

One-time VPS setup:

```bash
git clone https://github.com/jklancic/personal-branding.git
cd personal-branding
docker compose up -d
```

Notes:

- The GHCR package defaults to **private** on first publish. Make it public in GitHub → your profile →
  Packages → `personal-branding` → Package settings, so Watchtower can pull it without credentials.
- `docker-compose.yml` binds the app to `127.0.0.1:8080`; point your existing reverse proxy (nginx/Caddy/Traefik)
  at that port for TLS termination — adjust the port mapping if your setup differs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
