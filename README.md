# Stretching Routine

![QA](https://github.com/meszarosrob/stretching-routine/workflows/QA/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/67e36f90-6640-4ac2-b2ed-e661d72329ae/deploy-status)](https://app.netlify.com/sites/stretching-routine/deploys)

This is the web version of the stretching routine from the [Physiology and Fitness](https://www.thegreatcoursesplus.com/physiology-and-fitness) course (episode 36) with duration settings and sound effects.

## Development

`npm install` to install the dependencies.

To get the local version up and running, run `npm run-script serve`.
After this, copy to assets to the build directory with: `cp -R assets/ dist/`.

Before committing, lint the JavaScript files with ESLint: `npm run-script lint:fix`.

## Hosting

Online at: [stretching-routine.netlify.app](https://stretching-routine.netlify.app).

The deployment process is linked to the `main` branch. Runs on every commit.

### Deployment settings

- Build command: `npm run-script build && cp -R assets/ dist/`
- Publish directory: `dist`
