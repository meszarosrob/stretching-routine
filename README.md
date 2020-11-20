# Stretching Routine

This is the web version of the stretching routine from the [Physiology and Fitness](https://www.thegreatcoursesplus.com/physiology-and-fitness) course (episode 36), with duration settings and sound effects.

## Hosting

Online at: [stretching-routine.netlify.app](https://stretching-routine.netlify.app/).

The deployment process runs after every commit in the `main` branch.

### Settings

- Build command: `npm run-script build && cp -R assets/ dist/assets/`
- Publish directory: `dist`

## Development

`npm install` to install the dependencies.

To get the local version up and running, run `npm run-script serve`.
After this, copy to assets to the build directory with: `cp -R assets/ dist/assets`.

To lint the JavaScript files with ESLint, run: `npm run-script lint`.
